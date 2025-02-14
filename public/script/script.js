// JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()

function toggleForm() {
    const signInForm = document.getElementById("signInForm");
    const signUpForm = document.getElementById("signUpForm");

    if (signInForm.classList.contains("hidden")) {
      signInForm.classList.remove("hidden");
      signUpForm.classList.add("hidden");
    } else {
      signInForm.classList.add("hidden");
      signUpForm.classList.remove("hidden");
    }
  }

  (function () {
    'use strict';

    const form = document.querySelector('.needs-validation');
    const successMessage = document.getElementById('successMessage');
    const errorMessages = document.querySelectorAll('.error-message');

    // Hide all error messages initially
    errorMessages.forEach((msg) => msg.style.display = 'none');

    // On form submit
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent default submit behavior
      let isValid = true;

      // Iterate through each form control to check validity
      form.querySelectorAll('.form-control, .form-select').forEach((input) => {
        const errorElement = input.nextElementSibling;

        if (!input.checkValidity()) {
          isValid = false;
          input.classList.add('border-danger'); // Add red border for invalid fields
          input.classList.remove('border-success');
          errorElement.style.display = 'block'; // Show error message
        } else {
          input.classList.remove('border-danger');
          input.classList.add('border-success'); // Add green border for valid fields
          errorElement.style.display = 'none'; // Hide error message
        }
      });

      if (isValid) {
        // Show success message
        successMessage.classList.remove('d-none');
        successMessage.classList.add('show');
        form.reset(); // Clear the form
      }
    });
  })();
  document.addEventListener("DOMContentLoaded", function () {
    const flashAlerts = document.querySelectorAll('.flash-alert');
    flashAlerts.forEach(alert => {
        if (alert.textContent.trim() === '') {
            alert.style.display = 'none'; // Hide if there's no message
        } else {
            alert.style.display = 'block'; // Show if there's a message
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
  const blogItems = document.querySelectorAll('.blog-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Remove observer after animation
      }
    });
  }, {
    threshold: 0.1 // Trigger when 10% of the element is visible
  });

  blogItems.forEach(item => observer.observe(item));
});
document.querySelectorAll('.flash-alert').forEach(alert => {
  setTimeout(() => {
    alert.classList.add('fade-out');
    setTimeout(() => alert.remove(), 800); // Removes the alert after the fade-out animation
  }, 5000); // Auto-dismiss after 5 seconds
});