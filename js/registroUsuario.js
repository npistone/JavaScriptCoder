let formUsuario;
let inputName;
let inputPhone;
let inputMail;
let inputPassword;
let inputLastName;
let usuarioDB = [];


class usuario{

    constructor(nombre, apellido, telefono, mail, password){
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.mail = mail;
        this.password = password;
    }

    updatePassword = (newPassword) => this.password = newPassword;
    downUser = () => this.activeUser = false; 
}

function initEvent(){
    formUsuario = document.getElementById("formularioUsuario")
    inputName=document.getElementById("userName")
    inputLastName= document.getElementById("userLastName")
    inputPhone= document.getElementById("userPhone")
    inputMail= document.getElementById("userMail")
    inputPassword= document.getElementById("userPassword")
}

function initAccion(){
    formUsuario.onsubmit = (evento) =>createUser()
}

function validarString(palabra) {
    let bandera = false
    if (palabra === null || palabra.replace(/\s/g,"") == "" ) {
        bandera = true
    }

    return bandera
}

function validarForm(nombre, apellido, telefono, mail){
    let bandera = false
    let validacion = 0;
    bandera = validarString(nombre)
    if (bandera) {
        validacion++
        bandera = false
    }
    bandera = validarString(apellido)
    if (bandera) {
        validacion++
        bandera = false
    }

    bandera = validarNumero(telefono)
    if (bandera) {
        validacion++
        bandera = false
    }

    return validacion;

}

function createUser(evento){
    evento.preventDefault();
    
    let name = inputName.value;
    let lastName = inputLastName.value;
    let phone = inputPhone.value;
    let email = inputMail.value;
    let password = inputPassword.value;



}