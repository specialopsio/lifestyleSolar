document.addEventListener("DOMContentLoaded", function() {
  // Function to determine if the device is desktop
  function isDesktop() {
    return window.matchMedia('(pointer:fine)').matches;
  }

  // Function to initialize Calendly widget
  function initCalendly() {
    if(!window.calendly_initialized){
      Calendly.initPopupWidget({
        url: 'https://calendly.com/lifestyle-solar/discoverycall?hide_event_type_details=1&hide_gdpr_banner=1&text_color=0f0f0f&primary_color=00ba81'
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
        initCalendly();
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
    document.addEventListener('mouseout', showExitIntent);
  }
});