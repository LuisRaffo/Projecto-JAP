let ID_USER = "25801";
const url = CART_INFO_URL + ID_USER + EXT_TYPE;
const CART_LIST = document.querySelector(".cart-container");


function carrito (producto){
    return` <div class="row" id="${producto.id}">
    <div class="d-flex col-2"> <img src="${producto.image}" class="img-fluid" alt=""></div>
    <div class="col-2">${producto.name}</div>
    <div class="col-2">${producto.currency} <span id="costo">${producto.unitCost}</span></div>
    <div class="col-2">
      <input class="form-control" type="number" name="cantidad" id="cantidad" min="1" value="${producto.count}">
    </div>
    
    <div class="col-2">${producto.currency} <span id="subtotal">${producto.unitCost} </span></div>
  </div>
    `
}

document.addEventListener("DOMContentLoaded", async function(){
    const Cart = await getJSONData(url);
    CART_LIST.innerHTML += carrito (Cart.data.articles[0])
    document.getElementById("cantidad").addEventListener("input", function(){
      var a = Cart.data.articles[0].unitCost;
      var b = parseInt(document.getElementById("cantidad").value);
      document.getElementById("subtotal").innerHTML = a * b;

    })
})