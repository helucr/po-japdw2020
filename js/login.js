//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

/* Declaro variables que contendran el valor de los input del loginform */



/* Verificar campos requeridos en loginform */

let userid = document.getElementById("userid");
let userpass = document.getElementById("userpass");

function verifyLogin() {
    if (userid.value === null || userid.value === "") {
        console.log = userid.value
        userid.setCustomValidity("Ingresa tu nombre de usuario")
    }
    if (userpass.value.length < 8) {
        console.log = userpass.value.length
        userpass.setCustomValidity("La contraseña debe tener al menos 8 caracteres.")
    } else {
        /* cambiar la variable logged a true y guardar en localstorage  */
        localStorage.setItem("user", "userid.value")
        localStorage.setItem("pass", "userpass.value")
    };
};