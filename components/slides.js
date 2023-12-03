class FullScreenPresentation extends HTMLElement {
  constructor() {
    super();

    this.slideIndex = 1;
    this.totalSlides = 0; // Updated after fetching slides
    this.slides = [];
    this.Path = this.getAttribute("path");
    this.setupEventListeners();
    this.setupNavigationButtons();
    this.fetchSlides(); // Fetch slides when the element is constructed
  }

  connectedCallback() {
    // Use MutationObserver to wait for slides to be added
    const observer = new MutationObserver(() => {
      if (this.totalSlides > 0) {
        observer.disconnect();
        this.showSlide(this.slideIndex);
      }
    });

    observer.observe(this, { childList: true });
  }

  setupEventListeners() {
    document.addEventListener("keydown", (e) => this.handleKeyDown(e));
  }

  handleKeyDown(e) {
    const keyCode = e.keyCode;
    if (keyCode === 39) {
      this.nextSlide();
    } else if (keyCode === 37) {
      this.prevSlide();
    }
  }

  async fetchSlides() {
    try {
      // Fetch the external HTML file containing the slides
      const response = await fetch(this.Path);
      const htmlContent = await response.text();

      // Create a temporary div to parse the HTML content
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = htmlContent;

      // Get all slide elements from the parsed HTML
      this.slides = Array.from(tempDiv.querySelectorAll(".slide"));
      this.totalSlides = this.slides.length;

      // Append the fetched slides to the presentation
      this.slides.forEach((slide) => {
        this.appendChild(slide);
      });
    } catch (error) {
      console.error("Error fetching slides:", error);
    }
  }

  nextSlide() {
    this.showSlide(this.slideIndex + 1);
  }

  prevSlide() {
    this.showSlide(this.slideIndex - 1);
  }

  showSlide(index) {
    if (index > this.totalSlides) {
      this.slideIndex = 1;
    } else if (index < 1) {
      this.slideIndex = this.totalSlides;
    } else {
      this.slideIndex = index;
    }

    this.slides.forEach((slide, i) => {
      slide.style.display = i === this.slideIndex - 1 ? "block" : "none";
    });
  }

  setupNavigationButtons() {
    const container = document.createElement("div");
    container.classList.add("presentation-container");

    const prevButton = document.createElement("button");
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevButton.addEventListener("click", () => this.prevSlide());

    const nextButton = document.createElement("button");
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextButton.addEventListener("click", () => this.nextSlide());

    const closeButton = document.createElement("button");
    closeButton.innerHTML = '<i class="fas fa-times"></i>';
    closeButton.addEventListener("click", () => this.closePresentation());
    closeButton.classList.add(
      "btn",
      "btn-outline-primary",
      "px-3",
      "py-1",
      "close-button"
    );
    this.appendChild(closeButton);

    // Apply styles to the close button
    closeButton.style.position = "absolute";
    closeButton.style.top = "5px";
    closeButton.style.right = "5px";

    container.appendChild(prevButton);
    container.appendChild(nextButton);

    this.appendChild(container);

    // Apply styles to the navigation buttons
    container.style.position = "fixed";
    container.style.bottom = "5px";
    container.style.left = "50%";
    container.style.transform = "translateX(-50%)";
    container.style.display = "flex";
    container.style.justifyContent = "space-between";
    container.style.width = "250px"; // Adjust the width as needed

    // Apply styles to each button
    const buttons = [prevButton, nextButton, closeButton];
    buttons.forEach((button) => {
      button.classList.add("btn", "btn-outline-primary", "px-3", "py-1");
    });
  }

  closePresentation() {
    // Hide the current presentation
    this.style.display = "none";

    // Show all buttons
    const buttonSelector = `button[id^="startButton"]`;
    const buttons = document.querySelectorAll(buttonSelector);
    buttons.forEach((button) => {
      button.style.display = "block";
    });
  }
}

// Define the custom element
customElements.define("fullscreen-presentation", FullScreenPresentation);

// Additional script for starting each presentation dynamically
const presentationCount = 3; // Change this to the number of presentations

for (let i = 1; i <= presentationCount; i++) {
  const buttonId = `startButton${i}`;
  const presentationId = `presentation${i}`;

  // Add event listener for each button
  document.getElementById(buttonId).addEventListener("click", function () {
    startPresentation(buttonId, presentationId);
  });
}

// General startPresentation function
function startPresentation(buttonId, presentationId) {
  // Hide all buttons
  for (let i = 1; i <= presentationCount; i++) {
    const currentButtonId = `startButton${i}`;
    document.getElementById(currentButtonId).style.display = "none";
  }

  // Hide all presentations
  for (let i = 1; i <= presentationCount; i++) {
    const currentPresentationId = `presentation${i}`;
    document.getElementById(currentPresentationId).style.display = "none";
  }

  // Show the relevant presentation
  document.getElementById(presentationId).style.display = "block";

  // Add close button
  const closeButton = document.createElement("button");
  closeButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
  closeButton.addEventListener("click", function () {
    // Hide the current presentation
    document.getElementById(presentationId).style.display = "none";

    // Show all buttons
    for (let i = 1; i <= presentationCount; i++) {
      const currentButtonId = `startButton${i}`;
      document.getElementById(currentButtonId).style.display = "block";
    }
  });
}
