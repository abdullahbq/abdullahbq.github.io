class ContactPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <div class="container">
          <h2>Contact Us</h2>
          <p>If you have any questions or inquiries, feel free to reach out to us.</p>
  
          <div class="row">
            <div class="col-md-6">
              <form>
                <div class="mb-3">
                  <label for="name" class="form-label">Your Name</label>
                  <input type="text" class="form-control" id="name" placeholder="John Doe" required>
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Your Email</label>
                  <input type="email" class="form-control" id="email" placeholder="john@example.com" required>
                </div>
                <div class="mb-3">
                  <label for="message" class="form-label">Your Message</label>
                  <textarea class="form-control" id="message" rows="5" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
              </form>
            </div>
            <div class="col-md-6">
              <h4>Our Office</h4>
              <p>123 Main Street<br>Cityville, State 12345<br>United States</p>
              <p>Email: info@example.com<br>Phone: +1 (123) 456-7890</p>
            </div>
          </div>
        </div>
      `;
  }
}

customElements.define("contact-page", ContactPage);
