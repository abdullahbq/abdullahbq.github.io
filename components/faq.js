class Faq extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const items = [
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

    this.innerHTML = `
      <section class="team-section bg-primary bg-opacity-10">
        <title-component title="FAQ's"></title-component>      
        <div class="container py-5">
          <div class="accordion" id="accordionExample">
            ${items
        .map((item, index) => this.generateAccordion(item, index))
        .join("")}
          </div>
        </div>
      </section>
    `;
  }

  generateAccordion({ title, content }, index) {
    const isFirstItem = index === 0 ? "show" : "";
    const isCollapsed = index === 0 ? "" : "collapsed"; // Fixed this line

    return `
      <div class="accordion-item border-primary">
        <h2 class="accordion-header" id="heading${index + 1}">
          <button class="accordion-button fw-bold ${isCollapsed}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index + 1}" aria-expanded="${isFirstItem}" aria-controls="collapse${index + 1}">
            ${title}
          </button>
        </h2>
        <div id="collapse${index + 1}" class="accordion-collapse collapse ${isFirstItem}" aria-labelledby="heading${index + 1}" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <p>${content}</p>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("faq-component", Faq);
