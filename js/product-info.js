let producto = localStorage.getItem("ProdID");
const URL = PRODUCT_INFO_URL + producto +  EXT_TYPE;
const comments = PRODUCT_INFO_COMMENTS_URL + producto + EXT_TYPE;
const datos = document.querySelector(".product-info");
const img = document.querySelector(".product-img");
const related = document.querySelector(".related-products");
const ucomments = document.querySelector(".user-comments");
const estrella = document.querySelector(".estrella");
const estrellaPuntuada = `<i class="fa fa-star checked"></i>`;
const estrellaVacia = `<i class="fa fa-star"></i>`;


function getProduct(producto){
    return`
<div class="Datos">
    <h4>${producto.name}</h4>
    <hr>
    <div class="row">
        <p><strong>Precio</strong></p>
        <p>${producto.currency} ${producto.cost}</p>
        </div>
        <div class="row">
        <p><strong>Descripción</strong></p>
        <p>${producto.description}</p>
        </div>
        <div class="row">
        <p><strong>categoria</strong></p>
        <p>${producto.category}</p>
        </div>
        <div class="row">
        <p><strong>Cantidad de vendidos</strong></p>
        <p>${producto.soldCount}</p>
        </div>
        
     </div>`
}
    
function proImg (producto){
    return`
    <div class="row">
        <p><strong>imagenes ilustrativas</strong></p>
        <div class="row d-flex">
            <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                         <img src="${producto.images[0]}" class="d-block w-100" alt="producto">
                    </div>
                    <div class="carousel-item">
                        <img src="${producto.images[1]}" class="d-block w-100" alt="producto">
                    </div>
                    <div class="carousel-item">
                        <img src="${producto.images[2]}" class="d-block w-100" alt="producto">
                    </div>
                    <div class="carousel-item">
                        <img src="${producto.images[3]}" class="d-block w-100" alt="producto">
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    </div>
    `
}

function comment(producto) {
    return`
    <div class="row overflow-hidden mb-2">
    <p><strong>${producto.user}</strong> ${producto.dateTime}</p> 
    <p>${producto.description}</p>
  </div>
    `
}

function relPro (producto) {
    return`
    <div class="col-3">
    </div>
    <div class="col-3 border" onclick="setProdID(${producto.relatedProducts[0].id})">
    <strong>${producto.relatedProducts[0].name}</strong>
    <img class="img-fluid" src="${producto.relatedProducts[0].image}" alt="">
    </div>
    <div class="col-3 border" onclick="setProdID(${producto.relatedProducts[1].id})">
    <strong>${producto.relatedProducts[1].name}</strong>
    <img class="img-fluid" src="${producto.relatedProducts[1].image}" alt="">
    </div>
    `
}

document.addEventListener("DOMContentLoaded", async function(){
    const listaDatos = await getJSONData(URL);
    const comentarios = await getJSONData(comments);
    datos.innerHTML = getProduct(listaDatos.data);
    img.innerHTML = proImg(listaDatos.data)
    related.innerHTML = relPro(listaDatos.data);
    comentarios.data.forEach(producto => {
        var estrellas = producto.score;
        for (let i = 0; i < estrellas; i++) {
            ucomments.innerHTML += estrellaPuntuada;
            
        }
        if (estrellas < 5){
            for (let i = producto.score; i < 5; i++) {
                ucomments.innerHTML += estrellaVacia;
                
            }
        }
        ucomments.innerHTML += comment(producto); 
    });    


});


function setProdID(id) {
    localStorage.setItem("ProdID", id);
    window.location = "product-info.html"
}
