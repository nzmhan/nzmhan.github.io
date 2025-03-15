'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "hepsi") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); // Türkçe karakterleri standardize eder

    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}




// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page.toLowerCase()) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}


document.addEventListener("DOMContentLoaded", function () {
  const modalContainer = document.querySelector("[data-modal-container]");
  const modalOverlay = document.querySelector("[data-overlay]");
  const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalPdfFrame = document.querySelector("#modal-pdf-frame");
  const openModalButtons = document.querySelectorAll("[data-modal-open-btn]");

  // Modal açma
  openModalButtons.forEach(button => {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      const pdfSrc = button.getAttribute("data-pdf-src");
      const title = button.getAttribute("data-title");

      modalTitle.textContent = title;

      // PDF'yi önce gizle, sonra kaynağı ayarla (yeniden yükleme hatasını engellemek için)
      modalPdfFrame.style.display = "none";
      setTimeout(() => {
        modalPdfFrame.src = pdfSrc;
        modalPdfFrame.style.display = "block";
      }, 100); // Küçük bir gecikme vererek sayfa bozulmasını engelle

      modalContainer.classList.add("active");
      modalContainer.style.display = "flex";

      // Modal arka planı sıfırla (hata çıkmasını engelle)
      setTimeout(() => {
        modalContainer.style.background = "rgba(0, 0, 0, 0.9)";
      }, 50);
    });
  });

  // Modal kapatma fonksiyonu
  function closeModal() {
    modalContainer.classList.remove("active");

    // Modal kapanırken temizleme işlemleri
    setTimeout(() => {
      modalContainer.style.display = "none";
      modalContainer.style.background = "transparent"; // Renk sıfırla
      modalPdfFrame.src = ""; // PDF kaynağını temizle
    }, 300);
  }

  // Çarpıya ve overlay'e basınca modal'ı kapat
  modalCloseBtn.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", closeModal);
});
