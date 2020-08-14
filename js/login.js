//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.



function verifyLogin() {
    let userid = document.getElementById("userid");
    let userpass = document.getElementById("userpass");

    if (userid.value === null || userid.value === "") {
        console.log = userid.value
        userid.setCustomValidity("Ingresa tu nombre de usuario")
    }
    if (userpass.value.length === 0) {
        console.log = userpass.value.length
        userpass.setCustomValidity("Ingresa tu contraseña")
    }

}

document.addEventListener("DOMContentLoaded", function(e) {


});