(function () {
  'use strict'
  var forms = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

let ID_USER = "25801";
const url = CART_INFO_URL + ID_USER + EXT_TYPE;
const CART_LIST = document.querySelector(".cart-container");
var premium = document.getElementById("Premium");
var expres = document.getElementById("Expres");
var standard = document.getElementById("Standard");


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

function Subtotal(producto) {
  return`<h3>${producto.currency} <span id="Subtotalproductos">${producto.unitCost}</span></h3>
  `
}

function sendcost(producto) {
  return`<h3>${producto.currency} <span id="envio"></span></h3>
  `
}

function Total(producto) {
  return`<h3>${producto.currency} <span id="total"></span></h3>
  `
}


function CalculoSubtotal(a,b) {
  return a*b;
}


document.addEventListener("DOMContentLoaded", async function(){
  const Cart = await getJSONData(url);
  CART_LIST.innerHTML += carrito (Cart.data.articles[0])
  var a = Cart.data.articles[0].unitCost;
  var b = 1;
  
  function enviopremium(a,b) {
    return 0.15*(a*b)
  }
  
  function envioexpres(a,b) {
    return 0.07*(a*b)
  }
  
  function enviostandard(a,b) {
    return 0.05*(a*b)
  }
  
  function Calculototal (a,b) {
  if (premium.checked) {
    return enviopremium(a,b) + CalculoSubtotal(a,b);
  }else if (expres.checked) {
    return envioexpres(a,b) + CalculoSubtotal(a,b);
  } else if (standard.checked) {
    return enviostandard(a,b) + CalculoSubtotal(a,b);
  }else {}
  }

  premium.addEventListener("change", function () {
    document.getElementById("envio").innerHTML = enviopremium(a,b);
    document.getElementById("total").innerHTML = Calculototal(a,b);

  })

  expres.addEventListener("change", function () {
    document.getElementById("envio").innerHTML = envioexpres(a,b);
    document.getElementById("total").innerHTML = Calculototal(a,b);
  })

  standard.addEventListener("change", function () {
    document.getElementById("envio").innerHTML = enviostandard(a,b);
    document.getElementById("total").innerHTML = Calculototal(a,b);
  })

    document.getElementById("Costoproductos").innerHTML += Subtotal(Cart.data.articles[0]);
    document.getElementById("Costoenvio").innerHTML += sendcost(Cart.data.articles[0]);
    document.getElementById("Costototal").innerHTML += Total(Cart.data.articles[0]);
    document.getElementById("cantidad").addEventListener("input", function(){
      b = parseInt(document.getElementById("cantidad").value);
      document.getElementById("subtotal").innerHTML = CalculoSubtotal(a,b);
      document.getElementById("Subtotalproductos").innerHTML = CalculoSubtotal(a,b);
      
      premium.addEventListener("change", function () {
        document.getElementById("envio").innerHTML = enviopremium(a,b);
        document.getElementById("total").innerHTML = Calculototal(a,b);
    
      })
    
      expres.addEventListener("change", function () {
        document.getElementById("envio").innerHTML = envioexpres(a,b);
        document.getElementById("total").innerHTML = Calculototal(a,b);
      })
    
      standard.addEventListener("change", function () {
        document.getElementById("envio").innerHTML = enviostandard(a,b);
        document.getElementById("total").innerHTML = Calculototal(a,b);
      })
  })
  })

var Formtarjeta = document.getElementById("Tarjeta");
var Formbanco = document.getElementById("Banco");
var tarjeta = document.getElementById("Tarcred")
var banco = document.getElementById("TransBanc")

function Modal() {
  if (banco.checked) {
    Formtarjeta.disabled = true;
    Formbanco.disabled = false;
    document.getElementById("avisopago").innerHTML = "Transferencia bancaria"

  } else if (tarjeta.checked) {
    Formbanco.disabled = true;
    Formtarjeta.disabled = false;
    document.getElementById("avisopago").innerHTML = "Tarjeta de credito"
  } else {
    document.getElementById("avisopago").innerHTML = "No ah seleccionado"
  }
}
document.getElementById("enviarcompras").addEventListener("click", function () {
  let formulario = document.getElementById("ventas");
  let popup = document.getElementById("popup");
  if (formulario.checkValidity()) {
    popup.classList.remove("d-none"); 
  }
})
document.getElementById("enviarcompras").onclick = Modal;
tarjeta.onchange = Modal;
banco.onchange = Modal; 