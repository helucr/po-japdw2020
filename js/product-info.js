var product = {};
var comment = {};

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
        	        <p>
        	            <a class="float-right btn btn-outline-primary ml-2"> <i class="fa fa-comment"></i> Opinar</a>
        	            <a class="float-right btn text-white btn-danger"> <i class="fa fa-star"></i> Puntuar</a>
        	       </p>
        	    </div>
	        </div>
`
    }

    commentContainer.innerHTML = htmlCommentToAppend;
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