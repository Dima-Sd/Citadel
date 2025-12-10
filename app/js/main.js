
window.addEventListener('DOMContentLoaded', ()=>{


  /* TАБЫ */
const tabBtn = document.querySelectorAll('.tab-nav__btn'),
      tabItem = document.querySelectorAll('.tab__item');
  
  tabBtn.forEach(button => {
    button.addEventListener('click', (e)=>{
      e.preventDefault();

      const tabId = button.getAttribute('data-btn');
      const i18nKey = button.getAttribute('data-i18n');
      const breadcrumb = document.querySelector('.breadcrumbs__item:last-child .breadcrumbs__link');
      
      breadcrumb.setAttribute('data-i18n', i18nKey);
      breadcrumb.textContent = translations[currentLang][i18nKey] || button.textContent;
 
       // Убираем активный класс у всех кнопок
      tabBtn.forEach(btn => {
        btn.classList.remove('tab-nav__btn--active');
      });

      // Добавляем активный класс нажатой кнопке
      button.classList.add('tab-nav__btn--active');

      // Скрываем все табы
      tabItem.forEach(item => {
        item.classList.remove('tab__item--active', 'fade');
      });

    
      document.getElementById(tabId).classList.add('tab__item--active', 'fade');
      updateBreadcrumb();
    })
  });

  // Обновление хлебной крошки
  const updateBreadcrumbFromActiveTab = () => {
  const activeBtn = document.querySelector('.tab-nav__btn--active');
  if (!activeBtn) return;

  const i18nKey = activeBtn.getAttribute('data-i18n');
  const breadcrumb = document.querySelector('.breadcrumbs__item:last-child .breadcrumbs__link');

  // Обновляем атрибут перевода
  breadcrumb.setAttribute('data-i18n', i18nKey);
  
  // Обновляем текст сразу
  if (translations[currentLang] && translations[currentLang][i18nKey]) {
    breadcrumb.textContent = translations[currentLang][i18nKey];
  }


}

const updateBreadcrumb = () => {
   const lastbreadcrumb = document.querySelector('.breadcrumbs__item:last-child .breadcrumbs__link');
   if(!lastbreadcrumb) return;

   lastbreadcrumb.classList.add('fade');

   setTimeout(() => {
    lastbreadcrumb.classList.remove('fade');
   }, 100);
}


  // Перевод
let translations = {};
let currentLang = "en";

// Загружаем JSON
fetch("./lang/lang.json")
  .then(res => res.json())
  .then(data => {
    translations = data;
    updateContent();
    applyLanguage(currentLang);
  });


  const applyLanguage = (lang) => {
  document.documentElement.setAttribute("lang", lang);

  if (lang === "ar") {
    document.documentElement.classList.add("arabic");
    document.documentElement.setAttribute("dir", "rtl");
   // aboutSlider.changeLanguageDirection("rtl");
   // mediaSwiper.changeLanguageDirection("rtl");
  } else {
    document.documentElement.classList.remove("arabic");
    document.documentElement.removeAttribute("dir");
   // aboutSlider.changeLanguageDirection("");
   // mediaSwiper.changeLanguageDirection("");
  }
  
/*  setTimeout(() => {
    initSliders();
    filterSlidesByLang();
  }, 50); */
}

/* function filterSlidesByLang() {
  const slides = document.querySelectorAll('.media-slider__slide');

  slides.forEach(slide => {
    const type = slide.dataset.show;


    if (currentLang === "ar") {
      // при арабском показываем только data-show="ar"
      slide.style.display = (type === "ar") ? "" : "none";
    } else {
      // Если не ar тогда data-show="not-ar"
      slide.style.display = (type !== "ar") ? "" : "none";
    }
  });

  // нужно обновить Swiper после изменения видимости
  setTimeout(() => {
    mediaSwiper.update();
  }, 50);
} */

// Функция обновления всех текстов
const updateContent = () => {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (translations[currentLang] && translations[currentLang][key]) {
      el.innerHTML = translations[currentLang][key];
    }
  });

   /* document.querySelectorAll("[data-i18n-link]").forEach(el => {
    const key = el.dataset.i18nLink.split("."); // ["links", "download_google"]
    let value = translations[currentLang];

    key.forEach(k => value = value?.[k]);

    if (value) el.href = value;
  }); */
}

  // Переключение языка
  document.querySelectorAll("[data-lang]").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      currentLang = btn.dataset.lang;
      updateContent();
      applyLanguage(currentLang);
      updateBreadcrumbFromActiveTab();
      updateBreadcrumb();

      // визуально активная кнопка
      document.querySelectorAll(".switcher-lang__link").forEach(l => l.classList.remove("switcher-lang__link--active"));
      btn.classList.add("switcher-lang__link--active");
    });
  });

});