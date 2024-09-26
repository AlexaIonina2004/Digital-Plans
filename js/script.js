let burger = document.querySelector('.menu__burger')
const menu = document.querySelector(".header__menu");
let menuItem = document.querySelector('.no-hidden-menu')
let header = document.querySelector('.header')
let brands = document.querySelector('.brands')
let openUnderMenu = document.querySelectorAll('.big-menu')
const width = window.innerWidth;

const opacity = document.createElement('div');
opacity.classList.toggle('opacity')



window.addEventListener("scroll", function () {

  if (pageYOffset > 40) {
    header.style.background = "#ffff";
  } else {
    header.style.background = "unset";
  }
});

if(width > 992) {

  
    let currentlyOpenItem = null; 
  
    openUnderMenu.forEach(item => {

      item.addEventListener('mouseenter', function() {
        document.querySelector('.header').classList.add('hovered');
        document.querySelector('.wrapper').appendChild(opacity);
       
  });
  item.addEventListener('mouseleave', function() {
    document.querySelector('.header').classList.remove('hovered');
    document.querySelector('.wrapper').removeChild(opacity);
});




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

  let isOpen = menu?.classList.toggle("menu-open");

    if(isOpen) {
      document.querySelector('.wrapper').appendChild(opacity);
      
    } else {
      document.querySelector('.wrapper').removeChild(opacity);
    }

    opacity?.addEventListener('click', e => {
      document.querySelector('.wrapper').removeChild(opacity);
      menu?.classList.remove("menu-open");
    })
  });


  
  