import {Alarm} from './src/alarm.js';
// import {graph} from '/src/alarm.js';
// import {menu} from '/src/alarm.js';
// import {alarm} from '/src/alarm.js';

console.log(Alarm);

document.addEventListener("DOMContentLoaded", function() {

    const graph = new Graph();
    const menu = new Menu();
    const alarm = new Alarm();

    // стилизация селект элементов из либы материалайз
    let selectElems = document.querySelectorAll('select');
    M.FormSelect.init(selectElems);

    const leftMenuBtn = document.querySelector(".left-menu-btn");
    leftMenuBtn.addEventListener('click',function() {
        if (this.getAttribute('data-target') === 'slide-out') {
            this.parentElement.style.left = 0;
            this.setAttribute('data-target', 'slide-in');
        } else {
            this.parentElement.style.left = '-275px';
            this.setAttribute('data-target', 'slide-out');
        }
    });

    const alarmContainer = document.querySelector('.add-alarm');
    const alarmBtn = alarmContainer.querySelector('i');
    alarmBtn.addEventListener('click',function() {
        alarm.setNotification();
    });

    const addContainer = document.querySelector(".add-company");
    const plusBtn = addContainer.querySelector('i');
    let tickerContainer;
    plusBtn.addEventListener('click',function() {

        // добавляем тикер компанию в меню
        let ticker = addContainer.querySelector('input').value;
        let tickerInfo = searchInfoByTicker(ticker).shift();
        let tickerCompany = tickerInfo.description.substring(0, 20)+'...';

        // добавляем тикер компании в селект для notifications
        alarm.addDataToSelect(ticker);

        // слушатель для запуска виджета графика акции
        tickerContainer = menu.addCompany(ticker, tickerCompany);
        tickerContainer.addEventListener('click', function () {
            graph.create(ticker, tickerCompany);
            this.classList.add("success");
            this.querySelector('.visibility').style.opacity = 1;
        });
    });
});


// @todo:
//  сохранение состояния меню,
//  проверка на валидность тикера при добавлении в меню,
//  мобильная версия опитмизация,
//  состояние индикаторов меню,
//  скрываем шапку виджета графа до его загрузки,
//  различного рода валидация данных