

function ingresoCantidad() {

    let cantidad
    do {
        cantidad = prompt("Ingrese la cantidad de productos")
        cantidad = parseInt(cantidad)
        console.log(cantidad);
        if(cantidad<1 || cantidad ==NaN){
            alert("La cantidad de productos no puede ser menor a 1")
        }
    } while (cantidad<1 || cantidad ==NaN);

    return cantidad;
}


function calculoPago(cantidad){
    let precio
    do{
        precio=prompt("Ingrese el costo del producto")
        precio=parseFloat(precio)

        if(precio ==NaN || precio <1){
            alert("El precio ingresado es invalido, ingrese nuevamente el valor")
        }
    }while(precio ==NaN || precio <1)

    let pago = precio * cantidad;
    return pago
}

function formaDePago(aPagar){

alert ("El monto total a pagar es $"+aPagar)    
let formaPago
do {
    formaPago = prompt("Elija una forma de pago " + "\n" + "1- Efectivo \n 2- Ahora 3 \n 3- Ahora 6")
    if(formaPago == NaN){
        alert("Debe seleccionar una opcion valida")
    }else{
        formaPago = parseInt(formaPago)
    }
    
} while (formaPago < 1 || formaPago > 3 )
let cuotas
switch (formaPago) {
    case 1:
        alert("Total :$" + aPagar)
        break;
    case 2:
        cuotas = aPagar / 3
        alert("Total : 3 cuotas de $" + cuotas.toFixed(2))
        break;
    case 3:
        cuotas = aPagar / 6
        alert("Total : 6 cuotas de $" + cuotas.toFixed(2))
        break;
    default:
        break;
}
}

function main(){
    let total = 0
    let respuesta = "n"
    do{
        let cant = ingresoCantidad();
        let parcial = calculoPago(cant)
        total=total+parcial

        respuesta = prompt("Desea agregar otro producto? \n Presione 'Si' para agregar productos \n No para continuar ")
        console.log(respuesta);
    }while(respuesta.toLowerCase() == "si")

    formaDePago(total);

    alert("¡Muchas gracias por su compra!")

}

main()