const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');

const url = "http://localhost:3000/api/cameras/" + myParam; // URL de l'API

const camera = async function () { // récupération des produits de façon asynchrone
    try { // permet de vérifier que l'API a bien été récupérée
        let response = await fetch(url);
        if (response.ok) {
            let data = await response.json();
            console.log(data);
            let cardProduct = document.getElementById('product');
            cardProduct.getElementsByClassName('product-img')[0].src = data.imageUrl; 
            cardProduct.getElementsByClassName('product-title')[0].innerHTML = data.name;
            cardProduct.getElementsByClassName('product-price')[0].innerHTML = data.price/100 + "€";
            cardProduct.getElementsByClassName('product-description')[0].innerHTML = data.description;

            var lenses = data.lenses;
            var d = document.formLense.listLenses;
            for (var i = 0; i < lenses.length; i++) {
                d.length++;
                d.options[d.length-1].text = lenses[i];
            }

            document.getElementById('add-cart').addEventListener('click', function(event){

                if (localStorage.getItem('cart') !== null) {

                    var targetElement = event.target;
                    let productId = targetElement.dataset.product-id;
                    let cart = new Array();
                    cart.push(productId);

                    localStorage.setItem('cart', cart);
                } else {
                    let cart = localStorage.getItem('cart');
                    if (localStorage == 'cart') {
                        null
                    } else {
                        localStorage.setItem('cart', cart);
                    }
                }
            });
        } else { // message d'erreur si l'API n'a pas été récupérée correctement
            console.error('Retour du serveur : ' + response.status);
        }
    } catch (e) {
        console.log(e);
    }
}
camera();