
    const webSocket = new WebSocket("wss://echo-ws-service.herokuapp.com");

    const input = document.querySelector('.main__wrapper_input');
    const sendBtn = document.querySelector('.main__wrapper_send-btn');
    const response = document.querySelector('.main__response');
    const locationBtn = document.querySelector('.main__wrapper_location-btn');


    function writeToScreen(message) {
        let chatMessage = document.createElement('p');
        chatMessage.innerHTML = message;
        response.appendChild(chatMessage);
    }

        webSocket.onopen = function (evt) {
            webSocket.send('Соединение установлено');
        };

        webSocket.onmessage = function (evt) {
            writeToScreen(evt.data);
        };

        webSocket.onclose = function (evt) {
            writeToScreen("Соединение завершилось, для продолжения перезагрузите страницу");
        };

    sendBtn.addEventListener('click', () => {
        let message = input.value;
        writeToScreen(message);
        webSocket.send(message);

        input.value = '';
    });

    input.addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) {
            sendBtn.click();
        }
    });

    locationBtn.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    const locationMessage = `<a href="https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}" target="_blank">Моя геолокация</a>`;
                    writeToScreen(locationMessage);
                },
                (error) => {
                    console.error('Ошибка геолокации:', error.message);
                }
            );
        } else {
            console.error('Ваш браузер не поддерживает геолокацию.');
        }
    });
