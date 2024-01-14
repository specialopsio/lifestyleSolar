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