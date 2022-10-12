let formUsuario;
let inpuntName;
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
    
}
