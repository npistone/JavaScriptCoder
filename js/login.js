let formLogin;
let inEmail;
let inPassword;

function initEvent(){
    formLogin = document.getElementById("loginUser");
    inEmail = document.getElementById("loginMail")
    inPassword= document.getElementById("loginPassword")
}

function initAccion(){
    formLogin.onsubmit= (evento) => validarUsuario(evento);
}

function validarUsuario(evento){

evento.preventDefault();
let email = inEmail.value;
let password = inPassword.value;
consultaUsuario(email, password);

}

function generarAlert(mensaje, tipo) {

    tipo =="error" &&
     (tipo == "error") 
        Swal.fire({
            icon: "error",
            title: mensaje,
            width: "25%",
            time : 1500
        });
    
     tipo =="success" &&   
        Swal.fire({
            icon: "success",
            title: mensaje,
            width: "25%",
            time : 1500
        })

    
}

async function consultaUsuario(email, password) {


   await fetch(`https://6345f26639ca915a690abd6b.mockapi.io/app/usuario?filter=${email}`)
   .then( (res) =>res.json())
   .then((usuarioResponse)=> {
    if(usuarioResponse.length == 0){
        generarAlert("Email no registrado en la BD", "error")
    }else{
        console.log(usuarioResponse);
        console.log(password);
        if(usuarioResponse[0].password === password){
            generarAlert("Usuario logueado correctamente", "success")
            localStorage.setItem("login", "true")
            localStorage.setItem("userName", usuarioResponse.nombre)
            localStorage.setItem("userLast", usuarioResponse.apellido)
            window.location.replace("/stock.html")
        } else{
            generarAlert("Password incorrecto", "error")
        }
        
    }
    

   })
   .catch(err => console.log(err))
    

};

function main(){
    initEvent();
    initAccion();
}

main();