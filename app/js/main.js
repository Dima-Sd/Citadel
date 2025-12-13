addEventListener('DOMContentLoaded', function () {
    const accardionButtons = document.querySelectorAll('[data-button]');
    
    accardionButtons.forEach(function (button) {
        button.addEventListener('click', function () {

            const answer = button.nextElementSibling.querySelector('.faq__answer');
            let heightAnswer = answer.scrollHeight;
            const title = button.nextElementSibling.querySelector('.faq__subtitle');
            const arrow = button.parentElement.querySelector('.faq__icon');

            if (button.classList.contains('active')) {
                button.classList.remove('active');
                answer.style.maxHeight = 0;
                title.style.marginBottom = 0;
                arrow.style.transform = "rotate(90deg)";
                return;
            } else {
                accardionButtons.forEach(function (button) {
                    button.classList.remove('active');

                    const accardiontexts = button.nextElementSibling.querySelectorAll('.faq__answer');
                    accardiontexts.forEach(function (text) {
                        text.style.maxHeight = 0;
                    });

                    const accardionArrows = button.parentElement.querySelectorAll('.faq__icon');
                    accardionArrows.forEach(function (arrow) {
                        arrow.style.transform = "rotate(90deg)";
                    });
                });

                const titles = document.querySelectorAll('.faq__subtitle');
                titles.forEach(function (title) {
                    title.style.marginBottom = 0;
                });
            }

            button.classList.add('active');
            answer.style.maxHeight = heightAnswer + "px";
            title.style.marginBottom = "12px";
            arrow.style.transform = "rotate(0deg)";
        });
    });



    const startAddonNumber = (elements)=> {
      const time = 2000;  // Общее время анимации в миллисекундах
        
        elements.forEach(item => {
              const targetValue = item.dataset.countNum; // строка
              const num = parseFloat(targetValue);

              // есть ли дробная часть
              const hasDecimal = targetValue.includes('.');
              const decimals = hasDecimal ? targetValue.split('.')[1].length : 0;

              let startTime = null;

            const updateNumber = (timestamp) => {
              if (!startTime) startTime = timestamp;

              const progress = Math.min((timestamp - startTime) / time, 1);
              const currentValue = num * progress;

              item.textContent = hasDecimal
                ? currentValue.toFixed(decimals)
                : Math.floor(currentValue);

              if (progress < 1) {
                requestAnimationFrame(updateNumber);
              }
            };

            requestAnimationFrame(updateNumber);
        });
    }

    const addonElement = document.querySelector('.metrics'); 
  if (addonElement) { 
    const observer = new IntersectionObserver((entries, observer) => { 
      entries.forEach(entry => { 

      if (entry.isIntersecting) { 
          const elements = document.querySelectorAll('[data-activeNum]'); 
          startAddonNumber(elements); 
          observer.disconnect(); // Отключаем после первого срабатывания 
         }
     });

     }, { threshold: 0.5 }); 
     observer.observe(addonElement); // Слежу за нужным или любым другим элементом в конце страницы 
    
  }

    

   



});
