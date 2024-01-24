window.form_array = {
    "blocker": "",
    "concern": "",
    "knowledge": "",
    "motivation": ""
  }
  window.formSteps = [{
      id: "motivation",
      question: "What is your #1 reason to go solar?",
      options: [{
          text: "Helping the environment",
          svg: '<svg class="h-auto w-6 mr-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ph" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="currentColor" d="M228.74 188.32L180.27 126H208a6 6 0 0 0 4.76-9.66l-80-104a6 6 0 0 0-9.52 0l-80 104A6 6 0 0 0 48 126h27.73l-48.47 62.32A6 6 0 0 0 32 198h90v42a6 6 0 0 0 12 0v-42h90a6 6 0 0 0 4.74-9.68M44.27 186l48.47-62.32A6 6 0 0 0 88 114H60.19L128 25.84L195.81 114H168a6 6 0 0 0-4.74 9.68L211.73 186Z"></path></svg>',
          value: 0
        },
        {
          text: "Saving money monthly",
          svg: '<svg class="h-auto w-6 mr-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--iconoir" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"><path stroke-linecap="round" d="M14.5 8.5c-.78-.202-1.866-.5-2.735-.5C7.476 8 4 10.668 4 13.958c0 1.891 1.148 3.577 2.938 4.668l-.485 1.6a.6.6 0 0 0 .574.774h1.764a.6.6 0 0 0 .36-.12l1.395-1.047h2.437l1.395 1.047a.6.6 0 0 0 .36.12h1.764a.6.6 0 0 0 .574-.774l-.485-1.6c1.067-.65 1.905-1.511 2.409-2.501M14.5 8.5L19 7l-.084 3.628L21 11.5V15l-1.926 1"></path><path fill="currentColor" stroke-linecap="round" d="M15.5 13a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1"></path><path stroke-linecap="round" d="M2 10s0 2.4 2 3"></path><path d="M12.8 7.753c.13-.372.2-.772.2-1.188C13 4.596 11.433 3 9.5 3S6 4.596 6 6.565c0 .941.358 1.798.944 2.435"></path></g></svg>',
          value: 1
        },
        {
          text: "Stabilizing energy bills",
          svg: '<svg class="h-auto w-6 mr-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--fe" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M5 19h15a1 1 0 0 1 0 2H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 2 0zm5-4a1 1 0 0 1-2 0V6a1 1 0 1 1 2 0zm2 0V8a1 1 0 0 1 2 0v7a1 1 0 0 1-2 0m4-11a1 1 0 0 1 2 0v11a1 1 0 0 1-2 0z"></path></svg>',
          value: 2
        },
        {
          text: "Energy independence",
          svg: '<svg class="h-auto w-6 mr-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--carbon" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M29 14h-1v-4h-2v4h-2v-4h-2v4h-1a1 1 0 0 0-1 1v4a5.008 5.008 0 0 0 4 4.899V27a1 1 0 0 1-1 1H5a1 1 0 0 1 0-2h5a3 3 0 0 0 0-6H5a1 1 0 0 1 0-2h5a3.003 3.003 0 0 0 3-3v-4h1a4.005 4.005 0 0 0 4-4V4h-3a3.979 3.979 0 0 0-2.747 1.106A6.004 6.004 0 0 0 7 2H4v3a6.007 6.007 0 0 0 6 6h1v4a1 1 0 0 1-1 1H5a3 3 0 0 0 0 6h5a1 1 0 0 1 0 2H5a3 3 0 0 0 0 6h18a3.003 3.003 0 0 0 3-3v-3.101A5.008 5.008 0 0 0 30 19v-4a1 1 0 0 0-1-1M13 8a2.002 2.002 0 0 1 2-2h1v1a2.002 2.002 0 0 1-2 2h-1Zm-3 1a4.005 4.005 0 0 1-4-4V4h1a4.005 4.005 0 0 1 4 4v1Zm18 10a3 3 0 0 1-6 0v-3h6Z"></path></svg>',
          value: 3
        },
      ],
    },
    {
      id: "blocker",
      question: "Why have you waited until now?",
      options: [{
          text: "Lack of information",
          svg: '<svg class="h-auto w-6 mr-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--iconoir" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M9 9c0-3.5 5.5-3.5 5.5 0c0 2.5-2.5 2-2.5 5m0 4.01l.01-.011"></path><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0 0 12 22"></path></g></svg>',
          value: 0
        },
        {
          text: "Concerns about costs",
          svg: '<svg class="h-auto w-6 mr-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ph" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="currentColor" d="M128 88a40 40 0 1 0 40 40a40 40 0 0 0-40-40m0 64a24 24 0 1 1 24-24a24 24 0 0 1-24 24m112-96H16a8 8 0 0 0-8 8v128a8 8 0 0 0 8 8h224a8 8 0 0 0 8-8V64a8 8 0 0 0-8-8m-46.35 128H62.35A56.78 56.78 0 0 0 24 145.65v-35.3A56.78 56.78 0 0 0 62.35 72h131.3A56.78 56.78 0 0 0 232 110.35v35.3A56.78 56.78 0 0 0 193.65 184M232 93.37A40.81 40.81 0 0 1 210.63 72H232ZM45.37 72A40.81 40.81 0 0 1 24 93.37V72ZM24 162.63A40.81 40.81 0 0 1 45.37 184H24ZM210.63 184A40.81 40.81 0 0 1 232 162.63V184Z"></path></svg>',
          value: 1
        },
        {
          text: "Haven't considered it",
          svg: '<svg class="h-auto w-6 mr-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--iconoir" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 3.6a.6.6 0 0 1 .6-.6h16.8a.6.6 0 0 1 .6.6v13.8a.6.6 0 0 1-.6.6h-4.14a.6.6 0 0 0-.438.189l-3.385 3.597a.6.6 0 0 1-.874 0l-3.385-3.597A.6.6 0 0 0 7.74 18H3.6a.6.6 0 0 1-.6-.6z"></path><path stroke-linecap="round" stroke-linejoin="round" d="m12 7l1.425 2.575L16 11l-2.575 1.425L12 15l-1.425-2.575L8 11l2.575-1.425z"></path></g></svg>',
          value: 2
        },
        {
          text: "New homeowner",
          svg: '<svg class="h-auto w-6 mr-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--heroicons" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m2.25 12l8.955-8.955a1.124 1.124 0 0 1 1.59 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"></path></svg>',
          value: 3
        },
      ],
    },
    {
      id: "concern",
      question: "What is your biggest concern?",
      options: [{
          text: "Price",
          svg: '<svg class="h-auto w-6 mr-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--tabler" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"></path><path d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2m5 6h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3H10m2 0v1m0-8v1"></path></g></svg>',
          value: 0
        },
        {
          text: "Installation",
          svg: '<svg class="h-auto w-6 mr-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--tabler" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 10h3V7L6.5 3.5a6 6 0 0 1 8 8l6 6a2 2 0 0 1-3 3l-6-6a6 6 0 0 1-8-8z"></path></svg>',
          value: 1
        },
        {
          text: "Knowledge needed",
          svg: '<svg class="h-auto w-6 mr-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--fe" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16m-1-4h2v2h-2zm0-1.992s2-.008 2 0C13 13.006 16 12 16 10c0-2.21-1.773-4-3.991-4A4 4 0 0 0 8 10h2c0-1.1.9-2 2-2s2 .9 2 2c0 .9-3 2.367-3 4.008"></path></svg>',
          value: 2
        },
        {
          text: "Timeline",
          svg: '<svg class="h-auto w-6 mr-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8m.5-13H11v6l5.25 3.15l.75-1.23l-4.5-2.67z"></path></svg>',
          value: 3
        },
      ],
    },
    {
      id: "knowledge",
      question: "What is your solar knowledge level?",
      options: [{
          text: "Not very knowledgeable",
          svg: '<svg class="h-auto w-6 mr-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ph" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="currentColor" d="M225.9 102.8c-3.8-3.9-7.7-8-9.2-11.5s-1.4-8.7-1.5-14c-.1-9.7-.3-20.8-8-28.5s-18.8-7.9-28.5-8c-5.3-.1-10.7-.2-14-1.5s-7.6-5.4-11.5-9.2C146.3 23.5 138.4 16 128 16s-18.3 7.5-25.2 14.1c-3.9 3.8-8 7.7-11.5 9.2s-8.7 1.4-14 1.5c-9.7.1-20.8.3-28.5 8s-7.9 18.8-8 28.5c-.1 5.3-.2 10.7-1.5 14s-5.4 7.6-9.2 11.5C23.5 109.7 16 117.6 16 128s7.5 18.3 14.1 25.2c3.8 3.9 7.7 8 9.2 11.5s1.4 8.7 1.5 14c.1 9.7.3 20.8 8 28.5s18.8 7.9 28.5 8c5.3.1 10.7.2 14 1.5s7.6 5.4 11.5 9.2c6.9 6.6 14.8 14.1 25.2 14.1s18.3-7.5 25.2-14.1c3.9-3.8 8-7.7 11.5-9.2s8.7-1.4 14-1.5c9.7-.1 20.8-.3 28.5-8s7.9-18.8 8-28.5c.1-5.3.2-10.7 1.5-14s5.4-7.6 9.2-11.5c6.6-6.9 14.1-14.8 14.1-25.2s-7.5-18.3-14.1-25.2Zm-11.6 39.3c-4.8 5-9.7 10.2-12.4 16.5s-2.6 13.1-2.7 19.8s-.2 14.4-3.3 17.5s-10.4 3.2-17.5 3.3s-13.7.2-19.8 2.7s-11.5 7.6-16.5 12.4S132 224 128 224s-9.1-4.9-14.1-9.7s-10.2-9.7-16.5-12.4s-13.1-2.6-19.8-2.7s-14.4-.2-17.5-3.3s-3.2-10.4-3.3-17.5s-.2-13.7-2.7-19.8s-7.6-11.5-12.4-16.5S32 132 32 128s4.9-9.1 9.7-14.1s9.7-10.2 12.4-16.5s2.6-13.1 2.7-19.8s.2-14.4 3.3-17.5s10.4-3.2 17.5-3.3s13.7-.2 19.8-2.7s11.5-7.6 16.5-12.4S124 32 128 32s9.1 4.9 14.1 9.7s10.2 9.7 16.5 12.4s13.1 2.6 19.8 2.7s14.4.2 17.5 3.3s3.2 10.4 3.3 17.5s.2 13.7 2.7 19.8s7.6 11.5 12.4 16.5S224 124 224 128s-4.9 9.1-9.7 14.1ZM140 180a12 12 0 1 1-12-12a12 12 0 0 1 12 12Zm24-72a36 36 0 0 1-28 35.1v.9a8 8 0 0 1-16 0v-8a8 8 0 0 1 8-8a20 20 0 1 0-20-20a8 8 0 0 1-16 0a36 36 0 0 1 72 0Z"></path></svg>',
          value: 0
        },
        {
          text: "I've done some research",
          svg: '<svg class="h-auto w-6 mr-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--heroicons" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"></path></svg>',
          value: 1
        },
        {
          text: "I know a lot",
          svg: '<svg class="h-auto w-6 mr-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ph" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="currentColor" d="m251.76 88.94l-120-64a8 8 0 0 0-7.52 0l-120 64a8 8 0 0 0 0 14.12L32 117.87v48.42a15.91 15.91 0 0 0 4.06 10.65C49.16 191.53 78.51 216 128 216a130 130 0 0 0 48-8.76V240a8 8 0 0 0 16 0v-40.49a115.63 115.63 0 0 0 27.94-22.57a15.91 15.91 0 0 0 4.06-10.65v-48.42l27.76-14.81a8 8 0 0 0 0-14.12M128 200c-43.27 0-68.72-21.14-80-33.71V126.4l76.24 40.66a8 8 0 0 0 7.52 0L176 143.47v46.34c-12.6 5.88-28.48 10.19-48 10.19m80-33.75a97.83 97.83 0 0 1-16 14.25v-45.57l16-8.53Zm-20-47.31l-.22-.13l-56-29.87a8 8 0 0 0-7.52 14.12L171 128l-43 22.93L25 96l103-54.93L231 96Z"></path></svg>',
          value: 2
        },
        {
          text: "I'm in the industry",
          svg: '<svg class="h-auto w-6 mr-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--carbon" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="m16 6.52l2.76 5.58l.46 1l1 .15l6.16.89l-4.38 4.3l-.75.73l.18 1l1.05 6.13l-5.51-2.89L16 23l-.93.49l-5.51 2.85l1-6.13l.18-1l-.74-.77l-4.42-4.35l6.16-.89l1-.15l.46-1L16 6.52M16 2l-4.55 9.22l-10.17 1.47l7.36 7.18L6.9 30l9.1-4.78L25.1 30l-1.74-10.13l7.36-7.17l-10.17-1.48Z"></path></svg>',
          value: 3
        },
      ],
    },
  ];

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
    stepDiv.id = `step${stepIndex}`;
    stepDiv.classList.add("step", "flex", "flex-col", "gap-2");
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

        // Wrap the button text in a span with the specified classes
        const textSpan = document.createElement("span");
        textSpan.classList.add("w-full", "pr-6");
        textSpan.textContent = option.text;
        button.appendChild(textSpan);

        button.classList.add(
            "option-button",
            "text-center",
            "w-full", // Changed from max-w-100 to w-full
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
            "hover:border-[#00BA81]",
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
    const app = document.getElementById("app");
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