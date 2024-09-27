const faqBtn = document.querySelectorAll(".faq__open-btn");
const faqInfo = document.querySelectorAll(".faq__text");
const faqBody = document.querySelectorAll(".faq__body");
const faqTop = document.querySelectorAll(".faq__top");


const swiper = new Swiper(".swiper", {
    direction: "horizontal",
    loop: true,
    spaceBetween: 20,
    navigation: {
      nextEl: ".swiper-format-button-next",
      prevEl: ".swiper-format-button-prev",
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
      },
      624: {
        slidesPerView: 2,
      },
      900: {
        slidesPerView: 3,
      },
      // when window width is >= 480px
      1200: {
        slidesPerView: 4,
      },
      // when window width is >= 640px
      1541: {
        slidesPerView: 5,
      },
    },
  });
  
  faqTop.forEach((btn, i) => {
    btn.addEventListener("click", (e) => {
      for (let j = 0; j < faqInfo.length; j++) {
        const isOpen = btn.classList.toggle("open-menu");
        if (isOpen) {
          faqInfo[i].style.maxHeight = faqInfo[i].scrollHeight + 150 + "px";
          faqBtn[i].style.transform = "rotate(-180deg)";
          faqBody[i].style.paddingBottom = "19px";
        } else {
          faqBtn[i].style.transform = "rotate(0deg)";
          faqInfo[i].style.maxHeight = "0px";
          faqBody[i].style.paddingBottom = "0px";
        }
      }
    });
  });
  IMask(
    document.getElementById('phone'),
    {
      mask: '+{7}(000)000-00-00'
    }
  )

  $(document).ready(function() {
    $("#form").validate({
      rules: {
        name: {
          required: true
        },
        phone: {
          required: true
        },
        email: {
          required: true
        }
      },
      messages: {
        name: {
          required: "Неверно заполнено поле"
        },
        phone: {
          required: "Неверно заполнено поле"
        },
        email: {
          required: "Неверно заполнено поле"
        }
      },
      errorPlacement: function(error, element) {
        $(element).closest(".form-offer__body").find(".form-offer__error").text(error.text());
      },
      highlight: function(element, errorClass, validClass) {
        $(element).closest(".form-offer__body").find(".form-offer__error").addClass("form-offer__error--active");
      },
      unhighlight: function(element, errorClass, validClass) {
        $(element).closest(".form-offer__body").find(".form-offer__error").removeClass("form-offer__error--active");
      }
    });
  });
  