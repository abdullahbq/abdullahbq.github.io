class ContactPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `   
      <div class="row align-items-center">
        <div class="col-md-8">
          <form>
            <div class="mb-3">
              <label for="name" class="form-label">Your Name</label>
              <input type="text" class="form-control bg-warning bg-opacity-10 shadow" id="name" placeholder="John Doe" required>
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Your Email</label>
              <input type="email" class="form-control bg-warning bg-opacity-10 shadow" id="email" placeholder="john@example.com" required>
            </div>
            <div class="mb-3">
              <label for="message" class="form-label">Your Message</label>
              <textarea class="form-control bg-warning bg-opacity-10 shadow" id="message" rows="5" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary shadow">Submit</button>
          </form>
        </div>
        <div class="col-md-4">
          <h4>Our Office</h4>
          <address>
            123 Main Street<br>
            Cityville, State 12345<br>
            United States
          </address>
          <p>
            <strong>Email:</strong> info@example.com<br>
            <strong>Phone:</strong> +1 (123) 456-7890
          </p>
          <h4>Connect with Us</h4>
          <ul class="list-unstyled">
            <li><a href="#" target="_blank"><i class="fab fa-facebook"></i> Facebook</a></li>
            <li><a href="#" target="_blank"><i class="fab fa-twitter"></i> Twitter</a></li>
            <li><a href="#" target="_blank"><i class="fab fa-linkedin"></i> LinkedIn</a></li>
          </ul>
        </div>
      </div>
    `;
  }
}

customElements.define("contact-page", ContactPage);
