
// // Récupération de l'ID à partir de l'URL
// const params = new URL(document.location).searchParams;
// console.log(document.location)
// const id = params.get("id");

// // Construction de l'URL de l'API
// const url = `http://localhost:3000/api/products/${id}`;

// // Fonction pour afficher les détails du produit
// const displayProductDetails = () => {
//   fetch(url)
//     .then(function (res) {
//       return res.json();
//     })
//     .then(function (data) {
//       console.log(data);

//       // Affichage du nom du produit
//       document.getElementById("title").innerHTML = data.name;

//       // Affichage du prix du produit
//       document.getElementById("price").innerHTML = data.price;

//       // Affichage de l'image du produit
//       const addImg = document.createElement("img");
//       addImg.setAttribute("src", data.imageUrl);
//       document.querySelector(".item__img").appendChild(addImg);

//       // Affichage de la description du produit
//       document.getElementById("description").innerHTML = data.description;

//       // Affichage des options de couleur du produit
//       const addOption = document.getElementById("colors");
//       data.colors.forEach((color) => {
//         const option = document.createElement("option");
//         option.value = color;
//         option.text = color;
//         addOption.appendChild(option);
//       });
//     });
// };

// // Écouteur d'événement pour ajouter le produit au panier
// const addToCart = document.getElementById("addToCart");
// addToCart.addEventListener("click", () => {
//   const addProduct = {
//     quantity: document.getElementById("quantity").value,
//     color: document.getElementById("colors").value,
//     id: id,
//   };

//   let addProductLocalStorage = [];

//   if (localStorage.getItem("addToCart") !== null) {
//     addProductLocalStorage = JSON.parse(localStorage.getItem("addToCart"));
//   }

//   addProductLocalStorage.push(addProduct);
//   localStorage.setItem("addToCart", JSON.stringify(addProductLocalStorage));
// });

// function checkRequired(color, quantity) {
//     if (color == null || color == "" || quantity == null || quantity == "") 
//     { alert("Choisissez une couleur et une quantité"); 
// throw new Error("Choisissez une couleur et une quantité"); }
// }   
// // Appeler la fonction pour afficher les détails du produit
// displayProductDetails();
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
        const quantity = document.querySelector('#quantity').value;
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
            quantity: quantity,
        }
        checkRequired(color, quantity)
        const key = cart.id + "-" + cart.color
        console.log(cart);
        localStorage.setItem(key, JSON.stringify(cart));
        window.location.href = 'index.html';
    })

}
//verification de la couleur et de la quantité
function checkRequired(color, quantity) {
    if (color == null || color == "" || quantity == null || quantity == "") 
    { alert("Choisissez une couleur et une quantité"); 
throw new Error("Choisissez une couleur et une quantité"); }
}   