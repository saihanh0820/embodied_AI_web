param(
  [string]$Source = (Join-Path $PSScriptRoot "..\assets\raw"),
  [string]$Output = (Join-Path $PSScriptRoot "..\tmp\asset-contact-sheet.jpg")
)

Add-Type -AssemblyName System.Drawing

$files = Get-ChildItem -LiteralPath $Source -File | Where-Object { $_.Extension -match '^\.(png|jpg|jpeg)$' } | Sort-Object Name
$columns = 5
$cellWidth = 300
$cellHeight = 230
$rows = [Math]::Ceiling($files.Count / $columns)
$sheet = New-Object System.Drawing.Bitmap ($columns * $cellWidth), ($rows * $cellHeight)
$graphics = [System.Drawing.Graphics]::FromImage($sheet)
$graphics.Clear([System.Drawing.Color]::White)
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$font = New-Object System.Drawing.Font('Arial', 10)
$brush = [System.Drawing.Brushes]::Black

for ($index = 0; $index -lt $files.Count; $index += 1) {
  $file = $files[$index]
  $column = $index % $columns
  $row = [Math]::Floor($index / $columns)
  $x = $column * $cellWidth
  $y = $row * $cellHeight
  $image = [System.Drawing.Image]::FromFile($file.FullName)
  $scale = [Math]::Min(260 / $image.Width, 178 / $image.Height)
  $width = [Math]::Max(1, [Math]::Round($image.Width * $scale))
  $height = [Math]::Max(1, [Math]::Round($image.Height * $scale))
  $drawX = $x + [Math]::Round(($cellWidth - $width) / 2)
  $drawY = $y + 8 + [Math]::Round((178 - $height) / 2)
  $graphics.DrawImage($image, $drawX, $drawY, $width, $height)
  $graphics.DrawString($file.BaseName.Substring(0, [Math]::Min(12, $file.BaseName.Length)), $font, $brush, $x + 10, $y + 190)
  $graphics.DrawString("$($image.Width)x$($image.Height)", $font, $brush, $x + 10, $y + 207)
  $image.Dispose()
}

$directory = Split-Path -Parent $Output
if (-not (Test-Path -LiteralPath $directory)) { New-Item -ItemType Directory -Path $directory | Out-Null }
$sheet.Save($Output, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$graphics.Dispose()
$sheet.Dispose()
$font.Dispose()
Write-Output $Output
