Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$raw = Join-Path $root "assets\raw"
$composite = [System.Drawing.Bitmap]::FromFile((Join-Path $raw "69126876fe7d239d0d6ad2ea387d0e38e292a757.png"))
$rabbit = [System.Drawing.Bitmap]::FromFile((Join-Path $raw "ff6b90c2390b1af81dfdbdc5cdeee195b0e6938f.png"))

$items = @(
  @{ Name = "animal-mouse.png"; Source = $composite; Rect = [System.Drawing.Rectangle]::new(0, 850, 1080, 430) },
  @{ Name = "animal-rabbit.png"; Source = $rabbit; Rect = [System.Drawing.Rectangle]::new(315, 575, 450, 315) },
  @{ Name = "animal-monkey.png"; Source = $composite; Rect = [System.Drawing.Rectangle]::new(155, 230, 405, 340) },
  @{ Name = "animal-dog.png"; Source = $composite; Rect = [System.Drawing.Rectangle]::new(525, 225, 400, 345) },
  @{ Name = "animal-sheep.png"; Source = $composite; Rect = [System.Drawing.Rectangle]::new(565, 555, 330, 330) },
  @{ Name = "animal-pig.png"; Source = $composite; Rect = [System.Drawing.Rectangle]::new(155, 585, 410, 280) }
)

foreach ($item in $items) {
  $crop = $item.Source.Clone($item.Rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $crop.Save((Join-Path $raw $item.Name), [System.Drawing.Imaging.ImageFormat]::Png)
  $crop.Dispose()
}

$composite.Dispose()
$rabbit.Dispose()
