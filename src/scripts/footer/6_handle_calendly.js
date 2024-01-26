async function calendlyEventHandler(event) {
  if (event.data.event && event.data.event === 'calendly.event_scheduled') {
    try {
        // const eventDetails = await fetchCalendlyDetails(event.data.payload.event.uri);
        // const inviteeDetails = await fetchCalendlyDetails(event.data.payload.invitee.uri);

        // console.debug("Event Details:", eventDetails);
        // console.debug("Invitee Details:", inviteeDetails);
        const calendly_data = {
          type: 'calendly',
          hash: window.hash_vals.hash,
          name: document.getElementById('name').value,
          phone: document.getElementById('phone').value,
          email: 'test@test.com',
          date: '01/02/24',
          time: '1:30pm EST'
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