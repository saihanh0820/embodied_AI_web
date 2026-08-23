param(
  [string]$ReferenceDirectory = (Join-Path $PSScriptRoot "..\..\weimou-ui-desktop\assets\reference-pages"),
  [string]$CurrentDirectory = (Join-Path $PSScriptRoot "..\output\fidelity-04a"),
  [string]$Output = (Join-Path $PSScriptRoot "..\tmp\visual-comparison-sheet.jpg")
)

Add-Type -AssemblyName System.Drawing

$routes = @('home', 'about', 'research', 'v3', 'v4', 'ois', 'consumables', 'news', 'support', 'contact')
$columnWidth = 680
$previewHeight = 620
$labelHeight = 36
$rowHeight = $previewHeight + $labelHeight + 18
$sheet = New-Object System.Drawing.Bitmap ($columnWidth * 2), ($rowHeight * $routes.Count)
$graphics = [System.Drawing.Graphics]::FromImage($sheet)
$graphics.Clear([System.Drawing.Color]::White)
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$font = New-Object System.Drawing.Font('Arial', 16, [System.Drawing.FontStyle]::Bold)

for ($index = 0; $index -lt $routes.Count; $index += 1) {
  $route = $routes[$index]
  $y = $index * $rowHeight
  $graphics.DrawString("$route / PDF", $font, [System.Drawing.Brushes]::Black, 12, $y + 6)
  $graphics.DrawString("$route / current", $font, [System.Drawing.Brushes]::Black, $columnWidth + 12, $y + 6)
  $paths = @(
    (Join-Path $ReferenceDirectory "$route.png"),
    (Join-Path $CurrentDirectory "$route.png")
  )

  for ($column = 0; $column -lt 2; $column += 1) {
    if (-not (Test-Path -LiteralPath $paths[$column])) { continue }
    $image = [System.Drawing.Image]::FromFile($paths[$column])
    $availableWidth = $columnWidth - 24
    $availableHeight = $previewHeight
    $scale = [Math]::Min($availableWidth / $image.Width, $availableHeight / $image.Height)
    $width = [Math]::Max(1, [Math]::Round($image.Width * $scale))
    $height = [Math]::Max(1, [Math]::Round($image.Height * $scale))
    $x = ($column * $columnWidth) + [Math]::Round(($columnWidth - $width) / 2)
    $drawY = $y + $labelHeight + [Math]::Round(($availableHeight - $height) / 2)
    $graphics.DrawImage($image, $x, $drawY, $width, $height)
    $image.Dispose()
  }
  $graphics.DrawLine([System.Drawing.Pens]::LightGray, 0, $y + $rowHeight - 1, $sheet.Width, $y + $rowHeight - 1)
}

$directory = Split-Path -Parent $Output
if (-not (Test-Path -LiteralPath $directory)) { New-Item -ItemType Directory -Path $directory | Out-Null }
$sheet.Save($Output, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$graphics.Dispose()
$sheet.Dispose()
$font.Dispose()
Write-Output $Output
