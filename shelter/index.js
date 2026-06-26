//пишем реализацию burger menu

function burgerMenu(){
  const burgerButton = document.querySelector('.burger-button');
  const burgerMenu = document.querySelector('.burger-menu');
  const burgerItem = document.querySelectorAll('.burger-item');
  const overlay = document.querySelector('.overlay');
//выезжает меню
  burgerButton.addEventListener('click',() =>{
    //проверяем в каком состоянии кнопка через проверку присутствующего класса
    if(burgerMenu.classList.contains('hidden-burger')){
      burgerMenu.classList.remove('hidden-burger');
        burgerButton.classList.add('active');
      document.body.classList.add('no-scroll');  
      overlay.classList.add('active');
    }else{
      burgerMenu.classList.add('hidden-burger');
        burgerButton.classList.remove('active');
      document.body.classList.remove('no-scroll');
      overlay.classList.remove('active');
    }
    
  } )

//закрытие бургер меню по клику на дочерние элементы бургер меню
  burgerItem.forEach(burger=>{
    burger.addEventListener('click',() =>{
    
      burgerMenu.classList.add('hidden-burger');
      burgerButton.classList.remove('active');
      document.body.classList.remove('no-scroll');
      overlay.classList.remove('active');
    
  } )})
  

 
}


document.addEventListener('DOMContentLoaded', function() {
    
    burgerMenu();
   
    window.addEventListener('resize', () => {
      resizeWindow();
    });
});