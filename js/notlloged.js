function notlogged() {
    if (localStorage.getItem("user") === null || localStorage.getItem("pass") === null) {
        alert("Debes iniciar sesión")
        location.href = "login.html"
        notlogged.preventDefault()
    }

}
notlogged()