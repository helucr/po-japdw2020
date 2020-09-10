var product = {};
var comment = {};
const newCommentRaiting = '';

function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imgSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imgSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

/* Mostrar comentarios y puntuación con estrellas */
function showComments(array) {
    let htmlCommentToAppend = []

    for (let i = 0; i < array.length; i++) {
        let comment = array[i];

        let checkedStars = `<span class="fa fa-star checked"></span>`.repeat(comment.score)
        let uncheckedStars = `<span class="fa fa-star"></span>`.repeat(5 - comment.score)

        htmlCommentToAppend +=

            `<div class="row">
        	    <div class="col-md-2">
        	        <img src="https://image.ibb.co/jw55Ex/def_face.jpg" class="img img-rounded img-fluid"/>
        	        <p class="text-secondary text-center">${comment.dateTime}</p>
        	    </div>
                <div class="col-md-10">
                    <a class="float-left" ><strong>${comment.user}</strong></a>
                    <p id="scoreContainer" class="float-right"> 
                    ${checkedStars} ${uncheckedStars}
                    </p>
        	       <div class="clearfix"></div>
        	        <p>${comment.description}</p>
        	        
        	    </div>
	        </div>
`
    }

    commentContainer.innerHTML = htmlCommentToAppend;
}
/* Definir valoración de nuevo comentario */
function setNewCommentRating() {
    let inputs = document.getElementsByName('rate');

    for (let i = 0, length = input.length; i < length; i++) {
        if (inputs[i].checked) {
            // do whatever you want with the checked radio
            newCommentRaiting = inputs[i].value;

            // only one radio can be logically checked, don't check the rest
            break;
        }
    }

}
/* Botón OPINAR ---> Agregar nuevo comentario */
function addNewComment() {
    /* obtener hora actual */
    var date = new Date();
    var dateString = date.toLocaleString();

    /* agregar al html */
    let htmlNewCommentToAppend = []
    commentText = document.getElementById('commentTextarea')

    let checkedStars = `<span class="fa fa-star checked"></span>`.repeat(newCommentRaiting)
    let uncheckedStars = `<span class="fa fa-star"></span>`.repeat(5 - newCommentRaiting)

    htmlNewCommentToAppend +=

        `<div class="row">
        	    <div class="col-md-2">
        	        <img src="https://image.ibb.co/jw55Ex/def_face.jpg" class="img img-rounded img-fluid"/>
        	        <p class="text-secondary text-center">${dateString}</p>
        	    </div>
                <div class="col-md-10">
                    <a class="float-left" ><strong>${localStorage.getItem('user')}</strong></a>
                    <p id="scoreContainer" class="float-right"> 
                    ${checkedStars} ${uncheckedStars}
                    </p>
        	       <div class="clearfix"></div>
        	        <p>${commentText.value}</p>
        	        
        	    </div>
	        </div>
`;
    commentContainer.innerHTML += htmlNewCommentToAppend
}





//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let soldCountHTML = document.getElementById("soldCount");

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            soldCountHTML.innerHTML = product.soldCount;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            productComments = resultObj.data;

            showComments(productComments);

        }

    });
});