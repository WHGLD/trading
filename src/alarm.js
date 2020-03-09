class Alarm{
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

    setNotification(){
        if (askPermission()){
            //const interval = 60*60*1000; // 1 час
            const interval = 10*1000;

            var lastPrice;
            var currentAlarm = this;
            var timerId = setInterval(function () {
                let targetTicker = currentAlarm.alarmSelector.value;
                let targetPrice = currentAlarm.targetPrice.value;

                if (isNaN(targetTicker)){
                    clearInterval(timerId);
                    alert('Выберите тикер для отслеживания');
                }

                let trackedData = currentAlarm.trackTargetTicker(targetTicker);
                let companyName = trackedData.description;
                lastPrice = trackedData.lastPrice;
                if (lastPrice >= targetPrice) {
                    clearInterval(timerId);
                    new Notification(companyName, { body: `Тикер: ${targetTicker},  цена: ${lastPrice}$.`, dir: 'auto' });
                }
            }, interval);
        } else {
            alert('HTML Notifications запрещены пользователем')
        }
    }

    trackTargetTicker(targetTicker){
        return getCurrentDataByTicker(targetTicker).shift();
    }
}

function askPermission() {
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