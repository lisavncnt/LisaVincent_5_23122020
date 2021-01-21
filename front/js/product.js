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

            let cart = document.querySelector('.add-cart');

            let productNumbers = localStorage.getItem('cartNumbers');

            if ( productNumbers) {
                document.querySelector('.cart span').textContent;
            }
              
            function addCart() {
                         

                if (localStorage.getItem('panier') === null) { 
                    document.querySelector('.inShop span').textContent = 1;
                    //si la clé 'panier' n'est pas trouvée dans le localStorage
                    var items = [];
                    items.push(data._id);
                    localStorage.setItem('panier', JSON.stringify(items));
                    //créer un tableau 'items' 
                    //ajouter l'id sélectionné dans le tableau 'items'
                    //ajouter dans le localStorage une nouvelle clé 'panier' avec le nouveau tableau 'items'
               } else {
                   
                   //si la clé 'panier' est trouvée dans le localStorage
                   var items = JSON.parse(localStorage.getItem('panier'));
                   
                   //récupérer dans un JSON.parse les valeurs de la clé 'panier'
                   if (!items.includes(data._id)) {
                    items.push(data._id);
                    document.querySelector('.inShop span').textContent = items.length;
                    localStorage.setItem('panier', JSON.stringify(items));
                   //si le tableau 'items' ne contient pas l'id sélectionné
                   //ajouter l'id sélectionné au tableau 'items'
                   //ajouter le nouveau tableau dans le localStorage
                   }  
                }
            };

            cart.addEventListener('click', addCart, true);
            //quand un click survient sur le bouton, exécutez la fonction addCart     

        } else { // error message if the API is not retrieved
            console.error('Retour du serveur : ' + response.status);
        }
    } catch (e) {
        console.log(e);
    }
}
camera();
