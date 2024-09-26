let burger = document.querySelector('.menu__burger')
const menu = document.querySelector(".header__menu");
let menuItem = document.querySelector('.no-hidden-menu')
let header = document.querySelector('.header')
let brands = document.querySelector('.brands')
let openUnderMenu = document.querySelectorAll('.menu__link')
const width = window.innerWidth;

// window.addEventListener('resize',(e) => {
//   const width = document.body.clientWidth;
//   console.log(width)
//   if(width < 1200) {
//   brands.classList.add('marquee')
  
//   }
// });

window.addEventListener("scroll", function () {

  if (pageYOffset > 40) {
    header.style.background = "#ffff";
  } else {
    header.style.background = "unset";
  }
});

if(width > 1280) {
  // console.log(width)
    const opacity = document.createElement('div');
    opacity.classList.toggle('opacity')
  
    let currentlyOpenItem = null; 
  
    openUnderMenu.forEach(item => {
      item.addEventListener('click', (e) => {
        const openMenu = item.nextElementSibling;
        let isOpen = openMenu.classList.toggle('openUnder');
        // console.log(isOpen);
       
        if (isOpen) {
          if (currentlyOpenItem && currentlyOpenItem !== item) {
            currentlyOpenItem.nextElementSibling.classList.remove('openUnder');
            document.querySelector('.wrapper').removeChild(opacity);
            document.querySelector('.header').style.background = 'unset';
          }
    
          document.querySelector('.wrapper').appendChild(opacity);
          document.querySelector('.header').style.background = '#ffff';
          currentlyOpenItem = item;
        } else {
          document.querySelector('.wrapper').removeChild(opacity);
          document.querySelector('.header').style.background = 'unset';
          currentlyOpenItem = null; 
        }
      });
    });

} else {
  $('.marquee').marquee({
    duration: 10000,
    gap: 50,
    delayBeforeStart: 5,
    direction: 'left',
    duplicated: true
  });
    $(document).ready(function () {
        $(".menu__nav").slinky();
      });
}

burger?.addEventListener("click", (e) => {
    menu?.classList.toggle("menu-open");
  });


  
  