window.form_array = {
    "blocker": "",
    "concern": "",
    "knowledge": "",
    "motivation": ""
  }
  window.formSteps = [{
      id: "motivation",
      question: "What is your main reason for going solar?",
      options: [{
          text: "Helping the environment",
          svg: '<svg class="h-6 w-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M22 12A10 10 0 1 1 12 2a10 10 0 0 1 10 10z"></path></svg>',
          value: 0
        },
        {
          text: "Saving money monthly",
          svg: '<svg class="h-6 w-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c3.31 0 6-2.69 6-6 0 3.31-2.69 6-6 6z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 20c-3.31 0-6 2.69-6 6 0-3.31 2.69-6 6-6z"></path></svg>',
          value: 1
        },
        {
          text: "Stabilizing energy bills",
          svg: '<svg class="h-6 w-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>',
          value: 2
        },
        {
          text: "Energy independence",
          svg: '<svg class="h-6 w-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>',
          value: 3
        },
      ],
    },
    {
      id: "blocker",
      question: "What has stopped you from going solar until now?",
      options: [{
          text: "Lack of information",
          svg: '<svg class="h-6 w-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M22 12A10 10 0 1 1 12 2a10 10 0 0 1 10 10z"></path></svg>',
          value: 0
        },
        {
          text: "Concerns about costs",
          svg: '<svg class="h-6 w-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c3.31 0 6-2.69 6-6 0 3.31-2.69 6-6 6z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 20c-3.31 0-6 2.69-6 6 0-3.31 2.69-6 6-6z"></path></svg>',
          value: 1
        },
        {
          text: "Haven't considered it",
          svg: '<svg class="h-6 w-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>',
          value: 2
        },
        {
          text: "New homeowner",
          svg: '<svg class="h-6 w-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>',
          value: 3
        },
      ],
    },
    {
      id: "concern",
      question: "What is your biggest concern with the process?",
      options: [{
          text: "Price",
          svg: '<svg class="h-6 w-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M22 12A10 10 0 1 1 12 2a10 10 0 0 1 10 10z"></path></svg>',
          value: 0
        },
        {
          text: "Installation",
          svg: '<svg class="h-6 w-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c3.31 0 6-2.69 6-6 0 3.31-2.69 6-6 6z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 20c-3.31 0-6 2.69-6 6 0-3.31 2.69-6 6-6z"></path></svg>',
          value: 1
        },
        {
          text: "Knowledge needed",
          svg: '<svg class="h-6 w-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>',
          value: 2
        },
        {
          text: "Timeline",
          svg: '<svg class="h-6 w-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>',
          value: 3
        },
      ],
    },
    {
      id: "knowledge",
      question: "How knowledgeable are you about solar?",
      options: [{
          text: "Not very knowledgeable",
          svg: '<svg class="h-6 w-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M22 12A10 10 0 1 1 12 2a10 10 0 0 1 10 10z"></path></svg>',
          value: 0
        },
        {
          text: "I've done some research",
          svg: '<svg class="h-6 w-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c3.31 0 6-2.69 6-6 0 3.31-2.69 6-6 6z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 20c-3.31 0-6 2.69-6 6 0-3.31 2.69-6 6-6z"></path></svg>',
          value: 1
        },
        {
          text: "I know a lot",
          svg: '<svg class="h-6 w-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>',
          value: 2
        },
        {
          text: "I'm in the industry",
          svg: '<svg class="h-6 w-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>',
          value: 3
        },
      ],
    },
  ];

  // Function to create a step with selectable options
  function createSelectableStep(stepData, stepIndex) {
    console.debug("STEP")
    const stepDiv = document.createElement("div");
    if (stepIndex > 1) {
      const backButton = document.createElement("button");
      backButton.type = "button";
      backButton.textContent = "Back";
      backButton.classList.add(
        "back-button",
        "self-start",
        "pb-2",
        "px-4",
        "border-2",
        "border-gray-300",
        "rounded-md"
      );
      backButton.onclick = () => navigateToStep(stepIndex - 1);
      stepDiv.appendChild(backButton);
    }
    // Add back button if not the first step
    stepDiv.id = `step${stepIndex}`;
    stepDiv.classList.add("step", "flex", "flex-col", "gap-4");
    if (stepIndex !== 1) {
      stepDiv.classList.add("hidden");
    }

    const label = document.createElement("label");
    label.setAttribute("for", stepData.id);
    label.textContent = stepData.question;
    label.classList.add("block", "text-lg", "font-bold", "mb-4", "text-center");
    stepDiv.appendChild(label);

    stepData.options.forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.index_val = stepIndex;
      button.dataset.value = option.value;
      button.text_val = option.text;
      button.tag_val = stepData.id;
      const svgContainer = document.createElement("span");
      svgContainer.innerHTML = option.svg;
      svgContainer.classList.add("svg-icon");
      button.appendChild(svgContainer);

      const textNode = document.createTextNode(option.text);
      button.appendChild(textNode);

      button.classList.add(
        "option-button",
        "text-center",
        "max-w-100",
        "flex",
        "items-center",
        "justify-center",
        "gap-2",
        "py-4",
        "px-4",
        "border-2",
        "border-gray-300",
        "rounded-md",
        "text-left",
        "border-solid",
        "border-2",
        "border-gray-100",
        "hover:border[#00BA81]",
        "hover:text-[#00BA81]",
        "pointer"
      );
      stepDiv.appendChild(button);
    });

    return stepDiv;
  }

  // Function to create the final step with a text area and submit button
  function createFinalStep(stepIndex) {
    const stepDiv = document.createElement("div");
    stepDiv.id = `step${stepIndex}`;
    stepDiv.classList.add("step", "hidden", "flex", "flex-col", "gap-4");
    const backButton = document.createElement("button");
    backButton.textContent = "Back";
    backButton.type = "button";
    backButton.classList.add(
      "back-button",
      "self-start",
      "pb-2",
      "px-4",
      "border-2",
      "border-gray-300",
      "rounded-md"
    );
    backButton.onclick = () => navigateToStep(stepIndex - 1);
    stepDiv.appendChild(backButton)

    const label = document.createElement("label");
    label.setAttribute("for", "comments");
    label.textContent = "Do you have any questions, comments, or concerns?";
    label.classList.add("block", "text-lg", "font-bold", "mb-4", "text-center");
    stepDiv.appendChild(label);

    const textarea = document.createElement("textarea");
    textarea.id = "comments";
    textarea.name = "comments";
    textarea.classList.add(
      "textarea",
      "py-2",
      "px-4",
      "border-2",
      "border-gray-300",
      "rounded-md",
      "h-32"
    );
    stepDiv.appendChild(textarea);

    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.classList.add(
      "submit-button",
      "mt-4",
      "py-2",
      "px-4",
      "bg-green-500",
      "text-white",
      "rounded-md"
    );
    submitButton.onclick = () => submitForm();
    // stepDiv.appendChild(submitButton);

    stepDiv.insertBefore(textarea);

    return stepDiv;
  }

  // Function to handle navigation between steps
  function navigateToStep(stepIndex) {
    document
      .querySelectorAll(".step")
      .forEach((step) => step.classList.add("hidden"));
    document.getElementById(`step${stepIndex}`).classList.remove("hidden");
    if (stepIndex - 1 === 4) {
      document.querySelector('button.w-full.mt-4.text-white.rounded-md.py-2.px-4').classList.remove('hidden')
    } else {
      document.querySelector('button.w-full.mt-4.text-white.rounded-md.py-2.px-4').classList.add('hidden')
    }
  }

  // Function to handle form submission
  function submitForm() {
    document.getElementById("formContainer").style.display = 'none';
    document.getElementById("surveyHeading").style.display = 'none';
    document.getElementById("surveySuccess").style.display = 'block';
  }

  document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const formId = params.get("form");
    // Initialize the form with steps
    if (formId === '1') {
      const button = document.querySelector('button.w-full.mt-4.text-white.rounded-md.py-2.px-4')
      button.classList.add('hidden')
      const form = document.getElementById("preInstall");
      form.classList.remove('hidden');
      formSteps.forEach((step, index) =>
        form.appendChild(createSelectableStep(step, index + 1))
      );
      form.appendChild(createFinalStep(formSteps.length + 1));

      // Event delegation for option buttons
      form.addEventListener("click", (event) => {
        const optionButton = event.target.closest(".option-button");

        if (optionButton) {
          const currentStep = optionButton.closest(".step");
          currentStep.querySelectorAll(".option-button").forEach(button => {
            button.classList.remove("selected");
          });

          optionButton.classList.add("selected");
          window.form_array[optionButton.tag_val] = optionButton.text_val;

          setTimeout(
            () =>
            navigateToStep(
              parseInt(optionButton.closest(".step").id.replace("step", "")) + 1
            ),
            250
          );
        }
      });
    }
  })