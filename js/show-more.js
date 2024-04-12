// const buttonBrands = document.querySelector('.show-more--brands')
// const sliderDropdown = document.querySelector('.brands__slider')

// const buttonText = document.querySelector('.show-more--text')
// const textDropdown = document.querySelector('.content__text--wrapper')

// const buttonRepair = document.querySelector('.show-more--repair')
// const repairDropdown = document.querySelector('.repair__slider')



// buttonBrands.addEventListener('click', () => {
//   if(buttonBrands.classList.contains('show-more--active')) {
//     buttonBrands.textContent = 'Показать все'
//   } else {
//     buttonBrands.textContent = 'Скрыть'
//   }
//   buttonBrands.classList.toggle('show-more--passive')
//   buttonBrands.classList.toggle('show-more--active')
//   sliderDropdown.classList.toggle('--is-visible')
// })

// buttonText.addEventListener('click', () => {
//   if(buttonText.classList.contains('show-more--active')) {
//     buttonText.textContent = 'Читать далее'
//   } else {
//     buttonText.textContent = 'Скрыть'
//   }
//   buttonText.classList.toggle('show-more--passive')
//   buttonText.classList.toggle('show-more--active')
//   textDropdown.classList.toggle('--is-visible')
// })

// buttonRepair.addEventListener('click', () => {
//   if(buttonRepair.classList.contains('show-more--active')) {
//     buttonRepair.textContent = 'Показать все'
//   } else {
//     buttonRepair.textContent = 'Скрыть'
//   }
//   buttonRepair.classList.toggle('show-more--passive')
//   buttonRepair.classList.toggle('show-more--active')
//   repairDropdown.classList.toggle('--is-visible')
// })

      // Изменение текста и стиля кнопки в зависимости от текущего состояния
  //     if (isAnyElementShown) {
  //       button.classList.add('rotated');
  //       button.textContent = 'Скрыть';
  //     } else {
  //       button.classList.remove('rotated');
  //       button.textContent = 'Показать больше';
  //     }
  //   } else {
  //     // Возможно, стоит вывести предупреждение или обработать отсутствие элемента
  //     console.error('Element with id "' + targetId + '" not found.');
  //   }
  // });

  document.addEventListener("DOMContentLoaded", function() {
    const toggleVisibilityOnLoadAndResize = () => {
      // Определяем, нужно ли скрывать элементы
      const shouldHideItems = window.innerWidth >= 768;
  
      const containerSelectors = ['.brands__slider', '.repair__slider'];
      containerSelectors.forEach(selector => {
        const container = document.querySelector(selector);
        if (!container) return;
        
        const items = container.querySelectorAll('li');
        if (!items.length) return;
  
        if (shouldHideItems) {
          let containerWidth = container.offsetWidth;
          let totalWidth = 0;
          let itemsToShow = items.length;
  
          for (let i = 0; i < items.length; i++) {
            totalWidth += items[i].offsetWidth;
            if (totalWidth > containerWidth) {
              itemsToShow = i;
              break;
            }
          }
  
          items.forEach((item, index) => {
            item.classList.toggle('hidden-text', index >= itemsToShow);
            item.style.display = index >= itemsToShow ? 'none' : '';
          });
        } else {
          // Если ширина экрана меньше 768px, убираем класс hidden-text и показываем все элементы
          items.forEach((item) => {
            item.classList.remove('hidden-text');
            item.style.display = '';
          });
        }
      });
    };
  
    const manageButtonVisibility = () => {
      // Скрываем или показываем кнопки в зависимости от ширины экрана
      const shouldDisplayButton = window.innerWidth >= 768;
      document.querySelectorAll('.toggle-button').forEach(button => {
        button.style.display = shouldDisplayButton ? 'block' : 'none';
  
        if (shouldDisplayButton) {
          button.addEventListener('click', function() {
            const targetSelector = '#' + this.getAttribute('data-target');
            const hiddenItems = document.querySelectorAll(`${targetSelector} .hidden-text`);
            const isAnyItemHidden = Array.from(hiddenItems).some(item => item.style.display === 'none');
  
            hiddenItems.forEach(item => {
              item.style.display = isAnyItemHidden ? 'block' : 'none';
            });
  
            this.classList.toggle('rotated', isAnyItemHidden);
            this.textContent = isAnyItemHidden ? 'Скрыть' : 'Показать все';
          });
        }
      });
    };
  
    // Вызываем функции при загрузке и на событие изменения размера окна
    toggleVisibilityOnLoadAndResize();
    manageButtonVisibility();
    window.addEventListener('resize', () => {
      toggleVisibilityOnLoadAndResize();
      manageButtonVisibility();
    });
  });
  
  document.addEventListener("DOMContentLoaded", function() {
    const textContainer = document.getElementById('text-1');
    const toggleButton = document.querySelector('.toggle-button[data-target="text-1"]');
    const originalHeight = textContainer.offsetHeight; // Изначальная высота контейнера с текстом
  
    // Функция для переключения состояния текста и кнопки
    function toggleText() {
      if (textContainer.classList.contains('expanded')) {
        textContainer.style.height = 'auto'; // Возвращаем изначальную высоту
        this.classList.add('rotated');
        this.textContent = toggleButton ? 'Скрыть' : 'Показать все';
      } else {
        textContainer.style.height = originalHeight + 'px'; // Устанавливаем высоту, при которой текст полностью виден
        this.classList.remove('rotated');
        this.textContent = toggleButton ? 'Показать все' : 'Скрыть' ;
      }
      textContainer.classList.toggle('expanded');
    }
  
    // Изначальное скрытие текста, если он не помещается полностью
    function checkTextOverflow() {
      const isOverflowing = textContainer.scrollHeight > textContainer.offsetHeight;
      if (isOverflowing) {
        // Если текст не помещается, показываем кнопку
        toggleButton.style.display = 'block';
        textContainer.style.height = originalHeight + 'px'; // Устанавливаем максимальную высоту
        textContainer.style.overflow = 'hidden'; // Скрываем излишек текста
      } else {
        toggleButton.style.display = 'none';
      }
    }
  
    checkTextOverflow(); // Проверяем при загрузке
    window.addEventListener('resize', checkTextOverflow); // и при изменении размеров окна
  
    toggleButton.addEventListener('click', toggleText); // Добавляем обработчик клика на кнопку
  });
