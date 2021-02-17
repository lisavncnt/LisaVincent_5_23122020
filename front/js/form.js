console.log(JSON.parse(localStorage.getItem('panier')));

function createOrder() {

    let first_name_input = document.getElementById('firstName');
    let last_name_input = document.getElementById('lastName');
    let email_input = document.getElementById('email');
    let address_input = document.getElementById('address');
    let city_input = document.getElementById('city');
    
    var my_regex_name = /^[a-zA-Z-\s]+$/;
    var my_regex_email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var my_regex_address = /^[0-9a-zA-Z-\s]+$/;

    var countError = 0;
    
    if (first_name_input.value.trim() == "") {
        let error = document.getElementById('first_name_error');
        error.innerHTML = "Veuillez renseigner votre prénom !";
        error.style.color = 'red';
        countError = countError +1;
    } else if (my_regex_name.test(first_name_input.value) == false) {
        let error = document.getElementById('first_name_error');
        error.innerHTML = "Votre prénom ne doit comporter que des lettres (et un tiret si besoin).";
        error.style.color = 'red';
        countError = countError +1;
    }
    
    if (last_name_input.value.trim() == "") {
        let error = document.getElementById('last_name_error');
        error.innerHTML = "Veuillez renseigner votre nom de famille !";
        error.style.color = 'red';
        countError = countError +1;
    } else if (my_regex_name.test(last_name_input.value) == false) {
        let error = document.getElementById('last_name_error');
        error.innerHTML = "Votre nom ne peut comporter que des lettres (et un tiret si besoin).";
        error.style.color = 'red';
        countError = countError +1;
    }
    
    if (email_input.value.trim() == "") {
        let error = document.getElementById('email_error');
        error.innerHTML = "Veuillez renseigner votre email !";
        error.style.color = 'red';
        countError = countError +1;
    } else if (my_regex_email.test(email_input.value) == false) {
        let error = document.getElementById('email_error');
        error.innerHTML = "Votre email doit se composer de lettres, chiffres accompagnés d'un @ et se finir par .(com)";
        error.style.color = 'red';
        countError = countError +1;
    }
    
    if (address_input.value.trim() == "") {
        let error = document.getElementById('address_error');
        error.innerHTML = "Veuillez renseigner une adresse de livraison.";
        error.style.color = 'red';
        countError = countError +1;
    } else if (my_regex_address.test(address_input.value) == false) {
        let error = document.getElementById('address_error');
        error.innerHTML = "Votre addresse complète doit avoir un numéro et un nom de rue.";
        error.style.color = 'red';
        countError = countError +1;
    }
    
    if (city_input.value.trim() == "") {
        let error = document.getElementById('city_error');
        error.innerHTML = "Veuillez renseigner une ville !";
        error.style.color = 'red';
        countError = countError +1;
    } else if (my_regex_address.test(city_input.value) == false) {
        let error = document.getElementById('city_error');
        error.innerHTML = "Le nom de votre ville ne doit comporter que des lettres (et peut être accompagné d'un tiret).";
        error.style.color = 'red';
        countError = countError +1;
    }

    if (countError != 0) {
        return ;
    }

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
        addressConfirm.innerHTML = "Elle sera envoyée au " + address + " à " + city;
        msgOrder.innerHTML = "Le numéro de votre commande est : " + data.orderId;

        let items = JSON.parse(localStorage.getItem('panier'));
        document.querySelector('.inShop span').textContent = items.length;
        console.log(data.orderId);
        localStorage.clear('panier'); 
    });
}

var formBtn = document.getElementById('formBtn');
formBtn.addEventListener('click', createOrder, true);