const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');

const url = "http://localhost:3000/api/cameras/" + myParam; // API's URL

const camera = async function () { // retrieval of items asynchronously
    try { // check if the API is well retrieved
        let response = await fetch(url);
        if (response.ok) {
            let data = await response.json();
            
            let cardProduct = document.getElementById('product');
            cardProduct.getElementsByClassName('product-img')[0].src = data.imageUrl; 
            cardProduct.getElementsByClassName('product-title')[0].innerHTML = data.name;
            cardProduct.getElementsByClassName('product-price')[0].innerHTML = data.price/100 + "€";
            cardProduct.getElementsByClassName('product-description')[0].innerHTML = data.description;

            // list of the lenses option
            var lenses = data.lenses;
            var d = document.formLense.listLenses;
            for (var i = 0; i < lenses.length; i++) {
                d.length++;
                d.options[d.length-1].text = lenses[i];
            }

            let cart = document.querySelector('.add-cart'); //sélectionné le btn add-cart

            let productNumbers = localStorage.getItem('cartNumbers');

            if ( productNumbers) {
                document.querySelector('.cart span').textContent;
            }
              
            function addCart() {
                if (localStorage.getItem('panier') === null) { //si la clé 'panier' n'est pas trouvée dans le localStorage
                    document.querySelector('.inShop span').textContent = 1; //ajouter 1 à l'icone panier
                    var items = []; //créer un tableau 'items' 
                    items.push(data._id); //ajouter l'id sélectionné dans le tableau 'items'
                    localStorage.setItem('panier', JSON.stringify(items)); //ajouter dans localStorage une clé 'panier' avec le tableau 'items'
                    cart.textContent = "Retirer du panier"; //changer la valeur du bouton par "Retirer";
                    
               } else {
                   var items = JSON.parse(localStorage.getItem('panier')); //sinon récupérer dans un JSON.parse les valeurs de la clé 'panier'
                   
                   if (!items.includes(data._id)) { //si le tableau 'items' ne contient pas l'id sélectionné
                    items.push(data._id); //ajouter l'id sélectionné au tableau 'items'
                    document.querySelector('.inShop span').textContent = items.length;
                    localStorage.setItem('panier', JSON.stringify(items)); //ajouter le nouveau tableau dans le localStorage
                    cart.textContent = "Retirer du panier";   
                    }  
                }
            };

            function removeCard () {
                var items = JSON.parse(localStorage.getItem('panier'));
                if (items.includes(data._id)) {
                    items.splice(data._id);
                    localStorage.setItem('panier', JSON.stringify(items));
                    document.querySelector('.inShop span').textContent = items.length;
                }
            }

        if (cart.textContent === "Ajouter au panier") {
            cart.addEventListener('click', addCart, true);
        } else if (cart.textContent === "Retirer du panier") {
            cart.addEventListener('click', removeCard, true);
        } else {
            return ;
        }

        } else { // error message if the API is not retrieved
            console.error('Retour du serveur : ' + response.status);
        }
    } catch (e) {
        console.log(e);
    }
}
camera();

function initBtnPanier () {
    if (localStorage.getItem('panier') === null) { 
        return ;
    }
    var items = JSON.parse(localStorage.getItem('panier'));

    if (items.includes(myParam)) { 
        let cart = document.querySelector('.add-cart');
        cart.textContent = "Retirer du panier";   
    }
}

initBtnPanier();