let selectedPlaceHero
let selectedPlaceNav
let selectedPlaceCTA
let selectedPlaceExit
let sliderValueHero = 150
let sliderValueNav = 150
let sliderValueCTA = 150
let sliderValueExit = 150

// Initialises the autocomplete
function initAutocomplete(){
    var inputElements = document.querySelectorAll('.address-input')
    inputElements.forEach(function(element){
        var autocomplete = new google.maps.places.Autocomplete(element)
        autocomplete.addListener('place_changed', function() {
            console.debug("place changed", element.closest('div').parentElement)
            if (element.closest('div').parentElement.id === 'hero-calc') {
                selectedPlaceHero = autocomplete.getPlace()
                updateButtonState('hero')
            } else if (element.closest('div').parentElement.id === 'nav-calc') {
                selectedPlaceNav = autocomplete.getPlace()
                updateButtonState('nav')
            }  else if (element.closest('div').parentElement.id === 'cta-calc') {
                selectedPlaceCTA = autocomplete.getPlace()
                updateButtonState('cta')
            }  else if (element.closest('div').parentElement.id === 'exit-calc') {
                selectedPlaceExit = autocomplete.getPlace()
                updateButtonState('exit')
            } else if (element.closest('div').parentElement.parentElement.id === 'hero-calc') {
                selectedPlaceHero = autocomplete.getPlace()
                updateButtonState('hero')
            } else if (element.closest('div').parentElement.parentElement.id === 'nav-calc') {
                selectedPlaceNav = autocomplete.getPlace()
                updateButtonState('nav')
            }  else if (element.closest('div').parentElement.parentElement.id === 'cta-calc') {
                selectedPlaceCTA = autocomplete.getPlace()
                updateButtonState('cta')
            }  else if (element.closest('div').parentElement.parentElement.id === 'exit-calc') {
                selectedPlaceExit = autocomplete.getPlace()
                updateButtonState('exit')
            }
        });
    });
}

google.maps.event.addDomListener(window, 'load', initAutocomplete)

// Generates the "hash" that differentiates requests
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

function updateButtonState(area){
    const button = document.querySelector(`#${area}-calc button`)
    if ( button && button.classList.contains("disabled")) {
        if ((area === 'hero' && selectedPlaceHero) || (area === 'nav' && selectedPlaceNav) || (area === 'cta' && selectedPlaceCTA) || (area === 'exit' && selectedPlaceExit)){
            button.classList.remove("disabled")
        }
    }
}

// This function acquires the autocomplete value and slider data on button click
function getAutocompleteValue(area) {
    const selected_place = selectedPlace ? selectedPlace : area === 'hero' ? selectedPlaceHero : area === 'cta' ? selectedPlaceCTA : area === 'exit' ? selectedPlaceExit : selectedPlaceNav
    const is_quote = window.location.pathname.match('/quote')
    if (is_quote) {
      if (selected_place) {
        document.getElementById('quote1').style.display = 'none'
      } else {
        displayError('Please input your address.')
      }
    }
    const sliderValue = area === 'hero' ? sliderValueHero : area === 'cta' ? sliderValueCTA : area === 'exit' ? sliderValueExit : sliderValueNav
    let elementsWithSharedId = document.querySelectorAll('[id="calculateButton"]');
    elementsWithSharedId.forEach(function(element) {
      var onClickAttribute = element.getAttribute('onclick')
      var regex = /getAutocompleteValue\('(.+?)'\)/
      var match = regex.exec(onClickAttribute)

      if (match && match[1] && !is_quote) {
        if (match[1] === area) {
          element.innerHTML = "One moment..."
        }
      }
    })
    if (selected_place.geometry && selected_place.formatted_address) {
      const lat = selected_place.geometry.location.lat()
      const long = selected_place.geometry.location.lng()
      const display_address = selected_place.formatted_address
      const hash = generateRandomString()
      fetch(`https://vj61befm45.execute-api.us-east-1.amazonaws.com/default/solar_hash?data_hash=${hash}&set_hash=True&lat=${lat}&long=${long}&current_bill=${sliderValue}&display_address=${display_address}`)
        .then(response => response.json())
        .then(data => {
          if (window.location.pathname.match('/quote')) {
            page_data_loaded = true
            hash_vals = data
            if (load_bar_filled) {
              setPageData()
              showPage()
            }
          } else {
            window.location.href = `/quote.html?hash=${data.hash}`
          }
        }).catch(error => {
          console.error("ERROR", error)
        })
    } else {
      console.debug("NO VALID ADDRESS INPUT")
    }
  }

// Just for visibilities sake this edits the input slider value so I can validate what was received
function updateSliderValue(value, area) {
    if (area === 'hero') {
        sliderValueHero = value
    } else if (area === 'nav') {
        sliderValueNav = value
    } else if (area === 'cta') {
        sliderValueCTA = value
    } else if (area === 'exit') {
        sliderValueExit = value
    }
    updateButtonState(area)
}


// second script

// Get all the slider-container elements by their class name
const sliderContainers = document.querySelectorAll('.slider-container');

// Loop through each slider-container
sliderContainers.forEach(function(container) {
  // Find the slider and billValue elements within the current container
  const billSlider = container.querySelector('input[type="range"]');
  const billValue = container.querySelector('span');

  // Attach an input event listener to the slider
  billSlider.addEventListener('input', function() {
    // Update the billValue innerText with the current value of the slider
    billValue.innerText = `$${this.value}`;
  });
});
