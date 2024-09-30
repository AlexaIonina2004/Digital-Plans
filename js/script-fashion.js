const faqBtn = document.querySelectorAll(".faq__open-btn");
const faqInfo = document.querySelectorAll(".faq__text");
const faqBody = document.querySelectorAll(".faq__body");
const faqTop = document.querySelectorAll(".faq__top");
const forms = document.querySelectorAll(".form-offer");

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
document.querySelectorAll(".phone").forEach((phone) => {
  IMask(phone, {
    mask: "+{7}(000)000-00-00",
  });
});

// модальное окно
function openModal(modalName, modalClose, modalOpen) {
  modalName = document.querySelector(modalName);
  modalClose = document.querySelector(modalClose);
  modalOpen = document.querySelectorAll(modalOpen);
  modalOpen.forEach((openModalBtn) => {
    openModalBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      modalName.classList.add("openModal");
    });
  });
  modalClose.addEventListener("click", (e) => {
    modalName.classList.remove("openModal");
  });
}

// вывод данных с json
function fetchData(nameData, sale, cost) {
  fetch("js/price.json")
    .then((response) => response.json())
    .then((jsonData) => {
      jsonData.product.forEach((product) => {
        if (product.name == nameData) {
          let price = product.cost - product.sale;
          document.querySelector(cost).innerText = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + "₽";
          if (product.sale > 0) {
            document.querySelector(sale).innerText =
              product.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + "₽";
          } else {
            document.querySelector(sale).innerText = "";
          }
        }
      });
    });
}
// открытие выпадающего меню у прайса
function openMenu(btnOpen, menu, body, dropdownItems) {
  btnOpen.forEach((btn, i) => {
    btn.addEventListener("click", (e) => {
      let isOpen = btn.classList.toggle("open-menu");
      updateMenuState(menu, body, isOpen, i);

      if (dropdownItems) {
        dropdownItems.forEach((item) => {
          item.addEventListener("click", (e) => {
            btn.firstElementChild.value = item.innerText;
            fetchData(item.innerText, "#saleBitrix", "#costBitix");
            updateMenuState(menu, body, false, i);
            btn.classList.remove("open-menu");
          });
        });
      }
    });
  });
}

// обновление стилей у  меню
function updateMenuState(menu, body, isOpen, index) {
  if (isOpen) {
    menu[index].style.maxHeight = menu[index].scrollHeight + 150 + "px";
    menu[index].style.opacity = "1";
    menu[index].style.visibility = "visible";
    body ? (body[index].style.paddingBottom = "19px") : null;
  } else {
    menu[index].style.maxHeight = "0px";
    menu[index].style.opacity = "0";
    menu[index].style.visibility = "hidden";
    body ? (body[index].style.paddingBottom = "0px") : null;
  }
}
fetchData("Без лицензии 1с-Битрикс", "#sale", "#cost");
fetchData("Малый бизнес", "#saleBitrix", "#costBitix");

openMenu(
  document.querySelectorAll(".dropdown__top"),
  document.querySelectorAll(".dropdown__list"),
  null,
  document.querySelectorAll(".dropdown__btn")
);
openMenu(faqTop, faqInfo, faqBody);
openModal(".modal", ".modal__close", ".order-development-tariff");

/// Валидация формы и отправка на сервер

forms.forEach((form) => {
  $(form).validate({
    rules: {
      name: {
        required: true,
      },
      phone: {
        required: true,
      },
      email: {
        required: true,
      },
    },
    messages: {
      name: {
        required: "Неверно заполнено поле",
      },
      phone: {
        required: "Неверно заполнено поле",
      },
      email: {
        required: "Неверно заполнено поле",
      },
    },
    errorPlacement: function (error, element) {
      $(element).closest(".form-offer__body").find(".form-offer__error").text(error.text());
    },
    highlight: function (element, errorClass, validClass) {
      $(element).closest(".form-offer__body").find(".form-offer__error").addClass("form-offer__error--active");
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).closest(".form-offer__body").find(".form-offer__error").removeClass("form-offer__error--active");
    },
    submitHandler: function (form) {
      event.preventDefault();
      const data = {
        site: "Решение Fashion",
        nameTariff: $(".dropdown__input").val(),
        cost: $(".items-cost__summ span").text(),
        costBitrix: $(".block-version__summ span").text(),
        name: $(form).find("#nameOrder").val(),
        phone: $(form).find("#phoneOrder").val(),
        email: $(form).find("#emailOrder").val(),
      };

      document.querySelector(".modal").classList.remove("openModal");
      document.querySelector(".modal-success").classList.add("openModal");
      setTimeout(() => {
        document.querySelector(".modal-success").classList.remove("openModal");
      }, 4000);
      $.ajax({
        url: "send.php",
        type: "POST",
        data: data,
        success: function (response) {
          console.log(`Данные успешно отправлены!`);
        },
        error: function (error) {
          console.error("Ошибка при отправке данных: ", error);
        },
      });
    },
  });
});

// Плавный скролл
$('a[href*="#"]').click(function(e) {
  var id = $(this).attr('href');
  var $id = $(id);
  if ($id.length) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: $id.offset().top }, 'slow');
  }
});