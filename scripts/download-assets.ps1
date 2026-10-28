$ErrorActionPreference = 'Stop'
$assetRoot = Join-Path $PSScriptRoot '..\public\images'
$base = 'https://img1.wsimg.com/isteam/ip/067a4d42-19e8-46d9-9bed-578bf62dd44e/'
$assets = @{
  'pahrump.jpg' = $base + 'mtn%20falls%20pond.jpg/:/rs=w:1920,m'
  'marci.jpg' = $base + 'photo-5db79f9.jpg/:/rs=w:900,m'
  'brand.png' = $base + 'blob-6c0c2e0.png/:/rs=w:1071,m'
  'ridge.png' = $base + 'BIG%20CIRCLE%202.png/:/rs=w:300,m'
  'equal-housing.png' = $base + 'Equal%20Housing%20Logo.png/:/rs=w:200,m'
  'realtor.jpg' = $base + 'Realtor%20Pin.jpg/:/rs=w:200,m'
  'chamber.jpg' = $base + 'Chamber.jpg/:/rs=w:200,m'
  'sold.jpg' = 'https://img1.wsimg.com/isteam/stock/3395/:/rs=w:1200,m'
  'marketing.jpg' = 'https://img1.wsimg.com/isteam/stock/107927/:/rs=w:1200,m'
  'buyers.jpg' = 'https://img1.wsimg.com/isteam/stock/771/:/rs=w:1200,m'
  'service-home.jpg' = 'https://img1.wsimg.com/isteam/stock/12792/:/rs=w:900,m'
  'service-property.jpg' = 'https://img1.wsimg.com/isteam/stock/43920/:/rs=w:900,m'
  'service-advice.jpg' = 'https://img1.wsimg.com/isteam/stock/kayaJdA/:/rs=w:900,m'
  'gallery-1.jpg' = $base + '4460%20Roseworthy-52.jpg-SMALL.JPG'
  'gallery-2.jpg' = $base + '5570%20Ailanto-14.jpg-SMALL.JPG'
  'gallery-3.jpg' = $base + '5570%20Ailanto-45.jpg-SMALL.JPG'
  'gallery-4.jpg' = $base + '5570%20Ailanto-50.jpg-SMALL.JPG'
  'gallery-5.jpg' = $base + '4787%20E%20Beacon%20Ridge-54.jpg-SMALL.JPG'
  'gallery-6.jpg' = $base + '4787%20E%20Beacon%20Ridge-53.jpg-SMALL.JPG'
  'gallery-7.jpg' = $base + '4787%20E%20Beacon%20Ridge-41.jpg-SMALL.JPG'
}
foreach ($asset in $assets.GetEnumerator()) {
  if (Test-Path (Join-Path $assetRoot $asset.Key)) { continue }
  Invoke-WebRequest -Uri $asset.Value -OutFile (Join-Path $assetRoot $asset.Key)
  Write-Output $asset.Key
}
