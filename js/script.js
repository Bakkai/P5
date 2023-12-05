const url = 'http://localhost:3000/api/products/';

export const articles = async () => {
  return fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      return data;
    });
};

const container = document.getElementById('items');

const theArticles = async () => {
  const listArticle = await articles();
  if(container){
    container.innerHTML =''
      listArticle.forEach((element) => {
        container.innerHTML += `
          <a href="./product.html?id=${element._id}">
            <article>
              <img src="${element.imageUrl}" alt="${element.altTxt}">
              <h3 class="productName">${element.name}</h3>
              <p class="productDescription">${element.description}</p>
            </article>
          </a>
        `;
      });
  }
};

theArticles();
