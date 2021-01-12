const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');

const url = "http://localhost:3000/api/cameras/" + myParam; // API's URL

const camera = async function () { // retrieval of items asynchronously
    try { // check if the API is well retrieved
        let response = await fetch(url);
        if (response.ok) {
            let data = await response.json();
            console.log(data);
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

            lenses.forEach(element => {
                
            })

            //document.querySelector('.add-cart').addEventListener('click', function(addCart){

            //    if (localStorage.getItem('cart') !== null) {
            //        var targetElement = addCart.target;
            //        let productID = targetElement.dataset.productId;
            //        let cart = new Array();
            //        cart.push(productID);
            //
            //        localStorage.setItem(cart, data._id)
            //    } else {
            //        let cart = localStorage.getItem('cart');
            //        if (localStorage.getItem('cart') == null) ) {
            //            console.log(cart)
            //        } else {
            //            localStorage.setItem(cart, data.name);
            //        }
            //    }
            //});


            // message to add items to the localStorage
            let cart = document.querySelector('.add-cart');
            function addCart() {
                let option = document.querySelector('#lenseChoice');
                let response = document.querySelector('.response');
                let showResponse = document.querySelector('.showResponse');
                response.appendChild(showResponse).innerHTML = "L'article a été ajouté au panier ! " + data.name + " " + lenses[i];

                
                if (localStorage !== null) {
                    var item = [];
                    $(document).on('click', addCart, function(cart) {
                        item.push(data._id);
                        localStorage.setItem(item, data.name);
                        console.log(item);
                    });
               } else {
                   localStorage.getItem(item, data.name);
                   console.log(item);
                    }
            }

            cart.addEventListener('click', addCart, true);        

        } else { // error message if the API is not retrieved
            console.error('Retour du serveur : ' + response.status);
        }
    } catch (e) {
        console.log(e);
    }
}
camera();
