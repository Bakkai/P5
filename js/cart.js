import { articles } from './script.js';
// displayShoppingCard();

const cart = [];

document.addEventListener('DOMContentLoaded', async () => {
  const listItems = await articles();

  storageToCart();
  //insertion des éléments du localStorage dans l'array cart
  function storageToCart() {
    const numberOfItems = localStorage.length;
  
    for (let i = 0; i < numberOfItems; i++) {
      const item = localStorage.getItem(localStorage.key(i));
      const itemObject = JSON.parse(item);
      const itemSource = listItems.find(
        (element) => element._id === itemObject.id
      );
  
      itemObject.price = itemSource.price;
      cart.push(itemObject);
    }
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
          <img src="${item.img}" alt="${item.name}">
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
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.qty}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>
    `
    cartItems.appendChild(cartItem);
  }

  // Add event listeners after rendering cart items
  updatePriceAndQuantity();
  deleteItem();
  displayTotalPrice();
  displayTotalQuantity ();

}


// Calculate and display the total quantity of items in the cart
function displayTotalQuantity() {
  const totalqty = document.getElementById('totalQuantity');
  let total = 0;

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    total += parseFloat(item.qty);
  }

  totalqty.innerHTML = total;
}

// Calculate and display the total price of items in the cart
function displayTotalPrice() {
  const totalPrice = document.getElementById('totalPrice');
  let total = 0;

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    total += parseFloat(item.price) * parseFloat(item.qty);
  }

  totalPrice.innerHTML = total.toFixed(2); // Display the total price with two decimal places
}

// Update quantity and total price dynamically based on user input
function updatePriceAndQuantity() {
  const setValue = document.querySelectorAll('.cart__item__content__settings__quantity input');

  for (let i = 0; i < setValue.length; i++) {
    setValue[i].addEventListener('change', function () {
      const item = cart[i];
      const key = item.id + "-" + item.color;
      item.qty = setValue[i].value;
      localStorage.setItem(key, JSON.stringify(item));
      displayTotalPrice();
      displayTotalQuantity();
    });
  }
}

// Remove an item from the cart
function deleteItem() {
  const deleteItem = document.querySelectorAll('.deleteItem');

  for (let i = 0; i < deleteItem.length; i++) {
    deleteItem[i].addEventListener('click', function () {
      const item = cart[i];
      const key = item.id + "-" + item.color;
      cart.splice(i, 1);
      localStorage.removeItem(key);
      displayCartHTML(); // Update the displayed cart after deletion
      storageToCart();
      displayTotalPrice();
      displayTotalQuantity();
      location.reload();
    });
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

    checkPrenom(firstName);

    checkNom(lastName);

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

// Vérifie que le prénom est valide
function checkPrenom(firstName) {
    const regex = /^[a-zA-Z ]+$/;
    if (firstName != '' && !regex.test(firstName)) {
      alert('Veuillez entrer un prénom valide');
      throw new Error('Prenom is not valid');
    }
  }
  
  // Vérifie que le nom est valide
  function checkNom(lastName) {
    const regex = /^[a-zA-Z ]+$/;
    if (lastName != '' && !regex.test(lastName)) {
      alert('Veuillez entrer un nom valide');
      throw new Error('Nom is not valid');
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
