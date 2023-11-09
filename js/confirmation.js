const orderId = getOrderId();
displayOrderId(orderId);
clearSessionStorage();




//recupere l'id de la commande dans l'url
function getOrderId() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const orderId = urlParams.get('orderId');
    return orderId;
}



//affiche l'id de la commande dans l'html
function displayOrderId(orderID) {
    const orderIdElement = document.getElementById('orderId');
    orderIdElement.textContent = orderId;
}




//supprime toutes les données de la session storage
function clearSessionStorage() {
 const cache = window.localStorage;
 cache.clear();
}