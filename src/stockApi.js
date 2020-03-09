function searchInfoByTicker(ticker){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.tdameritrade.com/v1/instruments?apikey=REY6WQ6X1PVAWABH7BURGNZCVOQF7XRT&symbol=${ticker}&projection=symbol-search`, false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();

    let response;
    if (xhr.status === 200){
        response = JSON.parse(xhr.response);
        response = Object.values(response);
    } else {
        response = 'not found';
    }

    return response;
}

function getCurrentDataByTicker(ticker){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.tdameritrade.com/v1/marketdata/${ticker}/quotes?apikey=REY6WQ6X1PVAWABH7BURGNZCVOQF7XRT`, false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();

    let response;
    if (xhr.status === 200){
        response = JSON.parse(xhr.response);
        response = Object.values(response);
    } else {
        response = 'not found';
    }

    return response;
}