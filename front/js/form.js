let product_id = JSON.parse(localStorage.getItem('panier'));

let order = {
    basket : product_id,
    contact : {
        firstname : document.getElementById('firstName').placeholder,
        lastname : document.getElementById('lastName').placeholder,
        address : document.getElementById('address').placeholder,
        city : document.getElementById('city').placeholder,
        mail : document.getElementById('email').placeholder,
    }
};

function createOrder() {
    console.log('Posting request to fetch API...');
    fetch("http://localhost:3000/api/cameras/order/", {
        method : 'POST',
        body : JSON.stringify(order)
    }).then(function (response) {
        return response.json();
    }).then(function(data) {
        console.log(data.order_id);
    });
}


var formBtn = document.getElementById('formBtn');
formBtn.addEventListener('click', createOrder, true);

console.log(order);

//let form1 = document.querySelector('#form1');

//form1.addEventListener('submit', function(e) {
    
//    let inputs = document.querySelectorAll('input');
//    let myRegex = /^[0-9a-zA-Z-\s]+$/;
//    if (inputs.value.trim() == "") {
//        let error = document.getElementById('error');
//        error.innerHTML = "Le champ est requis";
//        error.style.color = 'red';
//        e.preventDefault();
//    } else if (myRegex.text(inputs.value) == false) {
//        let error = document.getElementById('error');
//        error.innerHTML = "Le champs doit comporter des lettres, des tirets ou des chiffres uniquements";
//        error.style.color = 'red';
//        e.preventDefault();
//    }
//});
