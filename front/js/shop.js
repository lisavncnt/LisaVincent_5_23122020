const url = "http://localhost:3000/api/cameras/"; // API's URL
let panier = localStorage.getItem('panier', null);
        if (panier == null) {
            panier = [];
        } else {
            panier = JSON.parse(panier);
        }
const toto = panier.map(id => {
    return fetch(url + id).then(response => {
        return response.json();
    });
}); 

Promise.all(toto).then(data => {
    console.log(data);
});