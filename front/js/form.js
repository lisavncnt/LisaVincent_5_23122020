function createOrder() {
    console.log('Posting request to fetch API...');
    
    let order = {
        products : JSON.parse(localStorage.getItem('panier')),
        
        contact : {
            firstName : document.getElementById('firstName').value,
            lastName : document.getElementById('lastName').value,
            address : document.getElementById('address').value,
            city : document.getElementById('city').value,
            email : document.getElementById('email').value
        }
    };

    console.log(JSON.stringify(order));
    let headers = {
        "Content-Type" : "application/json"
    }
    
    fetch("http://localhost:3000/api/cameras/order", {
        method : 'POST',
        body : JSON.stringify(order),
        headers : headers,
    })
    .then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            console.log('Désolé, une erreur est survenue. Erreur ' + response.status)
            return response.status;
        }
    })
    .then(function(data) {
        let msgConfirm = document.querySelector('.msg_confirm');
        let addressConfirm = document.querySelector('.address_confirm');
        let address = document.getElementById('address').value;
        let city = document.getElementById('city').value;
        let msgOrder = document.querySelector('.orderId');
        msgConfirm.innerHTML = "Félicitation ! Votre commande est validée.";
        addressConfirm.innerHTML = "Elle sera envoyée au " + address + "à " + city;
        msgOrder.innerHTML = "Le numéro de votre commande est : " + data.orderId;

        console.log(data.orderId);
        localStorage.clear('panier');
    });
}

var formBtn = document.getElementById('formBtn');
formBtn.addEventListener('click', createOrder, true);


let form = document.querySelector('#form');

form.addEventListener('submit', function(e) {
    
    let inputs = document.querySelectorAll('input');
    let myRegex = /^[0-9a-zA-Z-\s]+$/;
    if (inputs.value.trim() == "") {
        let error = document.getElementById('error');
        error.innerHTML = "Le champ est requis";
        error.style.color = 'red';
        e.preventDefault();
    } else if (myRegex.text(inputs.value) == false) {
        let error = document.getElementById('error');
        error.innerHTML = "Le champs doit comporter des lettres, des tirets ou des chiffres uniquements";
        error.style.color = 'red';
        e.preventDefault();
    }
});