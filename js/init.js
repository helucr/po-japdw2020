const CATEGORIES_URL = 'https://japdevdep.github.io/ecommerce-api/category/all.json';
const PUBLISH_PRODUCT_URL = 'https://japdevdep.github.io/ecommerce-api/product/publish.json';
const CATEGORY_INFO_URL = 'https://japdevdep.github.io/ecommerce-api/category/1234.json';
const PRODUCTS_URL = 'https://japdevdep.github.io/ecommerce-api/product/all.json';
const PRODUCT_INFO_URL = 'https://japdevdep.github.io/ecommerce-api/product/5678.json';
const PRODUCT_INFO_COMMENTS_URL = 'https://japdevdep.github.io/ecommerce-api/product/5678-comments.json';
const CART_INFO_URL = 'https://japdevdep.github.io/ecommerce-api/cart/987.json';
const CART_INFO_URL_DESAFIANTE = "https://japdevdep.github.io/ecommerce-api/cart/654.json"
const CART_BUY_URL = 'https://japdevdep.github.io/ecommerce-api/cart/buy.json';

var showSpinner = function() {
    document.getElementById('spinner-wrapper').style.display = 'block';
}

var hideSpinner = function() {
    document.getElementById('spinner-wrapper').style.display = 'none';
}

var getJSONData = function(url) {
    var result = {};
    showSpinner();
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function(response) {
            result.status = 'ok';
            result.data = response;
            hideSpinner();
            return result;
        })
        .catch(function(error) {
            result.status = 'error';
            result.data = error;
            hideSpinner();
            return result;
        });
}

function logOut() {
    localStorage.removeItem('user');
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener('DOMContentLoaded', function(e) {
    document.getElementsByClassName("container d-flex flex-column flex-md-row justify-content-between")[0].innerHTML +=
        `<div class="dropdown">
            <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                ${localStorage.getItem('user')}
             </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="my-profile.html">Mi perfil</a>
            <a class="dropdown-item" href="cart.html">Mi carrito</a>
            <a class="dropdown-item" href="cart.html" id='LogOut' onclick=logOut()>Cerrar Sesión</a>
        </div>
    </div>`
});