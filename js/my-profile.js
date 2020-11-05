//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

const userName = document.getElementById("userName");
const userSurname = document.getElementById("userSurname");
const userAge = document.getElementById("userAge");
const userEmail = document.getElementById("userEmail");
const userPhone = document.getElementById("userPhone");



/* Guarda los datos ingresados en el formulario */
function saveUserData() {
    // Se crea un objeto 
    let userDataObj = {
        name: userName.value,
        surname: userSurname.value,
        age: userAge.value,
        email: userEmail.value,
        phone: userPhone.value,
    };
    //Se convierte objeto javascript en JSON
    let userDataJSON = JSON.stringify(userDataObj);

    //Se guarda en LocalStorage los valores de los inputs
    localStorage.setItem("userData", userDataJSON);

}

/* Mostrar datos gardados en LocalStorage */
function showUserData() {
    //Se convierte JSON en objeto JavaScript para poder manipular los datos
    let userDataParse = JSON.parse(localStorage.getItem("userData"));

    //Se muestran los valores de los input en HTML 
    document.getElementById("htmlUserName").innerHTML += userDataParse.name
    document.getElementById("htmlUserSurname").innerHTML += userDataParse.surname
    document.getElementById("htmlUserAge").innerHTML += userDataParse.age
    document.getElementById("htmlUserEmail").innerHTML += userDataParse.email
    document.getElementById("htmlUserPhone").innerHTML += userDataParse.phone


}

function saveAndShowUserData() {
    saveUserData();
    showUserData();
    window.location.reload();






}


document.addEventListener("DOMContentLoaded", function(e) {
    showUserData();
});