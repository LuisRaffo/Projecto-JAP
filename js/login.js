function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

let User = document.getElementById("User")

document.addEventListener("DOMContentLoaded",()=>{
    const boton = document.querySelector ("button");

    boton.addEventListener("click",(evento)=>{
        evento.preventDefault();
        const Usuario = document.querySelector("#User");
        const Contraseña = document.querySelector("#Contraseña");
        if ( Usuario.value == "" || Contraseña.value == ""){
            showAlertError()
        } else{
            localStorage.setItem("Usuario", User.value)
            window.location.href = "/home.html";
        }
    })
})