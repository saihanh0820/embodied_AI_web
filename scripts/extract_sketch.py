import argparse
import json
import shutil
import zipfile
from collections import defaultdict
from pathlib import Path


def walk(value, ancestry, references, text_layers, layers=None):
    if isinstance(value, dict):
        current = ancestry
        layer_name = value.get("name")
        if value.get("_class") in {"artboard", "group", "bitmap", "shapeGroup", "text"} and layer_name:
            current = ancestry + [layer_name]

        ref = value.get("_ref")
        if layers is not None and value.get("_class") in {"artboard", "group", "bitmap", "shapeGroup", "text", "rectangle"}:
            frame = value.get("frame", {})
            layers.append({
                "path": " / ".join(current[-7:]),
                "class": value.get("_class"),
                "frame": {key: frame.get(key) for key in ("x", "y", "width", "height")},
                "image": ref if isinstance(ref, str) and ref.startswith("images/") else None,
            })
        if isinstance(ref, str) and ref.startswith("images/"):
            references[ref].add(" / ".join(current[-5:]))

        if value.get("_class") == "text":
            text = value.get("attributedString", {}).get("string")
            if text:
                text_layers.append({
                    "path": " / ".join(current[-5:]),
                    "text": text,
                    "frame": value.get("frame", {})
                })

        for child in value.values():
            walk(child, current, references, text_layers, layers)
    elif isinstance(value, list):
        for child in value:
            walk(child, ancestry, references, text_layers, layers)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("sketch", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()

    output = args.output.resolve()
    raw_dir = output / "raw"
    raw_dir.mkdir(parents=True, exist_ok=True)
    report = {"pages": [], "images": {}}

    with zipfile.ZipFile(args.sketch) as archive:
        meta = json.loads(archive.read("meta.json"))
        page_meta = meta.get("pagesAndArtboards", {})

        for entry in archive.namelist():
            if entry.startswith("images/") and not entry.endswith("/"):
                target = raw_dir / Path(entry).name
                with archive.open(entry) as source, target.open("wb") as destination:
                    shutil.copyfileobj(source, destination)

        for page_id, details in page_meta.items():
            page_entry = f"pages/{page_id}.json"
            if page_entry not in archive.namelist():
                continue
            page = json.loads(archive.read(page_entry))
            page_report = {"id": page_id, "name": details.get("name", ""), "artboards": []}

            for layer in page.get("layers", []):
                if layer.get("_class") != "artboard":
                    continue
                references = defaultdict(set)
                text_layers = []
                layers = []
                walk(layer, [layer.get("name", "")], references, text_layers, layers)
                frame = layer.get("frame", {})
                page_report["artboards"].append({
                    "id": layer.get("do_objectID"),
                    "name": layer.get("name", ""),
                    "frame": {key: frame.get(key) for key in ("x", "y", "width", "height")},
                    "images": {key: sorted(value) for key, value in references.items()},
                    "texts": text_layers,
                    "layers": layers,
                })
                for reference, paths in references.items():
                    report["images"].setdefault(reference, [])
                    report["images"][reference].extend(sorted(paths))

            report["pages"].append(page_report)

    for reference in report["images"]:
        report["images"][reference] = sorted(set(report["images"][reference]))

    (output / "sketch-report.json").write_text(
        json.dumps(report, ensure_ascii=False, indent=2),
        encoding="utf-8",
        newline="\n"
    )
    print(f"Extracted {len(list(raw_dir.iterdir()))} images to {raw_dir}")
    print(f"Report written to {output / 'sketch-report.json'}")


if __name__ == "__main__":
    main()
