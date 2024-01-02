// code to run the survey and NPS scripts on /feedback page

document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const password = params.get("password");
    const userId = params.get("user");
    const formId = params.get("form");
    const customHeading = params.get("heading");
    const makeTableId = "MnVGNFo3NA==";
    const validFormIds = ["1", "10", "22", "50", "0", "99"];
    let submitPressed
  
    // URL parameter checks
    if (
      !password ||
      !userId ||
      !formId ||
      btoa(password) !== makeTableId ||
      !validFormIds.includes(formId)
    ) {
      window.location.href = "https://www.lifestylesolar.com";
      return;
    } else {
      document.getElementById("mainApp").classList.remove("hidden");
    }
  
    document.getElementById("customerId").value = userId;
    document.getElementById("formId").value = formId;
  
    // Display the relevant form section
    if (formId === "1") {
      document.getElementById("preInstall").classList.remove("hidden");
      initPreInstallValidation();
    } else {
      document.getElementById("nps").classList.remove("hidden");
      initNPSValidation();
    }
  
    if (formId === "1") {
      document.getElementById("heading").innerText = "Pre-Install Survey";
    } else if (formId === "0") {
      document.getElementById("heading").innerText = "We miss hearing from you!";
    } else if (formId === "10") {
      document.getElementById("heading").innerText = "How was your consultation?";
    } else if (formId === "22") {
      document.getElementById("heading").innerText = "Ready for your install?";
    } else if (formId === "50") {
      document.getElementById("heading").innerText = "Enjoying solar so far?";
    } else {
      document.getElementById("heading").innerText = customHeading;
    }
  
    function initPreInstallValidation() {
      // Initialize event listeners for each select element in the pre-install form
      document.querySelectorAll("#preInstall select").forEach((select) => {
        select.addEventListener("change", validatePreInstallForm);
      });
    }
  
    function initNPSValidation() {
      // Initialize event listeners for each button in the NPS rating scale
      document.querySelectorAll(".rating-scale button").forEach((button) => {
        button.addEventListener("click", () => {
          document.querySelectorAll(".rating-scale button").forEach((btn) => {
            // Remove all styling classes from each button
            btn.classList.remove(
              "selected",
              "bg-red-500",
              "border-red-500",
              "focus:ring-red-500",
              "bg-yellow-400",
              "border-yellow-400",
              "focus:ring-yellow-400",
              "bg-[#00BA81]",
              "border-[#00BA81]",
              "focus:ring-[#00BA81]",
              "text-white"
            );
          });
  
          // Add the selected class to the clicked button
          button.classList.add("selected");
          const rating = parseInt(button.textContent);
  
          // Apply specific styles based on the rating value
          if (rating >= 1 && rating <= 3) {
            button.classList.add(
              "bg-red-500",
              "border-red-500",
              "focus:ring-red-500",
              "text-white"
            );
          } else if (rating >= 4 && rating <= 7) {
            button.classList.add(
              "bg-yellow-400",
              "border-yellow-400",
              "focus:ring-yellow-400"
            );
          } else if (rating >= 8 && rating <= 10) {
            button.classList.add(
              "bg-[#00BA81]",
              "border-[#00BA81]",
              "focus:ring-[#00BA81]",
              "text-white"
            );
          }
  
          // Validate the NPS form
          validateNPSForm();
        });
      });
    }
  
    function validatePreInstallForm() {
        if(submitPressed){
            let isValid = true;
            document.querySelectorAll("#preInstall select").forEach((select) => {
                const label = document.querySelector(`label[for='${select.id}']`);
                // Check if the select value is the default placeholder
                if (select.value === "Select your answer") {
                isValid = false;
                label.classList.add("text-red-600");
                document.getElementById("error").classList.remove("opacity-0");
                } else {
                label.classList.remove("text-red-600");
                }
            });

            // Hide the error message if the form is valid
            if (isValid) {
                document.getElementById("error").classList.add("opacity-0");
            }
            return isValid;
        }
    }
  
    function validateNPSForm() {
      const selected = document.querySelector(".rating-scale .selected");
      const label = document.querySelector("label[for='rating']");
      // Check if any rating button is selected
      if (!selected) {
        label.classList.add("text-red-600");
        document.getElementById("ratingLabel").classList.add("text-red-500");
        document.getElementById("error").classList.remove("opacity-0");
        return false;
      } else {
        label.classList.remove("text-red-600");
        document.getElementById("error").classList.add("opacity-0");
        document.getElementById("ratingLabel").classList.remove("text-red-500");
        return true;
      }
    }
  
    document
      .getElementById("propertyForm")
      .addEventListener("submit", function (event) {
        submitPressed = true
        event.preventDefault();
        // Determine which form to validate based on a condition (formId)
        let valid = formId === "1" ? validatePreInstallForm() : validateNPSForm();
  
        // If the form is valid, get the form data and post it
        if (valid) {
          const formData = getFormData();
          postFormData(formData);
        }
      });
  
    // Event listeners for input changes to remove error indicators
    document.querySelectorAll("#preInstall select").forEach((select) => {
      select.addEventListener("change", () => {
        const label = document.querySelector(`label[for='${select.id}']`);
        if (select.value !== "Select your answer") {
          label.classList.remove("text-red-600");
        }
        if (validatePreInstallForm()) {
          document.getElementById("error").classList.add("opacity-0");
        }
      });
    });
  
    document.querySelectorAll(".rating-scale button").forEach((button) => {
      button.addEventListener("click", () => {
        const label = document.querySelector("label[for='rating']");
        label.classList.remove("text-red-600");
        document.getElementById("error").classList.add("opacity-0");
      });
    });
  
    function getFormData() {
      const formData = {
        customerId: document.getElementById("customerId").value,
        formId: document.getElementById("formId").value,
      };
  
      if (
        document.getElementById("preInstall").classList.contains("hidden") ===
        false
      ) {
        formData.motivation = document.getElementById("motivation").value;
        formData.blocker = document.getElementById("blocker").value;
        formData.knowledge = document.getElementById("knowledge").value;
        formData.concern = document.getElementById("concern").value;
        formData.comments = document.getElementById("comments").value;
      } else {
        const selectedRating = document.querySelector(".rating-scale .selected");
        formData.rating = selectedRating ? selectedRating.innerText : null;
        formData.feedback = document.getElementById("feedback").value;
      }
  
      return formData;
    }
  
    function postFormData() {
      const formData = getFormData();
      fetch("https://hook.us1.make.com/vlol7xw9f5kvv1lsun0ck8c0qb9vzt1a", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.text();
        })
        .then((text) => {
          if (text === "Accepted") {
            handleFormSuccess();
          } else {
            console.error("An error occurred while submitting the form.");
          }
        })
        .catch((error) => {
          console.error("An error occurred while submitting the form.");
        });
    }
  
    function handleFormSuccess() {
      // Hide the form container
      document.getElementById("app").classList.add("hidden");
      document.getElementById("surveyHeading").classList.add("hidden");
      document.getElementById("error").classList.add("hidden");
      // Show the success message
      document.getElementById("surveySuccess").classList.remove("hidden");
    }
  });