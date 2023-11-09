// const url = "http://localhost:3000/api/products/";

// // Récupération des données du panier depuis le stockage local
// const cartItems = JSON.parse(localStorage.getItem("addToCart")) || [];

// // Sélection de la section du panier où nous afficherons les éléments du panier
// const cartItemsSection = document.getElementById("cart__items");

// function displayShoppingCard() {
//   // Parcours des articles du panier
//   cartItems.forEach(async (cardItem) => {
//     // Récupération des données du produit
//     const product = await getProduct(cardItem.id);

//     // Création de l'élément de l'article
//     const item = { ...cardItem, imageUrl: product?.imageUrl };

//     // Ajout de l'élément de l'article au DOM
//     cartItemsSection.innerHTML += renderCardUI(item);
//   });

//   // Calculez le total et affichez-le
//   const totalQuantityElement = document.getElementById("totalQuantity");
//   const totalPriceElement = document.getElementById("totalPrice");

//   let totalQuantity = 0;
//   let totalPrice = 0;

//   cartItems.forEach((item) => {
//     totalQuantity += parseInt(item.quantity, 10);
//     totalPrice += parseFloat(item.price) * parseInt(item.quantity, 10);
//   });

//   // Mettez à jour le prix total dans le DOM
//   totalPriceElement.textContent = `${totalPrice.toFixed(2)} €`;
// }

// // Fonction pour obtenir les données du produit
// const getProduct = async (idPruct) => {
//   const response = await fetch(url + "/" + idPruct);
//   const product = await response.json();
//   return product;
// };

// // Fonction pour afficher l'interface utilisateur de l'article
// const renderCardUI = (item) => {
//   return `<article class="cart__item" data-id="${item.id}" data-color="${item.color}">
//                 <div class="cart__item__img">
//                     <img alt="Photographie de ${item.name}" src="${item.imageUrl}"/>
//                     <div class="cart__item__content">
//                         <div class="cart__item__content__description">
//                             <h2>${item.name}</h2>
//                             <p>${item.color}</p>
//                             <p>${item.price} €</p>
//                         </div>
//                         <div class="cart__item__content__settings">
//                             <div class="cart__item__content__settings__quantity">
//                             <label>Quantité</label>
//                             <input class="itemQuantity" type="number" name="itemQuantity" min="1" max="100" value="${item.quantity}"/>
//                             </div>
//                         </div>
//                         <div class="cart__item__content__settings__delete">
//                             <button class="deleteItem">Supprimer</button>
//                         </div>
//                     </div>
//                 </div>
//             </article>
//     `;
// };

// displayShoppingCard();

const cart = []



storageToCart();
//insertion des éléments du localStorage dans l'array cart
function storageToCart() {
  const numberOfItems = localStorage.length;
  console.log(numberOfItems);
  for (let i = 0; i < numberOfItems; i++) {
    const item = localStorage.getItem(localStorage.key(i));
    const itemObject = JSON.parse(item);
    cart.push(itemObject);
  }
  console.log(cart);

}




displayCartHTML();
//créatiion de l'article HTML en fonction des entrées de l'array cart
function displayCartHTML() {
  const cartItems = document.getElementById('cart__items');
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    const cartItem = document.createElement('div');
    cartItem.innerHTML = `
    <article class="cart__item" data-id="${item.id}" data-color="${item.color}">
    <div class="cart__item__img">
      <img ${item.img}
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${item.name}</h2>
        <p>${item.color}</p>
        <p>${item.price}€</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Quantité : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${item.qty}>
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
    `;
    cartItems.appendChild(cartItem);

  }


}





displayTotalQuantity();
//calcule la quantité total en fonction des entrées de l'array cart
function displayTotalQuantity() {
  const totalqty = document.getElementById('totalQuantity');
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    total += parseFloat(item.qty);
  }
  totalqty.innerHTML = total;
}






displayTotalPrice();
// affiche le prix total
function displayTotalPrice() {
  const totalPrice = document.getElementById('totalPrice');
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    total += parseFloat(item.price) * parseFloat(item.qty);
  }
  totalPrice.innerHTML = total;
}






updatePriceAndQuantity();
// Modifie la quantité et le prix total d'un item après la detection d'un changement au niveau du selecteur de quantité sur l'item
function updatePriceAndQuantity() {
  const setValue = document.querySelectorAll('.cart__item__content__settings__quantity input');
  for (let i = 0; i < setValue.length; i++) {
    setValue[i].addEventListener('change', function () {
      const item = cart[i];
      const key = item.id + "-" + item.color
      item.qty = setValue[i].value;
      localStorage.setItem(key, JSON.stringify(item));
      displayTotalPrice();
      displayTotalQuantity();
    })
  }
}







deleteItem();
// Efface un item du panier
function deleteItem() {
  const deleteItem = document.querySelectorAll('.deleteItem');
  for (let i = 0; i < deleteItem.length; i++) {
    deleteItem[i].addEventListener('click', function () {
      const item = cart[i];
      const key = item.id + "-" + item.color
      cart.splice(i, 1);
      localStorage.removeItem(key);
      displayCartHTML();
      storageToCart();
      displayTotalPrice();
      displayTotalQuantity();
      location.reload();
      console.log(cart);
    })
  }
}






orderForm();
// Au clic sur le bouton d'envoi de la commande, on vérifie que les champs sont remplis corectement et on envoie la commande au serveur
function orderForm() {
  const orderBtn = document.getElementById('order');
  orderBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (cart.length === 0) { alert('Votre panier est vide'); return; }
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;

    checkForm(firstName, lastName, email, address, city);

    checkEmail(email);

    makeOrder(firstName, lastName, email, address, city);
  })
}






// Envoie des donnees au serveur
function makeOrder(firstName, lastName, email, address, city) {
  const ids = [];

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    ids.push(item.id);
  }
  const body = {
    contact: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      address: address,
      city: city,
    },
    products: ids,
  }
  
  fetch('http://localhost:3000/api/products/order', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => res.json())
    .then((data) => {
      const orderId = data.orderId;
      window.location.href = 'confirmation.html' + '?orderId=' + orderId;
      return console.log(data)

    })
    .catch((err) => console.log(err));

}






// Vérifie que les champs ne sont pas vides
function checkForm(firstName, lastName, email, address, city) {
  if (firstName === '' || lastName === '' || email === '' || address === '' || city === '') {
    alert('Veuillez remplir tous les champs');
    throw new Error('Veuillez remplir tous les champs');
  }
}




// Vérifie que l'email est valide
function checkEmail(email) {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email != '' && !regex.test(email)) {
    alert('Veuillez entrer une adresse email valide');
    throw new Error('Email is not valid');
  }
}