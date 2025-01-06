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
        fetch("https://hook.us1.make.com/p3ahdyh2g8av5dwtp3bipg78pjlzaz08", {
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
  
  document.addEventListener("DOMContentLoaded", function(){
    window.addEventListener('message', function(e){
        calendlyEventHandler(e)
    })
    const a_buttons = document.querySelectorAll('a.text-align-center')
    a_buttons.forEach((button) => {
      if(button.outerText === 'Skip this step'){
        button.addEventListener('click', function(){
        //   showSuccess()
        })
      }
    })
  })