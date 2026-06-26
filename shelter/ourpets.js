
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


async function loadPets() {
  const res = await fetch('./pets.json');
  if (!res.ok) throw new Error('pets.json not loaded');
  return res.json();
}



// Функция для отображения карточек итомцев на странице
async function renderPetsCard() {
    // Получаем контейнер, куда будем вставлять карточки
    const container = document.querySelector('.cards-container');
    
    // Получаем шаблон
    const template = document.getElementById('pets-card-template');
    
    // Очищаем контейнер
    container.innerHTML = '';
    
    // Получаем 3 случайных карточки
    const pets = await loadPets(); 
    const randomPets = [...pets];
    
    // Создадим карточку
    randomPets.forEach(pet => {

        // Клонируем  шаблон
        const card = template.content.cloneNode(true);
        
        
        const imageContainer = card.querySelector('.pet-photo');
        
        const nameHeader = card.querySelector('.pet-name');
        
        // Заполняем данными из JSON
        imageContainer.src = pet.img;
        
        nameHeader.textContent = pet.name;
        
        
        // Добавляем карточку в контейнер
        container.appendChild(card);

        
    });

    
}


async function initModal() {
    const modal = document.querySelector('.modal');
    const closeButton = document.querySelector('.button-close');
    const overlay = document.querySelector('.overlay');
    
    const sliderBody = document.querySelector('.cards-container');

    const pets = await loadPets(); 
    const randomPets = [...pets];
    
    if (sliderBody) {
        sliderBody.addEventListener('click', (event) => {
            


            // Проверяем и открываем модалку
            const card = event.target.closest('.pet-card');
            if (card && modal) {
                modal.classList.remove('hidden');
                if (overlay)
                overlay.classList.add('active');
            }

            //находим текст заголовка из карточки 
            const name = card.querySelector('.pet-name').textContent;
            
            //найдем ячейку из json c конкретным подарком имени

            const pet = randomPets.find(item => item.name === name);

            
            //заполняем модал
            document.querySelector('.modal-image').src = pet.img;
            document.querySelector('.modal-name').textContent  = pet.name;
            document.querySelector('.modal-typeBreed').textContent  = `${pet.type} - ${pet.breed}`;
            document.querySelector('.modal-pets-info').textContent  = pet.description;
            document.querySelector('.modal-age').textContent  = pet.age;
            document.querySelector('.inoculations').textContent  = pet.inoculations;
            document.querySelector('.diseases').textContent  = pet.diseases;
            document.querySelector('.parasites').textContent  = pet.parasites;
                


            
            //отключим прокрутку

            document.body.classList.add('no-scroll');

            //пробуем добавить снежинки


            

        });
    }
    






    // Закрытие по крестику
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            document.body.classList.remove('no-scroll');
            modal.classList.add('hidden');
             
            overlay.classList.remove('active');
        });
    }
    
    // Закрытие по клику вне модального окна
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.classList.remove('no-scroll');
                
                overlay.classList.remove('active');
                modal.classList.add('hidden');
            }
        });
    }
    
    if (overlay) {
        overlay.addEventListener('click', () => {
            modal.classList.add('hidden');
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    }
    
}















document.addEventListener('DOMContentLoaded', function() {
     
    burgerMenu();
     renderPetsCard();
     initModal();
   
});