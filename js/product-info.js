var product = {};
var comment = {};
var newCommentRaiting = 0;

function showImagesGallery(array) {

    let htmlContentToAppend = "";
    let htmlSlideMenu = "";

    for (let i = 0; i < array.length; i++) {
        let imgSrc = array[i];

        htmlContentToAppend += `
        <li id="slide${i+1}">
            <img src="${imgSrc}"/>
        </li>
        `
        htmlSlideMenu += `
        <li>
            <a href="#slide${i+1}"></a>
        </li>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
        document.getElementById("slideMenu").innerHTML = htmlSlideMenu;

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
        	        <p class="text-secondary text-center">${moment(comment.dateTime).fromNow()}</p>
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
function setNewCommentRating(valor) {
    newCommentRaiting = valor;
}

/* Botón OPINAR ---> Agregar nuevo comentario */
function addNewComment() {
    /* obtener hora actual */
    var date = new Date();


    /* agregar al html */
    let htmlNewCommentToAppend = []
    commentText = document.getElementById('commentTextarea')

    let checkedStars = `<span class="fa fa-star checked"></span>`.repeat(newCommentRaiting)
    let uncheckedStars = `<span class="fa fa-star"></span>`.repeat(5 - newCommentRaiting)

    htmlNewCommentToAppend +=

        `<div class="row">
        	    <div class="col-md-2">
        	        <img src="https://image.ibb.co/jw55Ex/def_face.jpg" class="img img-rounded img-fluid"/>
        	        <p class="text-secondary text-center">${moment(date).fromNow()}</p>
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
    commentText.value = ""
}

function showRelatedProducts(relatedProdArray) {
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            productList = resultObj.data;
            console.log(productList)

            let htmlRelatedProducts = "";

            for (let i = 0; i < relatedProdArray.length; i++) {
                let relatedProductPosition = relatedProdArray[i];
                let relatedProduct = productList[relatedProductPosition];
                console.log(relatedProductPosition)
                console.log(relatedProduct)
                htmlRelatedProducts += `
                <div class= "col-lg-3 col-md-4 col-6 border">
                    <div id="relatedVideoProdImg" class= "row">
                        <img class="img-fluid p-2" src="` + relatedProduct.imgSrc + `">                                              
                    </div>                   
                    <div "relatedVideoProdInfo" class= "row p-2">
                    <p>` + relatedProduct.name + `</p> 
                    <p>` + relatedProduct.description + `</p>
                    </div>
                    <div class= "row p-2 a-center ">
                    <a href="product-info.html">Ver</a>
                    </div>                     
                </div>`
            }
            console.log(htmlRelatedProducts)
            document.getElementById("relatedProductsContainer").innerHTML = htmlRelatedProducts;
        }
    })
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
            let costHTML = document.getElementById("productCost");


            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            soldCountHTML.innerHTML = product.soldCount;
            costHTML.innerHTML = product.currency + " " + product.cost


            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
            showRelatedProducts(product.relatedProducts);
        }

    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            productComments = resultObj.data;

            showComments(productComments);

        }

    });
});