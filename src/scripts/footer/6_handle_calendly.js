function calendlyEventHandler(event){
    if(event.data.event && event.data.event === 'calendly.event_scheduled') {
      setTimeout(function() {
        if (typeof fbq === "function") {
            fbq('track', 'Schedule');
        }
        if (typeof dataLayer !== 'undefined') {
            dataLayer.push({'event': 'appointment_scheduled'});
          }
        showSuccess();
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
          showSuccess()
        })
      }
    })
  })