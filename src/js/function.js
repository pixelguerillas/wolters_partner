
//navigation
function navCheck(){
    const siteHeader = document.querySelector('.site__header');
    siteHeader.classList.remove("menu-small");
    document.querySelector('main').classList.remove("main-small");
    const navW = document.querySelector('.navigation'); console.log(navW.offsetWidth);
    const navulW = document.querySelector('.navigation__list'); console.log(navulW.offsetWidth);
    const logoW  = document.querySelector('.logo'); console.log(logoW.offsetWidth);
    if( navW.offsetWidth <  (logoW.offsetWidth + navulW.offsetWidth)){
        siteHeader.classList.toggle("menu-small");
        document.querySelector('main').classList.toggle("main-small");
    }
}

//menu
(function() {
    var Menu = (function() {
      var burger = document.querySelector('.burger');
      var menu = document.querySelector('.menu');
      var menuList = document.querySelector('.menu__list');
      var brand = document.querySelector('.menu__brand');
      var menuItems = document.querySelectorAll('.menu__item');
      var active = false;
      var toggleMenu = function() {
        if (!active) {
          menu.classList.add('menu--active');
          menuList.classList.add('menu__list--active');
          brand.classList.add('menu__brand--active');
          burger.classList.add('burger--close');
          for (var i = 0, ii = menuItems.length; i < ii; i++) {
            menuItems[i].classList.add('menu__item--active');
          }
          active = true;
        } else {
          menu.classList.remove('menu--active');
          menuList.classList.remove('menu__list--active');
          brand.classList.remove('menu__brand--active');
          burger.classList.remove('burger--close');
          for (var i = 0, ii = menuItems.length; i < ii; i++) {
            menuItems[i].classList.remove('menu__item--active');
          }
          active = false;
        }
      };
      var bindActions = function() {
        burger.addEventListener('click', toggleMenu, false);
      };
      var init = function() {
        bindActions();
      };
      return {
        init: init
      };
    }());
    Menu.init();
}());

//sticky nav
window.addEventListener("scroll", function(){
  var header = document.querySelector(".site__header");
  header.classList.toggle("sticky__header", window.scrollY > 0);
})

window.addEventListener('resize', navCheck);
window.addEventListener('load', navCheck);
