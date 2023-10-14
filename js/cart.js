const url="http://localhost:3000/api/products/"

// Récupération des données du panier depuis le stockage local
const cartItems = JSON.parse(localStorage.getItem("addToCart")) || [];

// Sélection de la section du panier où nous afficherons les éléments du panier
const cartItemsSection = document.getElementById("cart__items");

// Boucle à travers les éléments du panier et les afficher
cartItems.forEach(item => {
    const cartItem = document.createElement("article");
    cartItem.className = "cart__item";
    cartItem.setAttribute("data-id", item.id);
    cartItem.setAttribute("data-color", item.color);

    const cartItemImg = document.createElement("div");
    cartItemImg.className = "cart__item__img";
    const img = document.createElement("img");
    img.src = item.imageUrl; // Assurez-vous d'avoir l'URL de l'image du produit
    img.alt = `Photographie de ${item.name}`;
    cartItemImg.appendChild(img);

    const cartItemContent = document.createElement("div");
    cartItemContent.className = "cart__item__content";

    const cartItemContentDescription = document.createElement("div");
    cartItemContentDescription.className = "cart__item__content__description";
    const h2 = document.createElement("h2");
    h2.textContent = item.name;
    const pColor = document.createElement("p");
    pColor.textContent = item.color;
    const pPrice = document.createElement("p");
    pPrice.textContent = `${item.price} €`;
    cartItemContentDescription.appendChild(h2);
    cartItemContentDescription.appendChild(pColor);
    cartItemContentDescription.appendChild(pPrice);

    const cartItemContentSettings = document.createElement("div");
    cartItemContentSettings.className = "cart__item__content__settings";

    const cartItemContentSettingsQuantity = document.createElement("div");
    cartItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
    const pQuantity = document.createElement("p");
    pQuantity.textContent = "Qté :";
    const inputQuantity = document.createElement("input");
    inputQuantity.type = "number";
    inputQuantity.className = "itemQuantity";
    inputQuantity.name = "itemQuantity";
    inputQuantity.min = "1";
    inputQuantity.max = "100";
    inputQuantity.value = item.quantity;
    cartItemContentSettingsQuantity.appendChild(pQuantity);
    cartItemContentSettingsQuantity.appendChild(inputQuantity);

    const cartItemContentSettingsDelete = document.createElement("div");
    cartItemContentSettingsDelete.className = "cart__item__content__settings__delete";
    const pDeleteItem = document.createElement("p");
    pDeleteItem.className = "deleteItem";
    pDeleteItem.textContent = "Supprimer";
    cartItemContentSettingsDelete.appendChild(pDeleteItem);

    cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
    cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

    cartItemContent.appendChild(cartItemContentDescription);
    cartItemContent.appendChild(cartItemContentSettings);

    cartItem.appendChild(cartItemImg);
    cartItem.appendChild(cartItemContent);

    cartItemsSection.appendChild(cartItem);
});

// Calculez le total et affichez-le
const totalQuantityElement = document.getElementById("totalQuantity");
const totalPriceElement = document.getElementById("totalPrice");

let totalQuantity = 0;
let totalPrice = 0;

cartItems.forEach(item => {
    totalQuantity += parseInt(item.quantity, 10);
    totalPrice += parseFloat(item.price) * parseInt(item.quantity, 10);
});

totalQuantityElement.textContent = totalQuantity;
totalPriceElement.textContent = `${totalPrice.toFixed(2)} €`;
