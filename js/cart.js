//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function showCartProdsAndTotalCost(array) {

    HTMLcont = "";
    for (i = 0; i < array.length; i++) {
        HTMLcont += `
                <tr>
                  <td scope="col"><img src="` + array[i].src + `" style="width:60px"></td>
                  <td scope="col">` + array[i].name + `</td>
                  <td scope="col">` + array[i].currency + array[i].unitCost + `</td>
                  <td scope="col"><input type="number" value="` + array[i].count + `" min="1"></td>
                  <td scope="col">` + array[i].currency + productSubTotal(array[i]) + `</td>
                </tr>
        `
    }
    document.getElementById("cart-products").innerHTML = HTMLcont;
}

//esta funcion recibe un producto y devuelve el costo total segun su precio unitario y la cantidad a comprar
function productSubTotal(cartItem) {
    let subtotalCost = 0;
    subtotalCost = cartItem.unitCost * cartItem.count
    return subtotalCost;

}

function productSubTotalTotal(array) {
    let subtotalCost = 0;
    for (i = 0; i < array.length; i++) {
        subtotalCost += array[i].unitCost * array[i].count
    }
    return subtotalCost;
}

//esta funcion recibe el array de todos los productos del carrito
function cartTotalCost(array) {

    // completar la funcion que retorne el total de la venta, 
    //coincide con la suma de los subtotales por videojuego
    let totalCost = 0;
    array.forEach(product => {

        totalCost += productSubTotal(product);
    });

    return totalCost;
}

//completar el codigo realizando la peticion directamente con fetch y mostrar en cart.html cada dato del videojuego
//los subtotales por cada videojuego
//el subtotal de todos los videojuegos (suma de los subtotales), utilizar funcion 
//el total del carrito (coincide con el subtotal, utilizar la funcion cartTotalCost)
document.addEventListener("DOMContentLoaded", function(e) {
    fetch(CART_INFO_URL_DESAFIANTE)
        .then(response => {
            return response.json();
        })
        .then(response => {
            let cartItem = response;
            showCartProdsAndTotalCost(cartItem.articles);
            document.getElementById("total").innerHTML = "USD" + cartTotalCost(cartItem.articles);
            document.getElementById("subtotal").innerHTML = "USD" + productSubTotalTotal(cartItem.articles)
        });

});