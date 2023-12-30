reusable accordian

export default class Accordion {
  constructor(containerId, jsonData) {
    this.container = document.getElementById(containerId);
    this.data = jsonData;
    this.container.addEventListener('click', this.handleItemClick.bind(this));
  }

  render() {
    this.container.innerHTML = this.data.map((section) => `
      <div class="accordion-item border border-primary shadow mb-2 rounded">
        <div class="accordion-item-header bg-primary bg-opacity-10 p-2 d-flex justify-content-between align-items-center" style="cursor: pointer; border-top-left-radius: 0.375rem; border-top-right-radius: 0.375rem;">
          <span>${section.title}</span>
          <i class="fas fa-chevron-down"></i>
        </div>
        <div class="accordion-item-content p-2" style="display: none; border-bottom-left-radius: 0.375rem; border-bottom-right-radius: 0.375rem;">
          <p>${section.content}</p>
        </div>
      </div>
    `).join('');
  }

  handleItemClick(event) {
    const header = event.target.closest('.accordion-item-header');
    if (!header) return;

    const content = header.nextElementSibling;

    header.parentElement.classList.toggle('active');

    if (content.style.display === 'block') {
      content.style.display = 'none';
    } else {
      content.style.display = 'block';
    }
  }
}




<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="assets/css/fontawesome.css" rel="stylesheet" type="text/css" />
  <link href="assets/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
  <link href="assets/css/mystyles.css" rel="stylesheet" type="text/css" />
</head>

<body>

  <div id="collapsibleContainer" class="mb-2"></div>

  <script type="module">

    import Collapsible from './reusables/collapsible.js';

    const jsonData = [
  
  {
    "title": "What resources are available for students interested in robotics?",
    "content": "We have dedicated resources and facilities for students interested in robotics. Explore our Robotics Center, participate in robotics competitions, and collaborate on exciting projects to develop practical skills in this field."
  },
  {
    "title": "Do you offer online courses for engineering programs?",
    "content": "Yes, we offer online courses for certain engineering programs. Check our Online Learning page for information on available courses, delivery formats, and how to enroll."
  },
  {
    "title": "Is there academic support available for engineering students?",
    "content": "Yes, we provide comprehensive academic support services, including tutoring, workshops, and academic advising. Our goal is to ensure that all engineering students have the resources they need to succeed in their studies."
  }
  ];

    const collapsible = new Collapsible('collapsibleContainer', jsonData);
    collapsible.render();
  </script>

</body>

</html>



reusable cards 

export default class Card {
  constructor(containerId, jsonData) {
    this.container = document.getElementById(containerId);
    this.data = jsonData;
  }

  render() {
    this.container.innerHTML = this.data.map((cardData) => `
      <div class="col-lg-4">
        <div class="card position-relative shadow border-primary bg-primary bg-opacity-10 mb-4">
          <span class="badge bg-primary position-absolute top-0 start-0 m-2">${cardData.badge}</span>
          <img src="${cardData.image}" class="card-img-top" alt="Card Image">
          <div class="card-body">
            <h2 class="card-title">${cardData.title}</h2>
            <p class="card-text">${cardData.content}</p>
          </div>
          <div class="card-footer d-flex justify-content-between align-items-center">
            <div class="card-meta">
              <small class="text-muted">Date: ${cardData.date}</small>
              <br>
              <small class="text-muted">Author: ${cardData.author}</small>
            </div>
            <div class="author-image">
              <img src="${cardData.authorimage}" alt="Author Image" class="rounded-circle" style="width: 40px; height: 40px;">
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }
}



<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="assets/css/fontawesome.css" rel="stylesheet" type="text/css" />
  <link href="assets/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
  <link href="assets/css/mystyles.css" rel="stylesheet" type="text/css" />
</head>

<body>

  <div class="container mt-4">
    <div class="row" id="cardContainer"></div>
  </div>

  <script type="module">

    import Card from './reusables/Card.js';

    const jsonData = [
      {
        "title": "Blog Title 1",
        "image": "assets/images/01.jpg",
        "badge": "Technology",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "date": "2023-01-01",
        "author": "Abdullah B Q",
        "authorimage": "assets/images/abdullah.jpg"
      },
      {
        "title": "Blog Title 2",
        "image": "assets/images/01.jpg",
        "badge": "Science",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "date": "2023-02-01",
        "author": "Abdullah B Q",
        "authorimage": "assets/images/abdullah.jpg"
      },
      {
        "title": "Blog Title 2",
        "image": "assets/images/01.jpg",
        "badge": "Science",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "date": "2023-02-01",
        "author": "Abdullah B Q",
        "authorimage": "assets/images/abdullah.jpg"
      }
    ];

    const cardComponent = new Card('cardContainer', jsonData);
    cardComponent.render();
  </script>

</body>

</html>





