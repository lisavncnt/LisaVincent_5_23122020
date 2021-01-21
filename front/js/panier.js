const panier = async function () {
    if (localStorage.getItem('panier') === null) { 
        document.querySelector('.inShop span').textContent = 0;
   } else {
       
       var items = JSON.parse(localStorage.getItem('panier'));
       document.querySelector('.inShop span').textContent = items.length;
   }
}

panier();