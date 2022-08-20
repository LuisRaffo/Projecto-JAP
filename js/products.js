const URL="https://japceibal.github.io/emercado-api/cats_products/101.json"

function getHTML(producto){
    return`
        <div class="row border overflow-hidden mb-2" data-id="${producto.id}">
        <div class="col-2 p-0">
          <img class="img-fluid" src="${producto.image}" alt="">
        </div>
        <div class="col-10 d-flex flex-column justify-content-between">
          <div class="Datos">
            <h3>${producto.name}</h3>
            <P>${producto.description}</P>
          </div>
          <div class="Ventas d-flex justify-content-between">
            <div class="class">
              <span class="Moneda">${producto.currency}</span>
              <span class="Costo">${producto.cost}</span>
            </div>
            <p>Cantidad Vendidos: <span class="Vendidos">${producto.soldCount}</span></p>
          </div>
        </div>
      </div>
    `
}

document.addEventListener("DOMContentLoaded", async function(){
    const listado = document.querySelector(".product-list");
    let listadoProductos = await getJSONData(URL);
    listadoProductos.data.products.forEach(producto => {
        listado.innerHTML += getHTML(producto);        
    });
    console.log(listadoProductos);
    });