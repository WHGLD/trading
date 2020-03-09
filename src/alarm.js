class Alarm{
    selectorTickers = [];
    alarmSelector = document.querySelector('.ticker-alarm-selector select');

    // заполнить селект
    // получить все доступные компании из меню
    // парсинг исходных и добавление динамачиски созданных

    //addDataToAlarmSelect

    addData(){
        console.log('alarmSelector', this.alarmSelector, 'selectorTickers', this.selectorTickers);

        sendNotification('Сколько ТЫЖ программистов нужно чтобы вкрутить лампочку?', { body: 'Только ты!', dir: 'auto' });
    }

    // обработка создания оповещения
    // настроить запросы к api раз в час - два на проверку данных, макс 120 запросов в сутки
    // вывод оповещения
}


// проверить на гит хаб пейджах

function sendNotification(title, options) {
// Проверим, поддерживает ли браузер HTML5 Notifications
    if (!("Notification" in window)) {
        alert('Ваш браузер не поддерживает HTML Notifications, его необходимо обновить.');
    }

// Проверим, есть ли права на отправку уведомлений
    else if (Notification.permission === "granted") {
// Если права есть, отправим уведомление
        var notification = new Notification(title, options);

        function clickFunc() {
            alert('Пользователь кликнул на уведомление');
        }

        notification.onclick = clickFunc;
    }

// Если прав нет, пытаемся их получить
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
// Если права успешно получены, отправляем уведомление
            if (permission === "granted") {
                var notification = new Notification(title, options);

            } else {
                alert('Вы запретили показывать уведомления'); // Юзер отклонил наш запрос на показ уведомлений
            }
        });
    } else {
// Пользователь ранее отклонил наш запрос на показ уведомлений
// В этом месте мы можем, но не будем его беспокоить. Уважайте решения своих пользователей.
    }
}