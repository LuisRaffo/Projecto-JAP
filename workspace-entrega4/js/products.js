let categoria = localStorage.getItem("catID")
const URL= PRODUCTS_URL + categoria + EXT_TYPE;
const listado = document.querySelector(".product-list");
let listaDeProductos = []; 



function getHTML(producto){
    return `
        <div class="row border overflow-hidden mb-2" onclick="setProdID(${producto.id})">
        <div class="col-2 p-0">
          <img class="img-fluid img-fit" src="${producto.image}" alt="">
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
    let listadoProductos  = await getJSONData(URL);
    listaDeProductos= listadoProductos;
    showProductList(listaDeProductos.data.products);
    
  
  });
  const ORDER_ASC_BY_COST = "ascendente";
  const ORDER_DESC_BY_COST = "Decendente";
  const ORDER_BY_PROD_REL = "relevancia";
  let currentSortCriteria = undefined;
  let minCost = undefined;
  let maxCost = undefined;
  
  function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_REL){
        result = array.sort(function(a, b) {
            let asoldCount = parseInt(a.soldCount);
            let bsoldCount = parseInt(b.soldCount);
  
            if ( asoldCount > bsoldCount ){ return -1; }
            if ( asoldCount < bsoldCount ){ return 1; }
            return 0;
        });
    }
  
    return result;
  }

    
    function showProductList(array){
    
      let htmlContentToAppend = "";
      for(let i = 0; i < array.length; i++){
          let producto = array[i];
    
          if (((minCost == undefined) || (minCost != undefined && parseInt(producto.cost) >= minCost)) &&
              ((maxCost == undefined) || (maxCost != undefined && parseInt(producto.cost) <= maxCost))){
              htmlContentToAppend += getHTML(producto)
          }
          listado.innerHTML = htmlContentToAppend;
      }
    }
    
    function sortAndShowProducts(sortCriteria){
      currentSortCriteria = sortCriteria;
        
       array = sortProducts(currentSortCriteria, listaDeProductos.data.products);
    
      
      showProductList(array);
    }
    
    
      document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
      });
    
      document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
      });
    
      document.getElementById("sortBySoldCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_REL);
      });
    
      document.getElementById("clearRangeFilter").addEventListener("click", function(){
          document.getElementById("rangeFilterCostMin").value = "";
          document.getElementById("rangeFilterCostMax").value = "";
    
          minCost = undefined;
          maxCost = undefined;
    
          showProductList(listaDeProductos.data.products);
      });
     
      document.getElementById("rangeFilterCost").addEventListener("click", function(){
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;
    
        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        }
    
        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }
    
        showProductList(listaDeProductos.data.products);
  });
    ;

    function setProdID(id) {
      localStorage.setItem("ProdID", id);
      window.location = "product-info.html"
  }
