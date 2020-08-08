//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCTS_URL).then(data => {
        console.log(data)
        var contenido = data;
        document.getElementById("prodContainer").innerHTML = ''

    })

});