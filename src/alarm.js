export class Alarm{
    selectorTickers = [];
    alarmSelector = document.querySelector('.ticker-alarm-selector select');
    targetPrice = document.querySelector('#ticker-target-price');

    addDataToSelect(ticker){
        let newOption = document.createElement("option");
        newOption.value = newOption.innerText = ticker;
        this.alarmSelector.appendChild(newOption);

        this.selectorTickers.push(ticker);

        // обновим селект обертку либы материалайз
        M.FormSelect.init(this.alarmSelector);
    }

    // @todo:
    // порядок проверки пермишенов, сейчас почему-то false выдает
    // назначение оповещений для нескольких тикеров, сейчас только для 1
    setNotification(){
        var currentAlarm = this;

        if (currentAlarm._askPermission()){

            //const interval = 60*60*1000; // 1 час
            const interval = 10*1000;

            var targetTicker = currentAlarm.alarmSelector.value;
            var targetPrice = currentAlarm.targetPrice.value;

            if (isNaN(targetTicker)){
                alert('Выберите тикер для отслеживания');
                return false;
            }

            var timerId = setInterval(function () {

                console.log(targetTicker, targetPrice);

                let trackedData = currentAlarm._trackTargetTicker(targetTicker);
                let companyName = trackedData.description;
                let lastPrice = trackedData.lastPrice;
                if (lastPrice >= targetPrice) {
                    clearInterval(timerId);
                    console.log(companyName, `Тикер: ${targetTicker},  цена: ${lastPrice}$.`);
                    new Notification(companyName, { body: `Тикер: ${targetTicker},  цена: ${lastPrice}$.`, dir: 'auto' });
                }
            }, interval);
        } else {
            alert('HTML Notifications запрещены пользователем')
        }
    }

    _trackTargetTicker(targetTicker){
        return getCurrentDataByTicker(targetTicker).shift();
    }

    _askPermission() {
        if (!("Notification" in window)) {
            alert('Ваш браузер не поддерживает HTML Notifications.');
        } else if (Notification.permission === "granted") {
            return true;
        } else {
            Notification.requestPermission(function (permission) {
                return permission === "granted";
            });
        }
    }
}