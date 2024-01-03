let bar_filled
let data_loaded
if(window.location.href.indexOf('quote') !== -1){

  document.addEventListener("DOMContentLoaded", function() {
    var current_progress = 0;
    var interval;
  
    var startProgress = function() {
      clearError()
      interval = setInterval(function() {
        current_progress += 10;
        var dynamicElement = document.getElementById("dynamic");
        var messageElement = document.getElementById("current-progress");
  
        if (dynamicElement) {
          dynamicElement.style.width = current_progress + "%";
          dynamicElement.setAttribute("aria-valuenow", current_progress);
  
          if (current_progress <= 25) {
            messageElement.textContent = "Searching address";
          } else if (current_progress <= 50) {
            messageElement.textContent = "Analyzing roof";
          } else if (current_progress <= 75) {
            messageElement.textContent = "Measuring sunlight";
          } else {
            messageElement.textContent = "Getting quote";
          }
  
          if (current_progress >= 100) {
            clearInterval(interval);
  
            setTimeout(function() {
              var formAddress = document.getElementById("formAddress");
              var quote1 = document.getElementById("quote1");
              var quote2 = document.getElementById("quote2");
              var quote3 = document.getElementById("quote3");
              if (selectedPlaceCTA || formAddress && formAddress.value.trim() !== '') {
                if (quote2) {
                  quote2.style.display = "none";
                }
                if (quote3) {
                  quote3.style.display = "block";
                }
                bar_filled = true
                if(data_loaded){
  
                  setPageData()
                  showPage()
                }
              } else {
                if (quote1) {
                  quote1.style.display = "block";
                }
                if (quote2) {
                  quote2.style.display = "none";
                }
                if (quote3) {
                  quote3.style.display = "none";
                }
                if (dynamicElement) {
                  dynamicElement.style.width = "0%";
                  dynamicElement.setAttribute("aria-valuenow", 0);
                  messageElement.textContent = "";
                }
                current_progress = 0
                displayError('Please input your addrress.')
              }
            }, 250);
          }
        }
      }, 500);
    };
  
    var checkHashAndStart = function() {
      if (window.location.hash) {
        var quote1 = document.getElementById("quote1");
        var quote2 = document.getElementById("quote2");
  
        if (quote1) {
          quote1.style.display = "none";
        }
        if (quote2) {
          quote2.style.display = "block";
          startProgress(); // Start the progress animation
        }
      }
    };
  
    checkHashAndStart();
  
    var quote2 = document.getElementById("quote2");
    var quote2Observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === "attributes" && mutation.attributeName === "style") {
          var displayStyle = quote2.style.display;
          if (displayStyle === "block") {
            startProgress();
          //   quote2Observer.disconnect();
          }
        }
      });
    });
  
    quote2Observer.observe(quote2, { attributes: true });
  
    var quote1 = document.getElementById("quote1");
    var quote1Observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === "attributes" && mutation.attributeName === "style") {
          var displayStyle = quote1.style.display;
          if (displayStyle === "none" && quote2) {
            quote2.style.display = "block";
          }
        }
      });
    });
  
    quote1Observer.observe(quote1, { attributes: true });
  });
}
