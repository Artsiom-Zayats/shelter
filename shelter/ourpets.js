
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






//Пагинация


//48 карточек
function buildPetList(pets) {
    const list = [];
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 8; j++) {
            list.push(pets[j]);
        }
    }
    return list; 
}

function getCardsPerPage() {
    const w = document.documentElement.clientWidth;
    if (w >= 1280) return 8;  // деск: 6 страниц × 8 карточек
    if (w >= 768) return 6;   // планшет: 8 страниц × 6 карточек
    return 3;                  // моб:  16 страниц × 3 карточки
}

let currentPage = 1;
let petList = [];

function renderPage(page, animate) {
    const container = document.querySelector('.cards-container');
    const template = document.getElementById('pets-card-template');
    const perPage = getCardsPerPage();
    const totalPages = 48 / perPage;

    currentPage = Math.max(1, Math.min(page, totalPages));

    const start = (currentPage - 1) * perPage;
    const pagePets = petList.slice(start, start + perPage);

    const doRender = () => {
        container.innerHTML = '';
        pagePets.forEach(pet => {
            const card = template.content.cloneNode(true);
            card.querySelector('.pet-photo').src = pet.img;
            card.querySelector('.pet-name').textContent = pet.name;
            container.appendChild(card);
        });
        updateNav(totalPages);
        if (animate) {
            requestAnimationFrame(() => {
                container.style.opacity = '1';
            });
        }
    };

    if (animate) {
        container.style.transition = 'opacity 0.3s ease';
        container.style.opacity = '0';
        setTimeout(doRender, 300);
    } else {
        container.style.transition = 'none';
        container.style.opacity = '1';
        doRender();
    }
}

function updateNav(totalPages) {
    const pageNum = document.querySelector('.page-number');
    const btnFirst = document.querySelector('.left-end-navigator');
    const btnPrev = document.querySelector('.left-navigator');
    const btnNext = document.querySelector('.right-navigator');
    const btnLast = document.querySelector('.right-end-navigator');

    pageNum.textContent = currentPage;

    const isFirst = currentPage === 1;
    const isLast = currentPage === totalPages;

    // Блокируем неактивные кнопки
    btnFirst.disabled = isFirst;
    btnPrev.disabled = isFirst;
    btnNext.disabled = isLast;
    btnLast.disabled = isLast;

    // Состояние кнопок(визуал)
    btnFirst.style.opacity = isFirst ? '0.4' : '1';
    btnPrev.style.opacity = isFirst ? '0.4' : '1';
    btnNext.style.opacity = isLast ? '0.4' : '1';
    btnLast.style.opacity = isLast ? '0.4' : '1';

    btnFirst.style.cursor = isFirst ? 'default' : 'pointer';
    btnPrev.style.cursor = isFirst ? 'default' : 'pointer';
    btnNext.style.cursor = isLast ? 'default' : 'pointer';
    btnLast.style.cursor = isLast ? 'default' : 'pointer';
}

function initPagination() {
    const btnFirst = document.querySelector('.left-end-navigator');
    const btnPrev = document.querySelector('.left-navigator');
    const btnNext = document.querySelector('.right-navigator');
    const btnLast = document.querySelector('.right-end-navigator');

    btnFirst.addEventListener('click', () => {
        if (currentPage > 1) renderPage(1, true);
    });
    btnPrev.addEventListener('click', () => {
        if (currentPage > 1) renderPage(currentPage - 1, true);
    });
    btnNext.addEventListener('click', () => {
        if (currentPage < 48 / getCardsPerPage()) renderPage(currentPage + 1, true);
    });
    btnLast.addEventListener('click', () => {
        if (currentPage < 48 / getCardsPerPage()) renderPage(48 / getCardsPerPage(), true);
    });

    // Возврат на первую стр при изм экрана
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => renderPage(1, false), 200);
    });
}




document.addEventListener('DOMContentLoaded', async () => {
    burgerMenu();

    const pets = await loadPets();
    petList = buildPetList(pets);

    renderPage(1, false);
    initPagination();
    initModal();
});