let arrayArticles = [];
let allSubtotals = 0;
let rateUSD = 40;
let shippingCost = 0;
let confirmedAddress = false
let confirmedPaymentMethod = false

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

function totalPrice() {

    let total = allSubtotals + shippingCost
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
            calcShippingCost()
            calcTotal();

        });

    }


}

/* Calcular costo de envio */
function calcShippingCost() {
    let shippingArray = document.getElementsByName("shipping");

    for (i = 0; i < shippingArray.length; i++) {
        if (shippingArray[i].checked) {
            shippingCost = shippingArray[i].value * allSubtotals / 100

        }
    }
    /* mostrar costo del total */
    document.getElementById("shippingCost").innerHTML = "USD " + shippingCost

    /* Actualizar PRECIO TOTAL al modificar tipo de envío */
    totalPrice();

}

/* ELIMINAR PRODUCTOS */
function eraseProduct(btn) {
    let parent = document.getElementById("cart-products");
    let product = document.getElementById(btn);

    parent.removeChild(product);

    addEventCount();
    updateAllSubTotal();
    calcShippingCost();
    totalPrice();

}

// MODAL DIRECCION DE ENVIO
/* BOTON GUARDAR ---> verificar direccion de entrega */
function verifyShippingAddress() {

    if (document.getElementById("shippingAddress").value === "") {
        alert("Ingrese la calle");
    } else if (document.getElementById("shippingAddressNum").value === "") {
        alert("Ingrese el número de puerta")
    } else if (document.getElementById("shippingCountry").value === "") {
        alert("Seleccione el país de destino")
    } else {
        confirmedAddress = true;
        $('#modalShippingAdress').modal('toggle');
        document.getElementById('btnSelectAddress').innerHTML = "Modificar dirección de entrega.";

    }

};

/* BOTON CANCELAR ---> cierra y limpia los campos */
function clearShippingAddress() {
    document.getElementById("shippingAddress").value = "";
    document.getElementById("shippingAddressNum").value = "";
    document.getElementById("shippingAddressNumApto").value = "";
    document.getElementById("shippingCountry").value = ""
    confirmedAddress = false;
    document.getElementById('btnSelectAddress').innerHTML = "Ingrese dirección de entrega."
}

// MODAL FORMA DE PAGO
/* Deshabilitar campos transferencia bancaria */
function disableBankPayment() {
    document.getElementById("cardNumber").disabled = false;
    document.getElementById("inputcardExpMonth").disabled = false;
    document.getElementById("inputcardExpYear").disabled = false;
    document.getElementById("cardcvv").disabled = false;

    document.getElementById("accountNumber").disabled = true;
    document.getElementById("accountNumber").value = "";
};

/* Deshabilitar campos pago con tarjeta */
function disableCardPayment() {
    document.getElementById("cardNumber").disabled = true;
    document.getElementById("cardNumber").value = "";
    document.getElementById("inputcardExpMonth").disabled = true;
    document.getElementById("inputcardExpMonth").value = "";
    document.getElementById("inputcardExpYear").disabled = true;
    document.getElementById("inputcardExpYear").value = "";
    document.getElementById("cardcvv").disabled = true;
    document.getElementById("cardcvv").value = "";

    document.getElementById("accountNumber").disabled = false;
};

/* verificar método de pago */
function verifyPaymentMethod() {
    confirmedPaymentMethod = true;
    $('#modalPaymentMethod').modal('toggle');
    document.getElementById('btnPaymentOptions').innerHTML = "Modificar forma de pago.";


};

function clearPaymentMethod() {
    document.getElementById("cardNumber").value = "";
    document.getElementById("inputcardExpMonth").value = "";
    document.getElementById("inputcardExpYear").value = "";
    document.getElementById("cardcvv").value = "";
    document.getElementById("accountNumber").value = ""
    confirmedPaymentMethod = false;
    document.getElementById('btnPaymentOptions').innerHTML = "Seleccionar forma de pago.";
}

/* BTN FINALIZAR COMPRA */
function buyProducts() {
    if (shippingCost !== 0 && confirmedAddress === true &&
        confirmedPaymentMethod === true) {
        alert('HA FINALIZDO SU COMPRA CON ÉXITO')
        clearPaymentMethod();
        clearShippingAddress();
        document.getElementById('cart-products').innerHTML = "";
        document.getElementById('subtotalCost').innerHTML = " - ";
        document.getElementById('shippingCost').innerHTML = " - ";
        document.getElementById('totalCost').innerHTML = " - ";





    } else if (confirmedAddress === false) {
        alert('Debe seleccionar el tipo de envío.')
    } else if (shippingCost === 0) {
        alert('Debe ingresar la dirección de entrega.')
    } else if (confirmedPaymentMethod === false) {
        alert('Debe ingresar un método de pago.')
    }

};



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
        <tr id="${i}" class="product">
            <td scope="col"><img src='${articles[i].src}' height="125px"></td>
            <td scope="col">${articles[i].name}</td>
            <td scope="col"> USD ${articlePriceUSD}</td>
            <td scope="col"><input class="form-control countArticle" style="width:60px;" type="number" id="productCount-${i}" value="${articles[i].count}" min="1"></td>
            <td scope="col"><span id="productSubtotal-${i}" style="font-weight:bold;"> USD ${articlePriceUSD * articles[i].count}</span></td>
            <td scope="col"><button type="button" class="btn btn-link trash" onclick="eraseProduct(${i});"><i class="fas fa-trash"></i></button></td>
        </tr>
            `
    }
    document.getElementById("cart-products").innerHTML = HTMLcont;
    addEventCount();
    updateAllSubTotal();
    shippingCost();
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