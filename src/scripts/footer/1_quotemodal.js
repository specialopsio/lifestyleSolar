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
            return {
              "utm_term": window.sbjs.get.current.trm,
              "utm_source": window.sbjs.get.current.src,
              "utm_campaign": window.sbjs.get.current.cmp,
              "utm_content": window.sbjs.get.current.cnt,
              "utm_medium": window.sbjs.get.current.mdm
            };
          } else {
            return {
              // "utm_term": '(none)',
              // "utm_source": '(none)',
              // "utm_campaign": '(none)',
              // "utm_content": '(none)',
              // "utm_medium": '(none)'
            };
          }
        } catch (error) {
          console.debug("ERROR LOADING SBJS");
        }
        return {
          // "utm_term": '(none)',
          // "utm_source": '(none)',
          // "utm_campaign": '(none)',
          // "utm_content": '(none)',
          // "utm_medium": '(none)'
        };
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
          credit_score: data.scredit_score,
          max_panels: data.max_panels,
          roof_area: data.roof_area,
          sunlight_hours: data.sunlight_hours,
          wattage: data.wattage,
          test: data.test ? 'test': 'real',
          hash: data.hash
        }
      }
  
      function getFormData() {
        // Fetch values from form inputs
        const formData = {
          type: 'initial',
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
          business_name: document.getElementById('businessName').value,
          carbon_offset: document.getElementById('carbon_offset').value,
          // monday_link: 'https://test.com'
        };
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
            response = await fetch("https://hook.us1.make.com/p3ahdyh2g8av5dwtp3bipg78pjlzaz08", {
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
          
  
          fetch("https://script.google.com/macros/s/AKfycbx7-6jXhp-ECM7-I_7GlNwhVirwqLhBEcQeUq8dGcE59_1yDoaENdWou071KF1hXcdQgQ/exec", {
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