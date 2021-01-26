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
        var section = document.getElementById('shop');

        data.forEach(element => {
            var article = document.createElement('article');

            var div1 = document.createElement('div');
            div1.classList.add("prod");
            var image = document.createElement('img');
            image.src = element.imageUrl;
            var name = document.createElement('h2');
            name.innerHTML = element.name;

            var div2 = document.createElement('div');
            div2.classList.add("price");
            var price = document.createElement('h2');
            price.innerHTML = element.price/100 + ' €';

            var div3 = document.createElement('div');
            div3.classList.add("quantity");
            var quantity = document.createElement('h2');
            quantity.innerHTML = element.quantity;            

            var div4 = document.createElement('div');
            div4.classList.add("total");
            var total = document.createElement('h2');
            total.innerHTML = price * quantity;
            
            article.appendChild(div1);
            article.appendChild(div2);
            article.appendChild(div3);
            article.appendChild(div4);

            div1.appendChild(image);
            div1.appendChild(name);

            div2.appendChild(price);
            div3.appendChild(quantity);
            div4.appendChild(total);

            section.appendChild(article);
        });
    }) 

const btnValidate = document.querySelector('.validate');
btnValidate.addEventListener('click', () => {
    btnValidate.href = "form.html";
});


