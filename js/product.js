const params = new URL (document.location).searchParams
const id = params.get("id")

const url=`http://localhost:3000/api/products/${id}`
const theArticles = () => {
    fetch(url)

}