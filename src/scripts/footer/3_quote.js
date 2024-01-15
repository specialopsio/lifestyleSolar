 // embed 1

 window.hash_vals = null
 let maskData = {}
 let fluxData = {}
 let color_range = ['00000A', '91009C', 'E64616', 'FEB400', 'FFFFF6']
 const panelsPalette = ['E8EAF6', '1A237E']
 let solar_panels = []
 let solarPotentialData
 let map

 function generateRandomString() {
   const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
   const length = 6
   let result = ''

   for (let i = 0; i < length; i++) {
     const randomIndex = Math.floor(Math.random() * characters.length)
     result += characters.charAt(randomIndex)
   }

   return result
 }

 // function initAutoComplete() {
 //     var inputElements = document.querySelectorAll('input.address-input')
 //     inputElements.forEach(function (element) {
 //         var autocomplete = new google.maps.places.Autocomplete(element)
 //         autocomplete.addListener('place_changed', function () {
 //             selectedPlace = autocomplete.getPlace()
 //             updateButtonState()
 //         })
 //     })
 // }
 // google.maps.event.addDomListener(window, 'load', initAutoComplete)

 // function updateButtonState(area) {
 //     const button = document.getElementById('calculateButton')
 //     if (button.classList.contains("disabled") && selectedPlace) {
 //         button.classList.remove("disabled")
 //     }
 // }


 async function setPageData() {
   const uniqueQuery = new Date().getTime()
   const gmapCanvas = document.getElementById('gmap_canvas')
   const userFrontHouse = document.getElementById('userFrontHouse')
   userFrontHouse.src = `${hash_vals.icon_url}&time=${uniqueQuery}`
   userFrontHouse.srcset = `${hash_vals.icon_url}&time=${uniqueQuery}`
   document.getElementById('userAddress').textContent = hash_vals.home_address + ' in ' + hash_vals.city
   document.getElementById('sunlightHours').textContent = hash_vals.sunlight_hours
   document.getElementById('roofSize').textContent = hash_vals.roof_area
   document.getElementById('savingsDollars').textContent = hash_vals.year_twenty_savings
   document.getElementById('formAddress').value = hash_vals.display_address
   if(window.current_bill){
       document.getElementById('bill').value = window.current_bill
   } else {
        document.getElementById('bill').value = 150
   }
   // Select all elements that have the ID 'billValue'
   var elements = document.querySelectorAll('[id="billValue"]');

   // Loop through each element and update its text content
   elements.forEach(function(element) {
     element.textContent = '$' + window.current_bill;
   });
   document.getElementById('array_area').value = hash_vals.array_area
   document.getElementById('formStreet').value = hash_vals.home_address
   document.getElementById('formCity').value = hash_vals.city
   document.getElementById('formStateShort').value = hash_vals.state
   document.getElementById('formZip').value = hash_vals.zip
   document.getElementById('formStateLong').value = hash_vals.stateLong
   document.getElementById('roof_area').value = hash_vals.roof_area
   document.getElementById('max_panels').value = hash_vals.max_panels
   document.getElementById('wattage').value = hash_vals.wattage
   document.getElementById('sunlight_hours').value = hash_vals.sunlight_hours
   document.getElementById('lat').value = hash_vals.lat
   document.getElementById('lon').value = hash_vals.lon
   document.getElementById('carbon_offset').value = hash_vals.carbon_offset
   map = initializeMap(hash_vals.lat, hash_vals.lon, 'map_container')
   if (hash_vals.geoTiff) {
     const tiffs = hash_vals.geoTiff
     let {
       fluxData,
       maskData
     } = await fetchAndProcessTiffs(tiffs.flux, tiffs.mask)
     console.debug("maskdata", maskData)
     const width = maskData.width
     const height = maskData.height
     const centerX = Math.floor(width / 2)
     const centerY = Math.floor(height / 2)
     const clusters = findClusters(maskData.rasters[0], width, height)
     const centralCluster = findMostCentralCluster(clusters, centerX, centerY)
     maskData.rasters[0] = modifyMask(maskData.rasters[0], width, height, centralCluster)
     const canvas = renderPalette(fluxData, maskData, color_range, 0, 1800)
     createGroundOverlay(canvas, fluxData.bounds, map)
     solarPotentialData = hash_vals.solar_potential
     showSolarPotential(map)
     document.getElementById('solarPanelSlider').max = solarPotentialData.solarPanelConfigs[solarPotentialData.solarPanelConfigs.length - 1].panelsCount
     document.getElementById('solarPanelSlider').min = solarPotentialData.solarPanelConfigs[0].panelsCount
     document.getElementById('solarPanelSlider').value = solarPotentialData.solarPanelConfigs[solarPotentialData.solarPanelConfigs.length - 1].panelsCount / 4
     document.getElementById('solarPanelSlider').addEventListener('input', (event) => {
       const setIndex = parseInt(event.target.value, 10)
       updateSolarPanels(map, setIndex - 1)
     })
     const sliderContainer = document.getElementById('solarPanelSliderContainer');
     sliderContainer.style.display = 'flex'
     map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(sliderContainer)
   }
 }
 window.setPageData = setPageData
 function createGroundOverlay(canvas, bounds, map) {
   const imageUrl = canvas.toDataURL()
   const overlay = new google.maps.GroundOverlay(imageUrl, bounds)
   overlay.setMap(map)
 }

 async function fetchAndProcessTiffs(fluxUrl, maskUrl) {
   try {
     let maskData = await processGeoTiff(maskUrl)
     let fluxData = await processGeoTiff(fluxUrl)
     return {
       maskData,
       fluxData
     }
   } catch (error) {
     console.error("Fetching TIFFs failed", error)
   }
 }

 async function processGeoTiff(url) {
   try {
     const response = await fetch(url)
     if (response.status !== 200) {
       throw new Error('Failed to download GeoTIFF from url:', url)
     }
     const arrayBuffer = await response.arrayBuffer()
     const tiff = await GeoTIFF.fromArrayBuffer(arrayBuffer)
     const image = await tiff.getImage()
     const rasters = await image.readRasters()
     const bounds = calculateBoundingBox(hash_vals.lat, hash_vals.lon, 30)

     const geoKeys = image.getGeoKeys()
     const box = image.getBoundingBox()

     const projection = proj4(geoKeys.ProjLinearUnitsGeoKey || 'WGS84')
     const sw = projection.forward({
       x: box[0],
       y: box[1]
     })
     const ne = projection.forward({
       x: box[2],
       y: box[3]
     })

     return {
       width: image.getWidth(),
       height: image.getHeight(),
       rasters: rasters,
       bounds: bounds
     }

   } catch (error) {
     console.error('Error processing GeoTIFF:', error)
     throw error
   }
 }

 // embed 2

 async function showSolarPotential(map) {
   solar_panels.forEach(panel => panel.setMap(null))
   const solarPotential = solarPotentialData
   const palette = createPalette(panelsPalette, 256)
   const minEnergy = solarPotential.solarPanels[solarPotential.solarPanels.length - 1].yearlyEnergyDcKwh
   const maxEnergy = solarPotential.solarPanels[0].yearlyEnergyDcKwh
   solar_panels = solarPotential.solarPanels.map(panel => {
     const [w, h] = [solarPotential.panelWidthMeters / 2, solarPotential.panelHeightMeters / 2];
     const points = [{
         x: +w,
         y: +h
       },
       {
         x: +w,
         y: -h
       },
       {
         x: -w,
         y: -h
       },
       {
         x: -w,
         y: +h
       },
       {
         x: +w,
         y: +h
       }
     ];
     const orientation = panel.orientation === 'PORTRAIT' ? 90 : 0
     const azimuth = solarPotential.roofSegmentStats[panel.segmentIndex].azimuthDegrees
     const colorIndex = Math.round(normalize(panel.yearlyEnergyDcKwh, maxEnergy, minEnergy) * 255)

     return new google.maps.Polygon({
       paths: points.map(({
           x,
           y
         }) =>
         google.maps.geometry.spherical.computeOffset(
           new google.maps.LatLng(panel.center.latitude, panel.center.longitude),
           Math.sqrt(x * x + y * y),
           Math.atan2(y, x) * (180 / Math.PI) + orientation + azimuth
         )
       ),
       strokeColor: '#B0BEC5',
       strokeOpacity: 0.9,
       strokeWeight: 1,
       fillColor: '#0f0f0f',
       fillOpacity: 0.9
     })
   })

   const init_amount = Math.ceil((solar_panels.length - 1) / 4)
   if (init_amount > 4) {
     updateSolarPanels(map, init_amount)
   } else {
     updateSolarPanels(map, 3)
   }
 }

 function updateSolarPanels(map, setIndex) {
   solar_panels.forEach(panel => panel.setMap(null))
   for (let i = 0; i <= setIndex; i++) {
     solar_panels[i].setMap(map)
   }
   let slider = document.getElementById('sliderValue')
   slider.innerText = setIndex + 1
   slider.value = setIndex

   let closestConfigIndex = solarPotentialData.solarPanelConfigs.findIndex(config => config.panelsCount >= setIndex);
   if (closestConfigIndex === -1) closestConfigIndex = solarPotentialData.solarPanelConfigs.length - 1;
   let closestConfig = solarPotentialData.solarPanelConfigs[closestConfigIndex];

   let panelCapacityRatio = 1.0
   let dcToAcDerate = 0.85
   let monthlyAverageEnergyBill = 300 //hash_vals.bill
   let efficiencyDepreciationFactor = 0.995
   let costIncreaseFactor = 1.022
   let discountRate = 1.04
   let energyCostPerKwh = 0.13
   let installationCostPerWatt = 4
   let solarIncentives = 7000
   let panelCapacityWatts = solarPotentialData.panelCapacityWatts
   let lifespan = 20
   let installationSizeKw = (closestConfig.panelsCount * panelCapacityWatts) / 1000
   let installationCostTotal = installationCostPerWatt * installationSizeKw * 100
   let monthlyKwhEnergyConsumption = monthlyAverageEnergyBill / energyCostPerKwh
   let yearlyKwhEnergyConsumption = monthlyKwhEnergyConsumption * 12
   let initialAcKwhPerYear = closestConfig.yearlyEnergyDcKwh * panelCapacityRatio * dcToAcDerate
   let yearlyProductionAcKwh = [...Array(lifespan).keys()].map(
     (year) => initialAcKwhPerYear * efficiencyDepreciationFactor ** year
   )
   let yearlyUtilityBillEstimates = yearlyProductionAcKwh.map((yearlyKwhEnergyProduced, year) => {
     return Math.max(
       ((yearlyKwhEnergyConsumption - yearlyKwhEnergyProduced) *
         energyCostPerKwh *
         costIncreaseFactor ** year) /
       discountRate ** year,
       0
     )
   })
   let remainingLifeTimeUtilityBill = yearlyUtilityBillEstimates.reduce((x, y) => x + y, 0)
   let yearlyCostWithoutSolar = Array.from({
     length: lifespan
   }, (_, year) => {
     return (monthlyAverageEnergyBill * 12 * Math.pow(costIncreaseFactor, year)) / Math.pow(discountRate, year);
   })
   let costOfElectricityWithoutSolar = yearlyCostWithoutSolar.reduce((x, y) => x + y, 0)
   let totalCostWithSolar = remainingLifeTimeUtilityBill - solarIncentives
   let savings = costOfElectricityWithoutSolar - totalCostWithSolar

   document.getElementById('savingsDollars').textContent = `$${savings.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

 }

 function calculateBoundingBox(centerLat, centerLng, radius) {
   const earthRadius = 6371
   const radiusInKm = radius / 1000

   const deltaLat = radiusInKm / earthRadius
   const deltaLng = Math.asin(radiusInKm / (earthRadius * Math.cos(Math.PI * centerLat / 180)))

   const north = centerLat + deltaLat * 180 / Math.PI
   const south = centerLat - deltaLat * 180 / Math.PI
   const east = centerLng + deltaLng * 180 / Math.PI
   const west = centerLng - deltaLng * 180 / Math.PI

   return {
     north,
     south,
     east,
     west
   }
 }


 function initializeMap(lat, lng, elementId) {
   const mapCenter = new google.maps.LatLng(lat, lng);
   const minZoomLevel = 18
   const mapOptions = {
     center: mapCenter,
     zoom: 20,
     tilt: 0,
     mapTypeId: 'satellite',
     mapTypeControl: false,
     fullscreenControl: false,
     rotateControl: false,
     streetViewControl: false,
     zoomControl: false,
   };

   const mapElement = document.getElementById(elementId);
   const map = new google.maps.Map(mapElement, mapOptions);

   map.addListener('zoom_changed', function() {
     console.debug("Map", map.getZoom())
     if (map.getZoom() < minZoomLevel) map.setZoom(minZoomLevel);
   });

   return map;
 }

 function renderPalette(data, mask, colors, min, max) {
   const canvas = document.createElement('canvas')
   canvas.width = mask.width
   canvas.height = mask.height
   const ctx = canvas.getContext('2d')
   const img = ctx.createImageData(canvas.width, canvas.height)
   const palette = createPalette(colors)
   for (let y = 0; y < canvas.height; y++) {
     for (let x = 0; x < canvas.width; x++) {
       const idx = y * canvas.width + x
       const value = normalize(data.rasters[0][idx], min, max)
       const colorIdx = Math.round(value * (palette.length - 1)) > 255 ? 255 : Math.round(value * (palette.length - 1))
       const color = palette[colorIdx]

       img.data[idx * 4 + 0] = color.r
       img.data[idx * 4 + 1] = color.g
       img.data[idx * 4 + 2] = color.b
       img.data[idx * 4 + 3] = mask.rasters[0][idx] ? 255 : 0
     }
   }

   ctx.putImageData(img, 0, 0);
   return canvas;
 }

 // embed 3

 function isCommercial() {
   const urlParams = new URLSearchParams(window.location.search);
   return urlParams.get('commercial') === 'true';
 }

 function showPage() {
   document.getElementById('quote3').style.display = 'block'
   document.getElementById('quote2').style.display = 'none'
 }
 
 window.showPage = showPage

 function showSuccess() {
   document.getElementById('app').style.display = 'block'
   document.getElementById('quote3').style.display = 'none'
   document.getElementById('modal').style.display = 'none'
 }

 function hidePage() {
   document.getElementById('app').style.display = 'none'
   document.getElementById('modal').style.display = 'block'
 }

 function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function deriveLongAddress(code){
    const address_mapping = {"AL": "Alabama", "AK": "Alaska", "AZ": "Arizona", "AR": "Arkansas", "CA": "California", "CO": "Colorado", "CT": "Connecticut", "DE": "Delaware", "FL": "Florida", "GA": "Georgia", "HI": "Hawaii", "ID": "Idaho", "IL": "Illinois", "IN": "Indiana", "IA": "Iowa", "KS": "Kansas", "KY": "Kentucky", "LA": "Louisiana", "ME": "Maine", "MD": "Maryland", "MA": "Massachusetts", "MI": "Michigan", "MN": "Minnesota", "MS": "Mississippi", "MO": "Missouri", "MT": "Montana", "NE": "Nebraska", "NV": "Nevada", "NH": "New Hampshire", "NJ": "New Jersey", "NM": "New Mexico", "NY": "New York", "NC": "North Carolina", "ND": "North Dakota", "OH": "Ohio", "OK": "Oklahoma", "OR": "Oregon", "PA": "Pennsylvania", "RI": "Rhode Island", "SC": "South Carolina", "SD": "South Dakota", "TN": "Tennessee", "TX": "Texas", "UT": "Utah", "VT": "Vermont", "VA": "Virginia", "WA": "Washington", "WV": "West Virginia", "WI": "Wisconsin", "WY": "Wyoming",}
    return address_mapping[code]
}

function getCurrentBill(display_address, hash){
    const address = display_address.split(',')
    const fetch_url = ""
    const split_obj_2 = address[2].trim().split(" ")
    const fetch_object = {
        "hash": hash,
        "address": {
            "street": address[0].trim(),
            "city": address[1].trim(),
            "state": {
                "short": split_obj_2[0],
                "long": deriveLongAddress(split_obj_2[0])
            },
            "zip": split_obj_2[1]
        }
    }
    console.debug('fetch object',fetch_object)
    // fetch(fetch_url, {method: 'POST'}).then(response => response.json()).then(data => {
    // TO DO: ONCE ENDPOINT IS CREATED PROCESS CODE
    // })
    if(window.hash_vals){
        window.page_data_loaded = true
      }
      if(window.current_bill){
        const sliders = document.querySelectorAll('.slider-container')
        sliders[0].style.display = 'none'
        return
      }
      window.current_bill = 150
}
window.getCurrentBill = getCurrentBill

 const urlParams = new URLSearchParams(window.location.search)
 document.addEventListener("DOMContentLoaded", function() {
   if (isCommercial()) {
     document.getElementById('commercial').style.display = 'block';
     document.getElementById('modal').style.display = 'none';
     document.getElementById('app').style.display = 'none';
   } else if (urlParams.has('hash') && window.location.href.indexOf('quote') !== -1) {
     // showPage()
     try {
        const lat = getCookie('lat');
        const long = getCookie('long');
        const display_address = decodeURIComponent(getCookie('display_address'));
        document.getElementById('quote1').style.display = 'none'
        const hashValue = urlParams.get('hash')
        getCurrentBill(display_address, hashValue)
        fetch(`https://vj61befm45.execute-api.us-east-1.amazonaws.com/default/solar_hash?data_hash=${hashValue}&set_hash=True&lat=${lat}&long=${long}&display_address=${encodeURIComponent(display_address)}`, {
           method: 'GET',
         })
         .then(response => response.json())
         .then(data => {
           if (data.lat) {
            if(window.current_bill){
                window.page_data_loaded = true
            }
             window.hash_vals = data
             document.getElementById('formAddress').value = hash_vals.display_address
             if (window.load_bar_filled) {
               setPageData()
               showPage()
             }
           }
         })
     } catch (error) {
       console.debug("ERROR", error)
       // hidePage()
     }
   }
 })

 // function getAutocompleteValue() {
 //     if (selectedPlace.geometry && selectedPlace.formatted_address) {
 //         lat = selectedPlace.geometry.location.lat()
 //         long = selectedPlace.geometry.location.lng()
 //         display_address = selectedPlace.formatted_address
 //         hash = generateRandomString()
 //         bill = sliderValue
 //         fetch(`https://vj61befm45.execute-api.us-east-1.amazonaws.com/default/solar_hash?data_hash=${hash}&set_hash=True&lat=${lat}&long=${long}&current_bill=${sliderValue}&display_address=${display_address}`)
 //             .then(response => response.json())
 //             .then(data => {
 //                 hash_vals = data
 //                 setPageData()
 //                 showPage()
 //             }).catch(error => {
 //                 console.error("ERROR", error)
 //             })
 //     } else {
 //         console.debug("NO VALID ADDRESS INPUT")
 //     }
 // }

 // function updateSliderValue(value, area) {
 //     sliderValue = value
 // }

 function drawImageOnCanvas(canvasID) {
   var canvas = document.getElementById(canvasID)
   var ctx = canvas.getContext('2d')
   var image = new Image()

   image.onload = function() {
     const imageHeight = image.height / 3
     const imageWidth = image.width / 3

     const xPosition = canvas.width - imageWidth - 10
     const yPosition = canvas.height - imageHeight - 10

     ctx.drawImage(image, xPosition, yPosition, imageWidth, imageHeight);
   };

   image.src = 'https://assets-global.website-files.com/65130b13c5e81529f31d4b2b/6579df7bb617f410309546f5_Legend.png'
 }

 function colorToRGB(color) {
   const hex = color.startsWith('#') ? color.slice(1) : color
   return {
     r: parseInt(hex.substring(0, 2), 16),
     g: parseInt(hex.substring(2, 4), 16),
     b: parseInt(hex.substring(4, 6), 16),
   }
 }

 function lerp(start, end, t) {
   return start + t * (end - start)
 }

 function createPalette(hexColors, size = 256) {
   const rgbColors = hexColors.map(colorToRGB)
   const step = (rgbColors.length - 1) / (size - 1)
   return Array.from({
     length: size
   }, (_, i) => {
     const index = i * step
     const lowerIndex = Math.floor(index)
     const upperIndex = Math.ceil(index)
     return {
       r: lerp(rgbColors[lowerIndex].r, rgbColors[upperIndex].r, index - lowerIndex),
       g: lerp(rgbColors[lowerIndex].g, rgbColors[upperIndex].g, index - lowerIndex),
       b: lerp(rgbColors[lowerIndex].b, rgbColors[upperIndex].b, index - lowerIndex)
     }
   })
 }

 function normalize(value, min, max) {
   return (value - min) / (max - min)
 }

 function getNeighbors(x, y, width, height) {
   const neighbors = []
   for (let dx = -1; dx <= 1; dx++) {
     for (let dy = -1; dy <= 1; dy++) {
       if (dx === 0 && dy === 0) continue
       const newX = x + dx
       const newY = y + dy
       if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
         neighbors.push({
           x: newX,
           y: newY
         })
       }
     }
   }
   return neighbors
 }

 function bfs(mask, startX, startY, width, height) {
   const visited = new Set()
   const queue = [{
     x: startX,
     y: startY
   }]
   const cluster = []

   while (queue.length > 0) {
     const {
       x,
       y
     } = queue.shift()
     const index = y * width + x
     if (visited.has(index) || mask[index] === 0) continue

     visited.add(index)
     cluster.push({
       x,
       y
     })

     const neighbors = getNeighbors(x, y, width, height)
     for (const neighbor of neighbors) {
       const neighborIndex = neighbor.y * width + neighbor.x
       if (!visited.has(neighborIndex) && mask[neighborIndex] === 1) {
         queue.push(neighbor)
       }
     }
   }
   return cluster
 }

 function findClusters(mask, width, height) {
   const clusters = []
   const visited = new Set()

   for (let y = 0; y < height; y++) {
     for (let x = 0; x < width; x++) {
       const index = y * width + x
       if (mask[index] === 1 && !visited.has(index)) {
         const cluster = bfs(mask, x, y, width, height)
         clusters.push(cluster)
         cluster.forEach(point => visited.add(point.y * width + point.x))
       }
     }
   }
   return clusters
 }

 function calculateCentroid(cluster) {
   let sumX = 0,
     sumY = 0
   cluster.forEach(point => {
     sumX += point.x
     sumY += point.y
   });
   return {
     x: sumX / cluster.length,
     y: sumY / cluster.length
   }
 }

 function findMostCentralCluster(clusters, centerX, centerY) {
   let minDistance = Infinity
   let centralCluster = null

   clusters.forEach(cluster => {
     const centroid = calculateCentroid(cluster)
     const distance = Math.sqrt(Math.pow(centroid.x - centerX, 2) + Math.pow(centroid.y - centerY, 2))
     if (distance < minDistance) {
       minDistance = distance
       centralCluster = cluster
     }
   });
   return centralCluster
 }

 function modifyMask(mask, width, height, centralCluster) {
   const newMask = new Array(mask.length).fill(0)
   centralCluster.forEach(point => {
     const index = point.y * width + point.x;
     newMask[index] = 1
   });
   return newMask
 }