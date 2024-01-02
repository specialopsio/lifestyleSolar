(function() {
  if (window.location.href.indexOf("lifestyle-solar.webflow.io") !== -1) {
    function updateSliderValue() {
      console.debug("YEAH")
    }
  }
  window.updateSliderValue = updateSliderValue;
  window.getAutocompleteValue = getAutocompleteValue;
})();