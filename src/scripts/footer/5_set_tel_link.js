function setupTelephoneLinkListener() {
    // Find all telephone links on the page
    const telLinks = document.querySelectorAll('a[href^="tel:"]');

    // Add click event listener to each telephone link
    telLinks.forEach(link => {
      link.addEventListener('click', function(event) {
        fbq('track', 'Contact');
        if (typeof dataLayer !== 'undefined') {
            dataLayer.push({'event': 'phone_call'});
          }
      });
    });
  }

  // Call the function when the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', setupTelephoneLinkListener);