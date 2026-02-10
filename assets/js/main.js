/**
 * Template Name: iLanding
 * Template URL: https://bootstrapmade.com/ilanding-bootstrap-landing-page-template/
 * Updated: Nov 12 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener("click", mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Frequently Asked Questions Toggle
   */
  document
    .querySelectorAll(".faq-item h3, .faq-item .faq-toggle")
    .forEach((faqItem) => {
      faqItem.addEventListener("click", () => {
        faqItem.parentNode.classList.toggle("faq-active");
      });
    });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);
})();

const form = document.getElementById("registrationForm");
const countryCodeInput = document.getElementById("countryCode");
const phoneInput = document.getElementById("phone");
const phoneError = document.getElementById("phoneError");

const fullNameInput = document.getElementById("fullName");
const nameError = document.getElementById("nameError");

function isValidName(name) {
  // Regex: Names like "John Doe", "Mary Ann Smith"
  const pattern = /^([A-Z][a-z]+)(\s[A-Z][a-z]+)+$/;
  return pattern.test(name.trim());
}

const phonePatterns = {
  "+233": /^[0235]\d{9}$/, // Ghana: Starts with 2 or 3, 9 digits total
  "+234": /^[789]\d{9}$/, // Nigeria: Starts with 7, 8, or 9, 10 digits total
  "+44": /^[1-9]\d{9}$/, // UK: 10 digits total
  "+1": /^\d{10}$/, // USA: 10 digits total
  "+91": /^[6-9]\d{9}$/, // India: Starts with 6-9, 10 digits total
};

countryCodeInput.addEventListener("change", () => {
  validatePhone();
});

phoneInput.addEventListener("input", () => {
  validatePhone();
});

function validatePhone() {
  const selectedCode = countryCodeInput.value;
  const phoneValue = phoneInput.value;

  if (phonePatterns[selectedCode]) {
    if (!phonePatterns[selectedCode].test(phoneValue)) {
      phoneError.textContent =
        "Enter a valid phone number for the selected country.";
    } else {
      phoneError.textContent = "";
    }
  } else {
    phoneError.textContent = "Please select a valid country code.";
  }
}

fullNameInput.addEventListener("input", () => {
  const name = fullNameInput.value;
  if (!isValidName(name)) {
    nameError.textContent =
      "Enter a valid full name (e.g., John Doe). Avoid symbols or numbers.";
    fullNameInput.classList.add("is-invalid");
  } else {
    nameError.textContent = "";
    fullNameInput.classList.remove("is-invalid");
  }
});

form.addEventListener("submit", (e) => {
  const name = fullNameInput.value;

  if (!isValidName(name)) {
    e.preventDefault();
    nameError.textContent = "Enter a valid full name before submitting.";
    fullNameInput.classList.add("is-invalid");
  }
});

// <!-- JavaScript for Printing Only the Section -->

function printReceipt() {
  let printContents = document.getElementById("print-area").innerHTML;
  let originalContents = document.body.innerHTML;

  document.body.innerHTML =
    "<html><head><title>Print Receipt</title></head><body>" +
    printContents +
    "</body></html>";
  window.print();
  document.body.innerHTML = originalContents;
  window.location.reload();
}
