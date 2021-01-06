const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');

const url = "http://localhost:3000/api/cameras/" + myParam; // URL de l'API

const camera = async function () { // récupération des produits de façon asynchrone
    try { // permet de vérifier que l'API a bien été récupérée
        let response = await fetch(url);
        if (response.ok) {
            let data = await response.json();
            console.log(data);
            data(element => {
                let product = document.getElementById('card-product');
                product.getElementsByClassName('card-title')[0].innerHTML = element.name;
            })
        
        } else { // message d'erreur si l'API n'a pas été récupérée correctement
            console.error('Retour du serveur : ' + response.status);
        }
    } catch (e) {
        console.log(e);
    }
}
camera();