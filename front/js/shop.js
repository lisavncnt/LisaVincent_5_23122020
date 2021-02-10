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
            article.classList.add("article");

            var div1 = document.createElement('div');
            div1.classList.add("prod");
            var image = document.createElement('img');
            image.src = element.imageUrl;
            var name = document.createElement('h2');
            name.innerHTML = element.name;

            var div2 = document.createElement('div');
            div2.classList.add("price");
            var price = document.createElement('h2');
            price.classList.add('itemPrice');
            price.innerHTML = element.price/100 + ' €';

            article.appendChild(div1);
            article.appendChild(div2);

            div1.appendChild(image);
            div1.appendChild(name);

            div2.appendChild(price);

            section.appendChild(article);
        });

        var priceList = $('#shop').find('.itemPrice');
        var totalPrice = 0;

        $.each(priceList, function(i, itemPrice) {
            totalPrice += parseInt($(itemPrice).text())
        });
        $('.total_price').text(totalPrice + "€");

    }) 

const btnValidate = document.querySelector('.validate');
btnValidate.addEventListener('click', () => {
    btnValidate.href = "form.html";
});


