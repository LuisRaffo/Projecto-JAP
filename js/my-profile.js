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

var Correo = localStorage.getItem("Usuario");
var pnom = localStorage.getItem("Primer Nombre");
var snom = localStorage.getItem("Segundo Nombre");
var pape = localStorage.getItem("Primer Apellido");
var sape = localStorage.getItem("Segundo Apellido");
var tele = localStorage.getItem("Telefono");
var imgperf = localStorage.getItem("Imagen Perfil");


var PNombre = document.getElementById("PNombre");
var SNombre = document.getElementById("SNombre");
var PApellido = document.getElementById("PApellido");
var SApellido = document.getElementById("SApellido");
var Email = document.getElementById("Email");
var Telefono = document.getElementById("Telefono");
let Guardar = document.getElementById("Cambios");
var ImagenPerfil = document.getElementById("File");
var imgperfil = document.getElementById("perfil")


document.addEventListener("DOMContentLoaded", function () {
  if (Correo === null) {
      window.location.href = "/index.html";
  }
  
  Email.value = Correo;
  PNombre.value = pnom;
  SNombre.value = snom;
  PApellido.value = pape;
  SApellido.value = sape;
  Telefono.value = tele;
})

Guardar.addEventListener("click", function () {
  localStorage.setItem("Primer Nombre", PNombre.value);
  localStorage.setItem("Segundo Nombre", SNombre.value);
  localStorage.setItem("Primer Apellido", PApellido.value);
  localStorage.setItem("Segundo Apellido", SApellido.value);
  localStorage.setItem("Usuario", Email.value);
  localStorage.setItem("Telefono", Telefono.value);
})

