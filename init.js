document.addEventListener("DOMContentLoaded", function() {

    const graph = new Graph();
    const menu = new Menu();
    const alarm = new Alarm();

    // навешиваем листенер на базовый набор компаний
    // const tickersToAdd = document.querySelectorAll(".collection-item");
    // tickersToAdd.forEach(function(ticker) {
    //     if (!ticker.classList.contains("btns")){
    //         ticker.addEventListener('click', function () {
    //             let selectedTicker = this.querySelector('span').innerHTML;
    //             let companyName = this.querySelector('small').innerHTML;
    //             graph.create(selectedTicker, companyName);
    //         });
    //     }
    // });

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

    let elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);

    const addContainer = document.querySelector(".add-company");
    const plusBtn = addContainer.querySelector('i');
    let tickerContainer;
    plusBtn.addEventListener('click',function() {
        let ticker = addContainer.querySelector('input').value;
        let tickerInfo = searchInfoByTicker(ticker).shift();
        let tickerCompany = tickerInfo.description.substring(0, 20)+'...';

        tickerContainer = menu.addCompany(ticker, tickerCompany);
        tickerContainer.addEventListener('click', function () {
            graph.create(ticker, tickerCompany);
            this.classList.add("success");
            this.querySelector('.visibility').style.opacity = 1;
        });

        alarm.selectorTickers.push(ticker);
    });

    const alarmContainer = document.querySelector('.add-alarm');
    const alarmBtn = alarmContainer.querySelector('i');
    alarmBtn.addEventListener('click',function() {
        alarm.addData();
    });



    // оповещение по заданной цене

    // прикрутить авторизацию с firebase google?
});