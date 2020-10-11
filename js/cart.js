let arrayArticles = [];
let allSubtotals = 0;
let rateUSD = 40;

/* esta funcion recibe un producto y devuelve el costo total segun su precio unitario y la cantidad a comprar, si el valor está en pesos utilizando rateUSD se convierte el precio a Dólares */
function subtotalPrice(count, index) {
    let sub = 0;
    if (arrayArticles[index].currency === "UYU") {
        sub = (arrayArticles[index].unitCost * count) / rateUSD;

    } else {
        sub = arrayArticles[index].unitCost * count;
    }
    return sub;
}

/* Función que actualiza los subtotales al cambiar los valores de los input (cantidad de articulos a comprar) */
function updateAllSubTotal() {
    let subtotalArray = document.getElementsByClassName("countArticle"); /* Se genera un array con los inputs (uno para cada artículo) */
    let subtotal = 0;
    for (let i = 0; i < subtotalArray.length; i++) {
        subtotal += subtotalPrice(subtotalArray[i].value, i); /* se recorre el array y del se toma  el valor de cada articulo en funcion de su index (i) y se agregar a subtotal*/
    }
    document.getElementById("subtotalCost").innerHTML = "USD " + subtotal; /* se modifica el subtotal general */
    allSubtotals = subtotal;
    totalPrice();

}

function shippingCost() {

}

function totalPrice() {
    let total = allSubtotals;
    document.getElementById("totalCost").innerHTML = "USD " + total;
}

function addEventCount() {
    let subtotalArray = document.getElementsByClassName("countArticle"); /* Se genera un array con los inputs (uno para cada artículo) */

    for (let i = 0; i < subtotalArray.length; i++) {
        subtotalArray[i].addEventListener("change", function() {
            if (arrayArticles[i].currency === "UYU") {
                document.getElementById("productSubtotal-" + i).innerHTML = "USD " + subtotalArray[i].value * arrayArticles[i].unitCost / rateUSD;
            } else {
                document.getElementById("productSubtotal-" + i).innerHTML = arrayArticles[i].currency + " " + subtotalArray[i].value * arrayArticles[i].unitCost;
            }

            updateAllSubTotal();
            calcTotal();

        });

    }


}


function showCartArticles(articles) {
    let HTMLcont = "";
    let articlePriceUSD = 0;
    for (i = 0; i < articles.length; i++) {

        /* si precio está en pesos cambiar a dólares */
        if (articles[i].currency === "UYU") {
            articlePriceUSD = articles[i].unitCost / rateUSD
        } else {
            articlePriceUSD = articles[i].unitCost
        }

        HTMLcont += `
        <tr>
        <td scope="col"><img src='${articles[i].src}' width="50px"></td>
        <td scope="col">${articles[i].name}</td>
        <td scope="col"> USD ${articlePriceUSD}</td>
        <td scope="col"><input class="form-control countArticle" style="width:60px;" type="number" id="productCount-${i}" value="${articles[i].count}" min="1"></td>
        <td scope="col"><span id="productSubtotal-${i}" style="font-weight:bold;"> USD ${articlePriceUSD * articles[i].count}</span></td>
    </tr>
            `
    }
    document.getElementById("cart-products").innerHTML = HTMLcont;
    addEventCount();
    updateAllSubTotal();
    totalPrice();


}






//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(CART_INFO_URL_DESAFIANTE).then(function(resultObj) {
        if (resultObj.status === 'ok') {
            arrayArticles = resultObj.data.articles;
            showCartArticles(arrayArticles);
        }
    });
})