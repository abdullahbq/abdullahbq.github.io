node components/build.js

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



class Faq extends HTMLElement {
  constructor() {
    super();
    this.items = [
      {
        title: "What courses and projects do you offer?",
        content:
          "We offer a diverse range of courses and projects in various fields such as technology, business, arts, and more. Our courses and projects are designed to provide hands-on experience and practical skills to help you succeed in your chosen field.",
      },
      {
        title: "Who can enroll in your courses and projects?",
        content:
          "Anyone can enroll in our courses and projects, regardless of their level of experience or education. Whether you're a beginner or an experienced professional, our courses and projects are tailored to meet your needs and help you achieve your goals.",
      },
      {
        title: "How long do your courses and projects last?",
        content:
          "The duration of our courses and projects varies depending on the program. Some of our courses and projects can be completed in a few weeks, while others may take several months to complete. We offer both self-paced and instructor-led programs to accommodate different schedules and learning styles.",
      },
      {
        title: "What kind of learning materials do you provide?",
        content:
          "We provide a range of learning materials including video lectures, readings, interactive exercises, and projects. Our courses and projects are designed to be engaging and interactive, with a focus on practical skills and real-world applications.",
      },
      {
        title: "Do you offer any certifications or degrees upon completion?",
        content:
          "Yes, we offer certifications upon completion of our courses and projects. Our certifications are recognized by industry leaders and can help you stand out in the job market. However, we do not offer degrees.",
      },
      {
        title:
          "Are your courses and projects self-paced or do they have a set schedule?",
        content:
          "We offer both self-paced and instructor-led courses and projects. Our self-paced programs allow you to learn at your own pace, while our instructor-led programs provide guidance and support from a qualified instructor.",
      },
      {
        title:
          "Can I take your courses and projects from anywhere in the world?",
        content:
          "Yes, our courses and projects are available to anyone with an internet connection. You can take our courses and projects from anywhere in the world and at any time that suits you.",
      },
      {
        title:
          "Do you provide any support or guidance during the learning process?",
        content:
          "Yes, we provide support and guidance throughout the learning process. Our instructors are available to answer any questions you may have and provide feedback on your work. We also provide a community forum where you can connect with other learners and share your experiences.",
      },
      {
        title: "What kind of payment options do you offer?",
        content:
          "We offer a range of payment options including credit card, PayPal, and bank transfer. We also offer installment plans for some of our longer programs to make them more accessible to learners.",
      },
      {
        title: "How do I enroll in your courses and projects?",
        content:
          "Enrolling in our courses and projects is easy. Simply visit our website and select the program you're interested in. From there, you can create an account, choose your payment plan, and start learning immediately. If you have any questions or need assistance, our customer support team is always available to help.Enrolling in our courses and projects is easy. Simply visit our website and select the program you're interested in. From there, you can create an account, choose your payment plan, and start learning immediately. If you have any questions or need assistance, our customer support team is always available to help.Enrolling in our courses and projects is easy. Simply visit our website and select the program you're interested in. From there, you can create an account, choose your payment plan, and start learning immediately. If you have any questions or need assistance, our customer support team is always available to help.Enrolling in our courses and projects is easy. Simply visit our website and select the program you're interested in. From there, you can create an account, choose your payment plan, and start learning immediately. If you have any questions or need assistance, our customer support team is always available to help.",
      },
    ];
  }

  connectedCallback() {
    this.render();
    this.addEventListener('click', this.handleItemClick.bind(this));
  }

  render() {
    this.innerHTML = `
      <section class="faq-section bg-primary bg-opacity-10">
        <title-component title="FAQ's"></title-component>      
        <div class="container py-5">          
            ${this.items.map((item, index) => this.generateAccordion(item, index)).join("")}          
        </div>
      </section>
    `;
  }

  generateAccordion({ title, content }) {
    return `
      <div class="card border border-primary mb-4 rounded-2">
        <div class="accordion-item-header p-3 d-flex justify-content-between align-items-center" style="cursor: pointer; font-size: 1.2rem">
          <span class="fw-bold">${title}</span>
          <i class="fas fa-chevron-down"></i>
        </div>
        <div class="accordion-item-content p-3 bg-primary bg-opacity-25" style="display: none;">
          <p>${content}</p>
        </div>
      </div>
    `;
  }

  handleItemClick(event) {
    const header = event.target.closest('.accordion-item-header');
    if (!header) return;

    const content = header.nextElementSibling;

    header.parentElement.classList.toggle('active');
    content.style.display = (content.style.display === 'block') ? 'none' : 'block';
  }
}

customElements.define('faq-component', Faq);



<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    .slider-card {
      position: relative;
      border-radius: 10px;
      overflow: hidden;
    }

    .mycard {
      width: 100%;
      height: 100%;
      padding: 10px;
      background-color: #286843;
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: transform 0.5s;
    }

    .curtain {
      position: absolute;
      top: 0;
      left: 0;
      padding: 10px;
      width: 100%;
      height: 100%;
      background-color: #286843;
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transform: translateY(-100%);
      transition: transform 0.5s;
    }

    .slider-card:hover .mycard {
      transform: translateY(100%);
    }

    .slider-card:hover .curtain {
      transform: translateY(0);
    }
  </style>
</head>

<body>
  <div class="slider-card">
    <div class="mycard">
      <h2>Title</h2>
      <p>Card content goes here.</p>
    </div>
    <div class="curtain">
      Additional content or actions can be placed here.
    </div>
  </div>
</body>

</html>
