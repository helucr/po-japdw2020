//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {


    var getJSONData = function(url) {
        var result = {};
        showSpinner();
        return fetch(PRODUCTS_URL)
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
});