(function() {
  if (window.location.href.indexOf("lifestylesolar.com") !== -1) {
    if (window.location.href.indexOf('quote') !== -1) {

      document.addEventListener("DOMContentLoaded", function() {
        // Google Maps Autocomplete Initialization
        if (typeof google !== "undefined" && google.maps && google.maps.places) {
          initializeAutocomplete();
        }
  
        // Form Submission Event Listener
        document.getElementById("propertyForm").addEventListener("submit", function(event) {
          event.preventDefault();
  
          var businessName = document.getElementById('businessName').value
          var name = document.getElementById("name").value;
          var address = document.getElementById("formAddress").value;
          var phone = document.getElementById("phone").value;
          var creditScore = document.getElementById("credit-score").value;
          var owner = document.getElementById("owner").checked;
          var current_bill = document.querySelector('input#bill').value
  
          if (validateFormData(name, address, phone, creditScore, owner, businessName)) {
            var formData = {
              name,
              address,
              phone,
              creditScore,
              owner
            };
            postFormData(formData);
          } else {
            // Change label color if owner checkbox is not checked
            var ownerLabel = document.querySelector("label[for='owner']");
            if (!owner) {
              ownerLabel.classList.remove("text-gray-900");
              ownerLabel.classList.add("text-red-500");
            }
          }
        });
        var selectElement = document.getElementById('credit-score');
  
        selectElement.addEventListener('change', function() {
          if (this.value !== 'Credit Score') {
            this.classList.remove('text-gray-400');
            this.classList.add('text-gray-900');
          } else {
            this.classList.remove('text-gray-900');
            this.classList.add('text-gray-400');
          }
        });
  
        // Phone Number Formatting Event Listener
        document.getElementById('phone').addEventListener('input', function(e) {
          var input = e.target.value.replace(/\D/g, '');
          var formattedNumber;
  
          if (input.startsWith('1')) {
            formattedNumber = '1+ ';
            input = input.substr(1);
          } else {
            formattedNumber = '';
          }
  
          if (input.length > 3) {
            formattedNumber += '(' + input.substr(0, 3) + ') ';
            if (input.length >= 6) {
              formattedNumber += input.substr(3, 3) + '-' + input.substr(6, 4);
            } else {
              formattedNumber += input.substr(3);
            }
          } else {
            formattedNumber += input;
          }
  
          e.target.value = formattedNumber;
        });
  
        // Adding Event Listeners to All Input Fields for Error Handling
        ["name", "address", "phone", "credit-score", "owner", "formAddress"].forEach((id) => {
          var element = document.getElementById(id);
          element.addEventListener('input', function() {
            this.classList.remove("bg-red-50");
            if (id === "owner") {
              var ownerLabel = document.querySelector("label[for='owner']");
              ownerLabel.classList.replace("text-red-500", "text-gray-900");
            }
          });
        });
      });
  
      function initializeAutocomplete() {
        var addressInput = document.getElementById("formAddress");
        var autocomplete = new google.maps.places.Autocomplete(addressInput);
        autocomplete.setFields(['address_components', 'geometry', 'name']);
  
        autocomplete.addListener('place_changed', function() {
          var place = autocomplete.getPlace();
          var components = place.address_components;
          var street = '';
          var city = '';
          var stateShort = '';
          var stateLong = '';
          var zip = '';
  
          for (var i = 0; i < components.length; i++) {
            var addressType = components[i].types[0];
            switch (addressType) {
              case 'street_number':
                street += components[i].long_name + ' ';
                break;
              case 'route':
                street += components[i].long_name;
                break;
              case 'locality':
                city = components[i].long_name;
                break;
              case 'administrative_area_level_1':
                stateShort = components[i].short_name;
                stateLong = components[i].long_name;
                break;
              case 'postal_code':
                zip = components[i].long_name;
                break;
            }
          }
  
          document.getElementById('formStreet').value = street;
          document.getElementById('formCity').value = city;
          document.getElementById('formStateShort').value = stateShort;
          document.getElementById('formStateLong').value = stateLong;
          document.getElementById('formZip').value = zip;
        });
      }
  
  
      function validateFormData(name, address, phone, creditScore, owner, businessName) {
        resetFormStyling();
        var isValid = true;
  
        if (!name || !address || !phone || creditScore === "Credit Score" || !owner || (isCommercial() && !businessName)) {
          displayError("Please complete all fields.");
          highlightIncompleteFields({
            name,
            address,
            phone,
            creditScore,
            owner
          });
          isValid = false;
        }
  
        return isValid;
      }
  
      function displayError(message) {
        var errorElement = document.getElementById("error");
        errorElement.textContent = message;
        errorElement.style.opacity = 1;
        if (document.getElementById('address') && !document.getElementById('address').value) {
          document.getElementById('address').classList.add("bg-red-50")
        }
      }
  
      function clearError() {
        let errorElement = document.getElementById('error')
        errorElement.textContent = ''
        errorElement.style.opacity = 0
      }
      window.clearError = clearError
  
      function resetFormStyling() {
        document.getElementById("error").style.opacity = 0;
        ["name", "address", "phone", "credit-score", "owner"].forEach((id) => {
          document.getElementById(id).classList.remove("bg-red-50");
          var ownerLabel = document.querySelector("label[for='owner']");
          ownerLabel.classList.replace("text-red-500", "text-gray-900");
        });
      }
  
      function highlightIncompleteFields(fields) {
        for (var field in fields) {
          if (!fields[field] || (field === "creditScore" && fields[field] === "Credit Score")) {
            var elementId = field === "creditScore" ? "credit-score" : field;
            document.getElementById(elementId).classList.add("bg-red-50");
          }
        }
      }
  
      function getUTMs() {
        try {
          if (window.sbjs) {
            const utms = {
              utm_term: window.sbjs.get.current.trm,
              utm_source: window.sbjs.get.current.src,
              utm_campaign: window.sbjs.get.current.cmp,
              utm_content: window.sbjs.get.current.cnt,
              utm_medium: window.sbjs.get.current.mdm
            }
      
            Object.keys(utms).forEach(key => {
              if (utms[key] === '(none)' || utms[key] === undefined || utms[key] === '') {
                delete utms[key]
              }
            })
      
            return utms
          } else {
            return {}
          }
        } catch (error) {
          console.debug("ERROR LOADING SBJS")
        }
      }
      
      function formatPhoneNumber(phoneNumber) {
        let cleaned = ('' + phoneNumber).replace(/\D/g, '');
    
        if (cleaned.length === 10) {
            return '+1' + cleaned;
        } else if (cleaned.length === 11) {
            return '+' + cleaned;
        } else {
            return phoneNumber;
        }
      }
      function processLeadDataLambda(data){
        return {
          name: data.name,
          phone: formatPhoneNumber(data.phone),
          address: data.street,
          city: data.city,
          state_short: data.state_short,
          zip: data.zip,
          rent_own: data.owner ? 'Own' : 'Rent',
          bill: String(data.bill),
          credit_score: data.credit_score,
          max_panels: data.max_panels,
          roof_area: data.roof_area,
          sunlight_hours: data.sunlight_hours,
          wattage: data.wattage,
          test: data.test ? 'test': 'real',
          utm_term: data.utm_term,
          utm_source: data.utm_source, 
          utm_campaign: data.utm_campaign,
          utm_content: data.utm_content, 
          utm_medium: data.utm_medium,
          hash: data.hash
        }
      }
  
      function getFormData() {
        // Fetch values from form inputs
        let formData = {
          type: 'initial',
          name: document.getElementById('name').value,
          address: document.getElementById('formAddress').value,
          phone: document.getElementById('phone').value,
          credit_score: document.getElementById('credit-score').value,
          bill: window.current_bill, // Get the value of the slider
          owner: document.getElementById('owner').checked,
          lat: document.getElementById('lat').value,
          lon: document.getElementById('lon').value,
          street: document.getElementById('formStreet').value,
          city: document.getElementById('formCity').value,
          state_short: document.getElementById('formStateShort').value,
          state_long: document.getElementById('formStateLong').value,
          zip: document.getElementById('formZip').value,
          business_name: document.getElementById('businessName').value,
          // monday_link: 'https://test.com'
        };
        const solar_data = {
          array_area: document.getElementById('array_area').value,
          roof_area: document.getElementById('roof_area').value,
          max_panels: document.getElementById('max_panels').value,
          wattage: document.getElementById('wattage').value,
          sunlight_hours: document.getElementById('sunlight_hours').value,
          carbon_offset: document.getElementById('carbon_offset').value,
        }
        let add_solar = true
        for (let key in solar_data) {
          if (solar_data[key] === '--' || solar_data[key] === undefined) {
            add_solar = false
          }
        }
        if(add_solar){
          formData = {
            ...formData,
            ...solar_data
          }
        }
        if(formData.credit_score === '640-700' || formData.credit_score === '700+'){
          formData['score'] = 'SQL'
        } else {
          formData['score'] = 'MQL'
        }
        if(window.hash_vals.ecl_data){
          formData["ecl_data"] = window.hash_vals.ecl_data
        }
        return formData;
      }
  
      async function postFormData() {
        if(window.submitting){
          return
        }
        window.submitting = true
        const formData = getFormData();
        const utmParams = getUTMs();
        const combinedData = {
          ...formData,
          ...utmParams
        };
  
        if(combinedData.phone === "1+ (555) 555-5555" || combinedData.phone === "(555) 555-5555" || combinedData.phone === "+1 (555) 555-5555" || combinedData.phone === "+15555555555"){
          combinedData['test'] = true
        }
        combinedData['hash'] = window.hash_vals.hash
        let hook_failed = false
        let fallback_failed = false
        if(combinedData.name.replace(/\s/g, '').toLowerCase() === "harrydatjagroo"){
          handleFormSuccess()
          return
        }
        const lambda_data = processLeadDataLambda(combinedData)
        try {
            // First fetch request
            let response = await fetch("https://12u66c9zqc.execute-api.us-east-1.amazonaws.com/production/deploy_l_m", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(lambda_data)
            });
  
            let responseData = await response.json();
            console.debug("RESPONSE", responseData);
  
            const body = JSON.parse(responseData.body);
            if (body.id) {
                window.monday_ret_id = body.id;
                triggered_success = true;
                handleFormSuccess();
            } else {
                if (fallback_failed) {
                    displayError("An error occurred while submitting the form.");
                    window.submitting = false
                }
                hook_failed = true;
            }
  
            // Update combinedData with the monday_link
            combinedData['monday_link'] = `https://lifestylemarketing-co.monday.com/boards/2225844788/pulses/${window.monday_ret_id}`;
  
            // Second fetch request
            response = await fetch("https://hook.us1.make.com/ipz50uifuwj9cydlq68mpvcc2kx5gf32", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(combinedData),
            });
  
            let textResponse = await response.text();
            if (textResponse === "Accepted") {
                if (!triggered_success) {
                    // handleFormSuccess();
                    // triggered_success = true
                }
            } else {
                // displayError("An error occurred while submitting the form.");
            }
        } catch (error) {
            console.error("Error:", error);
            // displayError("An error occurred while submitting the form.");
        }
  
          const encodableData = {
            ...combinedData,
            ...combinedData.ecl_data
          }
          let encodedData = new URLSearchParams();
          for (const key in combinedData) {
            encodedData.append(key, encodableData[key]);
          }
          for (const key in combinedData.ecl_data) {
            encodedData.append('results__'+key, combinedData.ecl_data[key]);
          }
          
  
          fetch("https://script.google.com/macros/s/AKfycbwdTe0Yh-Gln8EL3iUGEIuRe7RS6WckIGqAzxskib4FS7nJ4O8EHhM9jFH9uU88GJFsbA/exec", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: encodedData
          })
          .then((response) => {
            if(!response.ok){
              throw new Error("Network response to App Script failed")
            }
            return response.json()
          })
          .then((json) => {
            if(json.result === "success"){
              if(!triggered_success){
                handleFormSuccess()
              }
            } else {
              if(hook_failed){
                displayError("An error occurred while submitting the form.");
                window.submitting = false
              }
              fallback_failed = true
            }
          })
          .catch((error) => {
            if(hook_failed){
              displayError("An error occurred while submitting the form.");
              window.submitting = false
            }
            fallback_failed = true
          });
  
      }
  
  
      function handleFormSuccess() {
        const credit_val = document.getElementById('credit-score').value
        if (credit_val === '640-700' || credit_val === '700+') {
          //   document.querySelector('.modal1_content-wrapper').style.display = 'none'
          //   document.querySelector('.calendly').style.display = 'block'
          if (typeof fbq === "function") {
            fbq('track', 'Lead');
          }
          if (typeof dataLayer !== 'undefined') {
            dataLayer.push({
              'event': 'sql'
            });
          }
          document.getElementById('exitCTAButton').style.display = 'block'
          window.is_sql = true
          // Set a timer to trigger the Calendly widget after 10 seconds
          startCalendlyTimer()
        } else {
          document.getElementById('exitCTAHeading').innerHTML = 'Your Free Quote'
          document.getElementById('exitCTASubHeading').innerHTML = "This is an estimate based on the information you provided. For an accurate assessment on your total savings, you'll need to speak with a qualified solar representative."
          if (typeof fbq === "function") {
            fbq('track', 'SubmitApplication');
          }
          if (typeof dataLayer !== 'undefined') {
            dataLayer.push({
              'event': 'mql'
            });
          }
        }
        showSuccess()
      }
    }
    let load_bar_filled
    window.load_bar_filled = load_bar_filled
    let page_data_loaded
    if (window.location.href.indexOf('quote') !== -1) {
  
      document.addEventListener("DOMContentLoaded", function() {
        var current_progress = 0;
        var interval;
  
        var startProgress = function() {
          clearError()
          interval = setInterval(function() {
            if (window.page_data_loaded) {
              current_progress = 100;
            } else if (current_progress < 100) {
              current_progress += 10;
            }
            var dynamicElement = document.getElementById("dynamic");
            var messageElement = document.getElementById("current-progress");
  
            if (dynamicElement) {
              dynamicElement.style.width = current_progress + "%";
              dynamicElement.setAttribute("aria-valuenow", current_progress);
  
              if (current_progress <= 25) {
                messageElement.textContent = "Searching address";
              } else if (current_progress <= 50) {
                messageElement.textContent = "Analyzing roof";
              } else if (current_progress <= 75) {
                messageElement.textContent = "Measuring sunlight";
              } else {
                messageElement.textContent = "Getting quote";
                window.load_bar_filled = true
              }
  
              if (current_progress >= 100 && window.hash_vals && window.current_bill) {
                clearInterval(interval);
  
                setTimeout(function() {
                  var formAddress = document.getElementById("formAddress");
                  var quote1 = document.getElementById("quote1");
                  var quote2 = document.getElementById("quote2");
                  var quote3 = document.getElementById("quote3");
                  if (window.selectedPlaceCTA || formAddress && formAddress.value.trim() !== '') {
                    if (quote2) {
                      quote2.style.display = "none";
                    }
                    if (quote3) {
                      quote3.style.display = "block";
                    }
                    window.load_bar_filled = true
                    // if (window.page_data_loaded) {
                    setPageData()
                    showPage()
                    // }
                  } else {
                    if (quote1) {
                      quote1.style.display = "block";
                    }
                    if (quote2) {
                      quote2.style.display = "none";
                    }
                    if (quote3) {
                      quote3.style.display = "none";
                    }
                    if (dynamicElement) {
                      dynamicElement.style.width = "0%";
                      dynamicElement.setAttribute("aria-valuenow", 0);
                      messageElement.textContent = "";
                    }
                    current_progress = 0
                    displayError('Please input your addrress.')
                  }
                }, 250);
              }
            }
          }, 500);
        };
  
        var checkHashAndStart = function() {
          if (window.location.hash) {
            var quote1 = document.getElementById("quote1");
            var quote2 = document.getElementById("quote2");
  
            if (quote1) {
              quote1.style.display = "none";
            }
            if (quote2) {
              quote2.style.display = "block";
              startProgress(); // Start the progress animation
            }
          }
        };
  
        checkHashAndStart();
  
        var quote2 = document.getElementById("quote2");
        var quote2Observer = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
            if (mutation.type === "attributes" && mutation.attributeName === "style") {
              var displayStyle = quote2.style.display;
              if (displayStyle === "block") {
                startProgress();
                //   quote2Observer.disconnect();
              }
            }
          });
        });
  
        quote2Observer.observe(quote2, {
          attributes: true
        });
  
        var quote1 = document.getElementById("quote1");
        var quote1Observer = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
            if (mutation.type === "attributes" && mutation.attributeName === "style") {
              var displayStyle = quote1.style.display;
              if (displayStyle === "none" && quote2) {
                quote2.style.display = "block";
              }
            }
          });
        });
  
        quote1Observer.observe(quote1, {
          attributes: true
        });
      });
    }
    // embed 1
  
    window.hash_vals = null
    let maskData = {}
    let fluxData = {}
    let color_range = ['00000A', '91009C', 'E64616', 'FEB400', 'FFFFF6']
    window.color_range = color_range
    const panelsPalette = ['E8EAF6', '1A237E']
    window.panelsPalette = panelsPalette
    window.solar_panels = []
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
      if (window.current_bill) {
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
        const potential = await showSolarPotential(map)
        if(potential){
          document.getElementById('solarPanelSlider').max = solarPotentialData.solarPanelConfigs[solarPotentialData.solarPanelConfigs.length - 1].panelsCount
          document.getElementById('solarPanelSlider').min = solarPotentialData.solarPanelConfigs[0].panelsCount
          document.getElementById('solarPanelSlider').value = solarPotentialData.solarPanelConfigs[solarPotentialData.solarPanelConfigs.length - 1].panelsCount / 4
          document.getElementById('solarPanelSlider').addEventListener('input', (event) => {
            const setIndex = parseInt(event.target.value, 10)
            updateSolarPanels(map, setIndex - 1)
          })
          const sliderContainer = document.getElementById('solarPanelSliderContainer');
          map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(sliderContainer)
          setInterval(() => {
            // sliderContainer.style.display = 'flex'
          }, 2000);
        }
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
      window.solar_panels.forEach(panel => panel.setMap(null))
      const solarPotential = solarPotentialData
      if(!solarPotential.roofSegmentStats){
        return false
      }
      const palette = createPalette(panelsPalette, 256)
      const minEnergy = solarPotential.solarPanels[solarPotential.solarPanels.length - 1].yearlyEnergyDcKwh
      const maxEnergy = solarPotential.solarPanels[0].yearlyEnergyDcKwh
      window.solar_panels = solarPotential.solarPanels.map(panel => {
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
  
      const init_amount = Math.ceil((window.solar_panels.length - 1) / 4)
      if (init_amount > 4) {
        updateSolarPanels(map, init_amount)
      } else {
        updateSolarPanels(map, 3)
      }
      return true
    }
  
    function updateSolarPanels(map, setIndex) {
      window.solar_panels.forEach(panel => panel.setMap(null))
      for (let i = 0; i <= setIndex; i++) {
        window.solar_panels[i].setMap(map)
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
      setTimeout(() => {
        if(window.hash_vals.roof_stats){
          document.getElementById('solarPanelSliderContainer').style.display = 'flex'
        }
      }, 1000);
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
  
    function deriveLongAddress(code) {
      const address_mapping = {
        "AL": "Alabama",
        "AK": "Alaska",
        "AZ": "Arizona",
        "AR": "Arkansas",
        "CA": "California",
        "CO": "Colorado",
        "CT": "Connecticut",
        "DE": "Delaware",
        "FL": "Florida",
        "GA": "Georgia",
        "HI": "Hawaii",
        "ID": "Idaho",
        "IL": "Illinois",
        "IN": "Indiana",
        "IA": "Iowa",
        "KS": "Kansas",
        "KY": "Kentucky",
        "LA": "Louisiana",
        "ME": "Maine",
        "MD": "Maryland",
        "MA": "Massachusetts",
        "MI": "Michigan",
        "MN": "Minnesota",
        "MS": "Mississippi",
        "MO": "Missouri",
        "MT": "Montana",
        "NE": "Nebraska",
        "NV": "Nevada",
        "NH": "New Hampshire",
        "NJ": "New Jersey",
        "NM": "New Mexico",
        "NY": "New York",
        "NC": "North Carolina",
        "ND": "North Dakota",
        "OH": "Ohio",
        "OK": "Oklahoma",
        "OR": "Oregon",
        "PA": "Pennsylvania",
        "RI": "Rhode Island",
        "SC": "South Carolina",
        "SD": "South Dakota",
        "TN": "Tennessee",
        "TX": "Texas",
        "UT": "Utah",
        "VT": "Vermont",
        "VA": "Virginia",
        "WA": "Washington",
        "WV": "West Virginia",
        "WI": "Wisconsin",
        "WY": "Wyoming",
      }
      return address_mapping[code]
    }
  
    function getCurrentBill(display_address, hash) {
      const address = display_address.split(',')
      const fetch_url = "https://hook.us1.make.com/tep8c8fk7o805g1fk9dd16vjder5hpp9"
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
      fetch(fetch_url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(fetch_object)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          // Check if 'amount' exists in the response and set window.current_bill
          if (data && 'amount' in data) {
            // window.current_bill = data.amount;
            // const sliders = document.querySelectorAll('.slider-container')
            // sliders[0].style.display = 'none'
            window.current_bill = 150
            console.log('Current bill set to:', window.current_bill);
          }
        })
        .catch(error => {
          console.error('Error fetching current bill:', error);
          window.current_bill = 150
        });
      if (window.hash_vals) {
        window.page_data_loaded = true
      }
      if (window.current_bill) {
        // const sliders = document.querySelectorAll('.slider-container')
        // sliders[0].style.display = 'none'
        return
      }
  
    }
    window.getCurrentBill = getCurrentBill
  
    const urlParams = new URLSearchParams(window.location.search)
    document.addEventListener("DOMContentLoaded", function() {
      if (isCommercial()) {
        document.getElementById('businessName').style.display = 'block';
        // document.getElementById('modal').style.display = 'none';
        // document.getElementById('app').style.display = 'none';
        // document.querySelector('.modal1_content-wrapper').style.display = 'block'
      }
      if (urlParams.has('hash') && window.location.href.indexOf('quote') !== -1) {
        // showPage()
        try {
          const lat = getCookie('lat');
          const long = getCookie('long');
          const display_address = decodeURIComponent(getCookie('display_address'));
          document.getElementById('quote1').style.display = 'none'
          document.querySelector('.modal1_content-wrapper').style.display = 'block'
          const hashValue = urlParams.get('hash')
          // getCurrentBill(display_address, hashValue)
          fetch(`https://vj61befm45.execute-api.us-east-1.amazonaws.com/default/solar_hash?data_hash=${hashValue}&set_hash=True&lat=${lat}&long=${long}&display_address=${encodeURIComponent(display_address)}`, {
              method: 'GET',
            })
            .then(response => response.json())
            .then(data => {
              if (data.lat) {
                // if (window.current_bill) {
                window.page_data_loaded = true
                // }
                window.hash_vals = data
                // if(data.ecl_data && data.ecl_data.mean_monthly_usage){
                //   window.current_bill = data.ecl_data.mean_monthly_usage
                //   const sliders = document.querySelectorAll('.slider-container')
                //   sliders[0].style.display = 'none'
                // } else {
                  window.current_bill = 150
                // }
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
      } else if (window.location.href.indexOf('quote')) {
        document.querySelector('.modal1_content-wrapper').style.display = 'block'
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
    document.addEventListener("DOMContentLoaded", function() {
      // Function to determine if the device is desktop
      function isDesktop() {
        return window.matchMedia('(pointer:fine)').matches;
      }
  
      // Set a timer to change the display and text after one minute
      setTimeout(() => {
        // Only change the display if it's not a desktop or if the exit intent hasn't been shown yet
        if (!isDesktop() || !document.getElementById('exitIntent').style.display) {
          document.getElementById('exitIntent').style.display = 'block';
          document.getElementById('exitHeading').textContent = "Get a FREE solar savings estimate!";
        }
      }, 60000); // 60000 milliseconds = 1 minute
  
      // Only add mouseout listener on desktop devices
      if (isDesktop()) {
        // Function to detect exit intent on desktop
        function showExitIntent(e) {
          // Check if the cursor is at the top of the viewport
          if (e.clientY < 10) {
            document.getElementById('exitIntent').style.display = 'block';
          }
        }
  
        // Add an event listener for mouseout on desktop
        document.addEventListener('mouseout', showExitIntent);
      }
    });
  
    function setupTelephoneLinkListener() {
      // Find all telephone links on the page
      const telLinks = document.querySelectorAll('a[href^="tel:"]');
  
      // Add click event listener to each telephone link
      telLinks.forEach(link => {
        link.addEventListener('click', function(event) {
          fbq('track', 'Contact');
          if (typeof dataLayer !== 'undefined') {
            dataLayer.push({
              'event': 'phone_call'
            });
          }
        });
      });
    }
  
    // Call the function when the DOM is fully loaded
    document.addEventListener('DOMContentLoaded', setupTelephoneLinkListener);
    async function fetchCalendlyDetails(uris) {
      const lambda_uri = 'https://wxhh6kausb.execute-api.us-east-1.amazonaws.com/default/handle_calendly'
      const body = {
        event_url: uris.event_uri,
        invitee_url: uris.invitee_uri,
        item_id: window.monday_ret_id
      }
      const response = await fetch(lambda_uri, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body)
      });
      if (!response.ok) {
          throw new Error(`Error fetching Calendly data: ${response.statusText}`);
      }
      return await response.json();
    }
  
    async function calendlyEventHandler(event) {
      if (event.data.event && event.data.event === 'calendly.event_scheduled') {
        try {
            const event_uri = event.data.payload.event.uri;
            const invitee_uri = event.data.payload.invitee.uri;
            console.debug('')
            const event_details_json = await fetchCalendlyDetails({
              event_uri: event_uri,
              invitee_uri: invitee_uri
            })
            const event_details = JSON.parse(event_details_json.body);
            const date_vals = event_details.column_vals.date7.split(' ')
            const calendly_data = {
              type: 'calendly',
              hash: window.hash_vals.hash,
              name: document.getElementById('name').value,
              phone: document.getElementById('phone').value,
              email: event_details.column_vals.email.split(' ')[0],
              date: date_vals[0],
              time: date_vals[1]
            }
            if(calendly_data.phone === "1+ (555) 555-5555"){
              calendly_data['test'] = true
            }
            fetch("https://hook.us1.make.com/ipz50uifuwj9cydlq68mpvcc2kx5gf32", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(calendly_data),
            })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not ok')
              }
              return response.text()
            })
            .then((text) => {
              if (text === "Accepted") {
                console.debug("INPUT ACCEPTED")
              }
            })
        } catch (error) {
            console.error("Error sending calendly event details:", error);
        }
        setTimeout(function() {
          if (typeof fbq === "function") {
            fbq('track', 'Schedule');
          }
          if (typeof dataLayer !== 'undefined') {
            dataLayer.push({
              'event': 'appointment_scheduled'
            });
          }
          // showSuccess();
        }, 1000);
      } 
    }
  
    document.addEventListener("DOMContentLoaded", function() {
      window.addEventListener('message', function(e) {
        calendlyEventHandler(e)
      })
      const a_buttons = document.querySelectorAll('a.text-align-center')
      a_buttons.forEach((button) => {
        if (button.outerText === 'Skip this step') {
          button.addEventListener('click', function() {
            //   showSuccess()
          })
        }
      })
    })
    document.addEventListener("DOMContentLoaded", function() {
      if (window.location.href.indexOf('quote') !== -1) {
        // Function to determine if the device is desktop
        function isDesktop() {
          return window.matchMedia('(pointer:fine)').matches;
        }
  
        // Function to initialize Calendly widget
        function initCalendly(is_timeout = false) {
          if (!window.calendly_initialized && is_timeout || !is_timeout) {
            Calendly.initPopupWidget({
              url: 'https://calendly.com/lifestyle-solar/discoverycall?hide_event_type_details=1&hide_gdpr_banner=1&text_color=0f0f0f&primary_color=00ba81' + `&location=${document.getElementById('phone').value}`,
              prefill: {
                name: document.getElementById('name').value,
              }
            });
            document.getElementById('loadingCountdown').style.display = 'none'
            window.calendly_initialized = true
          }
        }
        window.initCalendly = initCalendly
  
        // Function to check the required conditions
        function checkConditions() {
          var calendlyClicked = document.getElementById('calendlyLink');
          var urlContainsQuote = window.location.href.includes('/quote');
          var exitCTAButtonVisible = window.is_sql
          return !calendlyClicked.clicked && urlContainsQuote && exitCTAButtonVisible;
        }
        window.checkConditions = checkConditions
  
        function startCalendlyTimer() {
          var countdownElement = document.getElementById('loadingCountdownNumber');
          if (countdownElement) {
            var countdownValue = parseInt(countdownElement.textContent, 10);
            var countdownInterval = setInterval(function() {
              countdownValue--;
              countdownElement.textContent = countdownValue;
              if (countdownValue <= 0) {
                clearInterval(countdownInterval);
              }
            }, 1000); // 1000 milliseconds = 1 second
          }
  
          setTimeout(function() {
            if (checkConditions()) {
              initCalendly(true);
            }
          }, 10000); // 10000 milliseconds = 10 seconds
        }
        window.startCalendlyTimer = startCalendlyTimer
  
        // Event listener to set 'clicked' property on the calendlyClicked element
        document.getElementById('calendlyLink').addEventListener('click', function() {
          this.clicked = true;
        });
  
        // Only add mouseout listener on desktop devices
        if (isDesktop()) {
          // Function to detect exit intent on desktop
          function showExitIntent(e) {
            // Check if the cursor is at the top of the viewport
            if (e.clientY < 10 && checkConditions()) {
              initCalendly();
            }
          }
  
          // Add an event listener for mouseout on desktop
          // document.addEventListener('mouseout', showExitIntent);
        }
      }
    });
  }
})();