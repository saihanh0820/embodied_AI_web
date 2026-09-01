Add-Type -AssemblyName System.Drawing

$src = 'C:\Users\ADMIN~1\AppData\Local\Temp\codex-clipboard-278e81e9-5803-4227-a271-5d7a4fa93cb2.jpg'
$out = 'D:\桌面\embodied_AI_web\assets\raw\logo-embodied-intelligence-cutout.png'
$ratioOut = 'D:\桌面\embodied_AI_web\assets\raw\logo-embodied-intelligence-ratio.png'
$targetW = 3342
$targetH = 705

$source = [System.Drawing.Bitmap]::new($src)
$cut = [System.Drawing.Bitmap]::new($source.Width, $source.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$graphics = [System.Drawing.Graphics]::FromImage($cut)
$graphics.DrawImage($source, 0, 0, $source.Width, $source.Height)
$graphics.Dispose()
$source.Dispose()

# Remove the near-white background and preserve antialiased blue edges.
for ($y = 0; $y -lt $cut.Height; $y++) {
  for ($x = 0; $x -lt $cut.Width; $x++) {
    $color = $cut.GetPixel($x, $y)
    $minChannel = [math]::Min($color.R, [math]::Min($color.G, $color.B))
    $blueDelta = [math]::Max($color.B - [math]::Max($color.R, $color.G), 0)
    if ($minChannel -gt 238 -and $blueDelta -lt 24) {
      $cut.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, $color.R, $color.G, $color.B))
    } elseif ($minChannel -gt 220 -and $blueDelta -lt 55) {
      $alpha = [int][math]::Round(255 * (1 - (($minChannel - 220) / 35)))
      $alpha = [math]::Max(0, [math]::Min(255, $alpha))
      $cut.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, 30, 85, 238))
    }
  }
}
$cut.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)

# Find the visible bounds and place the cutout on a transparent 3342:705 canvas.
$left = $cut.Width; $top = $cut.Height; $right = -1; $bottom = -1
for ($y = 0; $y -lt $cut.Height; $y++) {
  for ($x = 0; $x -lt $cut.Width; $x++) {
    if ($cut.GetPixel($x, $y).A -gt 8) {
      if ($x -lt $left) { $left = $x }
      if ($x -gt $right) { $right = $x }
      if ($y -lt $top) { $top = $y }
      if ($y -gt $bottom) { $bottom = $y }
    }
  }
}
$cropW = $right - $left + 1
$cropH = $bottom - $top + 1
$canvas = [System.Drawing.Bitmap]::new($targetW, $targetH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$canvasGraphics = [System.Drawing.Graphics]::FromImage($canvas)
$canvasGraphics.Clear([System.Drawing.Color]::Transparent)
$canvasGraphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$canvasGraphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$canvasGraphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$marginX = [int][math]::Round($targetW * 0.045)
$marginY = [int][math]::Round($targetH * 0.18)
$scale = [math]::Min(($targetW - 2 * $marginX) / $cropW, ($targetH - 2 * $marginY) / $cropH)
$drawW = [int][math]::Round($cropW * $scale)
$drawH = [int][math]::Round($cropH * $scale)
$drawX = [int][math]::Round(($targetW - $drawW) / 2)
$drawY = [int][math]::Round(($targetH - $drawH) / 2)
$canvasGraphics.DrawImage($cut, [System.Drawing.Rectangle]::new($drawX, $drawY, $drawW, $drawH), [System.Drawing.Rectangle]::new($left, $top, $cropW, $cropH), [System.Drawing.GraphicsUnit]::Pixel)
$canvasGraphics.Dispose()
$canvas.Save($ratioOut, [System.Drawing.Imaging.ImageFormat]::Png)
$canvas.Dispose()
$cut.Dispose()

Write-Output "cutout: $out"
Write-Output "ratio:   $ratioOut (${targetW}x${targetH})"
