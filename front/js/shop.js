const url = "http://localhost:3000/api/cameras/"; // API's URL
let panier = localStorage.getItem('panier', null);
        if (panier == null) {
            panier = [];
        } else {
            panier = JSON.parse(panier);
        }
const item = panier.map(id => {
    return fetch(url + id).then(response => {
        return response.json();
    });
}); 

Promise.all(item)
    .then(function(data) {
        console.log(data);

        for (var i=0; i < data.length; i++) {
            console.log(data[i].name);
            
            let image = document.querySelector('.shopImg');
            image.src = data[i].imageUrl;

            let name = document.querySelector('.item-name');
            name.textContent = data[i].name;

            let price = document.querySelector('.item-price');
            price.textContent = data[i].price/100 + "€";
        }
       
    });

const btnValidate = document.querySelector('.validate');
btnValidate.addEventListener('click', () => {
    btnValidate.href = "form.html";
});


