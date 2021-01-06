const url = "http://localhost:3000/api/cameras"; // URL de l'API

const camerasElts = async function () { // récupération des produits de façon asynchrone
    try { // permet de vérifier que l'API a bien été récupérée
        let response = await fetch(url);
        if (response.ok) {
            let data = await response.json();
            data.forEach(element => {
                let card = document.getElementById('card-template'); // accès à la carte produit
                let cloneCard = card.cloneNode(true);
// Ajout des éléments du produits (img, nom, prix et description)
                cloneCard.getElementsByClassName('card-img')[0].src = element.imageUrl;     
                cloneCard.getElementsByClassName('card-title')[0].innerHTML = element.name;
                cloneCard.getElementsByClassName('card-price')[0].innerHTML = element.price/100 + '€';
                cloneCard.getElementsByClassName('description')[0].innerHTML = element.description;
                cloneCard.getElementsByClassName('card-link')[0].href = cloneCard.getElementsByClassName('card-link')[0].href + "?id=" + element._id;

                cloneCard.removeAttribute("id");
                document.getElementById('list').appendChild(cloneCard);
            });
            let card = document.getElementById('card-template');
            card.remove();
        } else { // message d'erreur si l'API n'a pas été récupérée correctement
            console.error('Retour du serveur : ' + response.status);
        }
    } catch (e) {
        console.log(e);
    }
}
camerasElts();