
// Récupération de l'ID à partir de l'URL
const params = new URL(document.location).searchParams;
console.log(document.location)
const id = params.get("id");

// Construction de l'URL de l'API
const url = `http://localhost:3000/api/products/${id}`;

// Fonction pour afficher les détails du produit
const displayProductDetails = () => {
  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);

      // Affichage du nom du produit
      document.getElementById("title").innerHTML = data.name;

      // Affichage du prix du produit
      document.getElementById("price").innerHTML = data.price;

      // Affichage de l'image du produit
      const addImg = document.createElement("img");
      addImg.setAttribute("src", data.imageUrl);
      document.querySelector(".item__img").appendChild(addImg);

      // Affichage de la description du produit
      document.getElementById("description").innerHTML = data.description;

      // Affichage des options de couleur du produit
      const addOption = document.getElementById("colors");
      data.colors.forEach((color) => {
        const option = document.createElement("option");
        option.value = color;
        option.text = color;
        addOption.appendChild(option);
      });
    });
};

// Écouteur d'événement pour ajouter le produit au panier
const addToCart = document.getElementById("addToCart");
addToCart.addEventListener("click", () => {
  const addProduct = {
    quantity: document.getElementById("quantity").value,
    color: document.getElementById("colors").value,
    id: id,
  };

  let addProductLocalStorage = [];

  if (localStorage.getItem("addToCart") !== null) {
    addProductLocalStorage = JSON.parse(localStorage.getItem("addToCart"));
  }

  addProductLocalStorage.push(addProduct);
  localStorage.setItem("addToCart", JSON.stringify(addProductLocalStorage));
});

// Appeler la fonction pour afficher les détails du produit
displayProductDetails();