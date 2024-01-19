if (window.location.href.indexOf('quote') !== -1) {

    document.addEventListener("DOMContentLoaded", function() {
      // Google Maps Autocomplete Initialization
      if (typeof google !== "undefined" && google.maps && google.maps.places) {
        initializeAutocomplete();
      }

      // Form Submission Event Listener
      document.getElementById("propertyForm").addEventListener("submit", function(event) {
        event.preventDefault();

        var name = document.getElementById("name").value;
        var address = document.getElementById("formAddress").value;
        var phone = document.getElementById("phone").value;
        var creditScore = document.getElementById("credit-score").value;
        var owner = document.getElementById("owner").checked;
        var current_bill = document.querySelector('input#bill').value 

        if (validateFormData(name, address, phone, creditScore, owner)) {
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


    function validateFormData(name, address, phone, creditScore, owner) {
      resetFormStyling();
      var isValid = true;

      if (!name || !address || !phone || creditScore === "Credit Score" || !owner) {
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
          return {
            "utm_term": window.sbjs.get.current.trm,
            "utm_source": window.sbjs.get.current.src,
            "utm_campaign": window.sbjs.get.current.cmp,
            "utm_content": window.sbjs.get.current.cnt,
            "utm_medium": window.sbjs.get.current.mdm
          };
        }
      } catch (error) {
        console.debug("ERROR LOADING SBJS");
      }
      return {};
    }

    function getFormData() {
      // Fetch values from form inputs
      const formData = {
        name: document.getElementById('name').value,
        address: document.getElementById('formAddress').value,
        phone: document.getElementById('phone').value,
        credit_score: document.getElementById('credit-score').value,
        bill: window.current_bill, // Get the value of the slider
        owner: document.getElementById('owner').checked,
        array_area: document.getElementById('array_area').value,
        roof_area: document.getElementById('roof_area').value,
        max_panels: document.getElementById('max_panels').value,
        wattage: document.getElementById('wattage').value,
        sunlight_hours: document.getElementById('sunlight_hours').value,
        lat: document.getElementById('lat').value,
        lon: document.getElementById('lon').value,
        street: document.getElementById('formStreet').value,
        city: document.getElementById('formCity').value,
        state_short: document.getElementById('formStateShort').value,
        state_long: document.getElementById('formStateLong').value,
        zip: document.getElementById('formZip').value,

        carbon_offset: document.getElementById('carbon_offset').value
      };
      return formData;
    }

    function postFormData() {
      const formData = getFormData();
      const utmParams = getUTMs();
      const combinedData = {
        ...formData,
        ...utmParams
      };

      fetch("https://hook.us1.make.com/8xt51qbsf0c2o58sd12w62gv5gypn8ms", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(combinedData),
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.text()
        })
        .then((text) => {
          if (text === "Accepted") {
            handleFormSuccess();
          } else {
            displayError("An error occurred while submitting the form.");
          }
        })
        .catch((error) => {
          displayError("An error occurred while submitting the form.");
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
            dataLayer.push({'event': 'sql'});
          }
        } else {
          document.getElementById('exitCTAButton').style.display = 'none'
          document.getElementById('exitCTAHeading').innerHTML = 'Your Free Quote'
          document.getElementById('exitCTASubHeading').innerHTML = "This is an estimate based on the information you provided. For an accurate assessment on your total savings, you'll need to speak with a qualified solar representative."
        if (typeof fbq === "function") {
            fbq('track', 'SubmitApplication');
        }
        if (typeof dataLayer !== 'undefined') {
            dataLayer.push({'event': 'mql'});
          }
        }
        showSuccess()
      }
  }