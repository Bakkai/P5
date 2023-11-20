//recuperation de l'id du produit dans l'url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('id');
console.log(productId);
//récupérartion des données du produit dans l'api grace à l'id
fetch(`http://localhost:3000/api/products/${productId}`)
    .then(res => res.json())
    .then(result => displayItemHTML(result))



//affichage du produit dans l' html
function displayItemHTML(canape) {
    console.log(canape);
    const prodImgUrl = document.querySelector('.item__img');
    const prodName = document.querySelector('#title');
    const prodPrice = document.querySelector('#price');
    const prodDesc = document.querySelector('#description');
    const prodColor = document.querySelector('#colors');
    prodImgUrl.innerHTML = `<img src="${canape.imageUrl}" alt="${canape.altTxt}">`
    prodName.innerHTML = `${canape.name}`
    prodPrice.innerHTML = `${canape.price}`
    prodDesc.innerHTML = `${canape.description}`
    canape.colors.forEach(color => {
        prodColor.innerHTML += `<option value="${color}">${color}</option>`
    })

}


sendToStorage();
//verification de la quantité et de la couleur puis envoi au local storage
function sendToStorage() {
    const button = document.querySelector('#addToCart');
    button.addEventListener('click', () => {
      const color = document.querySelector('#colors').value;
      const qty = document.querySelector('#quantity').value;
      const price = document.querySelector('#price').innerHTML;
      const name = document.querySelector('#title').innerHTML;
      const img = document.querySelector('.item__img').innerHTML;
      const id = productId;
      const cart = {
        id: id,
        name: name,
        price: price,
        img: img,
        color: color,
        qty: qty,
      };
      checkRequired(color, qty)
      const key = cart.id + "-" + cart.color;
      console.log(cart);
      if (localStorage.getItem(key) !== null) {
        alert("Ce produit est déjà dans votre panier");
      } else {
        localStorage.setItem(key, JSON.stringify(cart));
      }
      window.location.href = 'index.html';
    })
  }
// function sendToStorage() {
//     const button = document.querySelector('#addToCart');
//     button.addEventListener('click', () => {
//       const color = document.querySelector('#colors').value;
//       const qty = document.querySelector('#quantity').value;
//       const price = document.querySelector('#price').innerHTML;
//       const name = document.querySelector('#title').innerHTML;
//       const img = document.querySelector('.item__img').innerHTML;
//       const id = productId;
//       const cart = {
//         id: id,
//         name: name,
//         price: price,
//         img: img,
//         color: color,
//         qty: qty,
//       };
//       checkRequired(color, qty)
//       const key = cart.id + "-" + cart.color;
//       console.log(cart);
//       if (localStorage.getItem(key) !== null) {
//         const existingCart = JSON.parse(localStorage.getItem(key));
//         const newQty = existingCart.qty + cart.qty;
//         existingCart.qty = newQty;
//         localStorage.setItem(key, JSON.stringify(existingCart));
//       } else {
//         localStorage.setItem(key, JSON.stringify(cart));
//       }
//       window.location.href = 'index.html';
//     })
//   }  

//verification de la couleur et de la quantité
function checkRequired(color, qty) {
    if (color == null || color == "" || qty == null || qty == "" || qty < 1 || qty > 100) 
    { alert("Choisissez une couleur et une quantité entre 1 et 100"); 
throw new Error("Choisissez une couleur et une quantité entre 1 et 100"); }
}
