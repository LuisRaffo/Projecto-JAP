function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

document.addEventListener("DOMContentLoaded",()=>{
    const boton = document.querySelector ("button");

    boton.addEventListener("click",(evento)=>{
        evento.preventDefault();
        const Usuario = document.querySelector("#Usuario");
        const Contraseña = document.querySelector("#Contraseña");
        if ( Usuario.value == "" || Contraseña.value == ""){
            showAlertError()
        } else{
            window.location.href = "/home.html";
        }
    })
})