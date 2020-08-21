function verifyLogin() {

    /* Declaro variables que contendran el valor de los input del loginform */
    let useridvalue = document.getElementById('userid').value;
    let userpassvalue = document.getElementById('userpass').value;

    /* Selecciono inputs */
    let userinput = document.getElementById('userid');
    let passinput = document.getElementById('userpass');

    /* Verificar campos requeridos en loginform */
    if (useridvalue === null || useridvalue === '') {
        console.log = useridvalue;
        userinput.setCustomValidity('Ingresa tu nombre de usuario');

    }
    if (userpassvalue.length < 8) {
        console.log = userpassvalue.length;
        passinput.setCustomValidity('La contraseña debe tener al menos 8 caracteres.');

    } else {
        /* guardar en localStorage  */
        localStorage.setItem('user', useridvalue);
        console.log = localStorage.getItem('user')



    };
};


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener('DOMContentLoaded', function(e) {

});