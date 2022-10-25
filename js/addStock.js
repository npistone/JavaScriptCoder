//Defino variable globales para poder acceder después desde cualquier parte del doc

let id;
let inName;
let inVenta;
let inCosto;
let inCantidad;
let inDescripcion;
let products = {};
let formularioCarga;
let muestraStock;
const error = "error";
const success = "success";

class Producto {
    constructor(id, nombre, precioCompra, precioVenta, cantidad, descripcion) {
        this.id = id;
        this.nombre = nombre;
        this.precioCompra = precioCompra;
        this.precioVenta = precioVenta;
        this.cantidad = cantidad;
        this.descripcion = descripcion;
    }

    restarStock = (quitarCantidad) => this.cantidad = this.cantidad - quitarCantidad;

    sumarStock = (sumarCantidad) => this.cantidad - sumarCantidad;
    // aumentoPrecio(aumento) {
    //     this.precioVenta = this.precioVenta + ((aumento * this.precioVenta) / 100);
    // }
    // disminucionPrecio(descuento) {
    //     this.precioVenta = this.precioVenta - ((aumento * this.precioVenta) / 100);
    // }

}

//Inicializo lo elementos de donde voy a obtener datos y eventos, y donde voy a mostrar
function initElementos() {
    formularioCarga = document.getElementById("formularioCarga")
    inName = document.getElementById("inputName")
    inCosto = document.getElementById("inputCosto")
    inVenta = document.getElementById("inputVenta")
    inCantidad = document.getElementById("inputCantidad")
    inDescripcion = document.getElementById("inputDescripcion")
    muestraStock = document.getElementById("muestra__Stock")
}

function initAccion() {
    formularioCarga.onsubmit = (evento) => agregarProducto(evento)
}

function validarString(palabra) {
    let bandera = false
    if (palabra === null || palabra.replace(/\s/g,"") == "" ) {
        bandera = true
    }

    return bandera
}

function validarNumero(numero) {
    let bandera = false
    if (numero == 0 || isNaN(numero)) {
        bandera = true
    } else {
        bandera = false
    }
    return bandera
}




function validacionProducto(nombre, costo, venta, cantidad) {
    let bandera = false
    let validacion = 0;
    bandera = validarString(nombre)
    if (bandera) {
        validacion++
        bandera = false
    }

    bandera = validarNumero(costo)
    if (bandera) {
        validacion++
        bandera = false
    }

    bandera = validarNumero(venta)
    if (bandera) {
        validacion++
        bandera = false
    }

    if(costo>venta){
        validacion++
    }

    bandera = validarNumero(cantidad)
    if (bandera) {
        validacion++
        bandera = false
    }

    return validacion;

}
function agregarProducto(evento) {
    evento.preventDefault();
    let id = products.length + 1;
    let nombre = inName.value;
    let precioVenta = inVenta.value;
    let precioCompra = inCosto.value;
    let cantidad = inCantidad.value;
    let descripcion = inDescripcion.value;

    let productoValidado = validacionProducto(nombre, precioCompra, precioVenta, cantidad)
    let existeProducto = products.some((producto) => producto.nombre == nombre.toLowerCase())


    if (productoValidado > 0) {
        let mensaje = "Datos ingresados invalidos vuelva a cargar el producto"
        generarAlertError(mensaje, error);

    } else if (existeProducto) {
        let mensaje = "Ya existe un producto registrado con ese nombre"
        generarAlertError(mensaje, error);

    } else {
        if (descripcion == null || descripcion == "") {
            descripcion = "-"
        }

        let productoARegistrar = new Producto(id, nombre, precioCompra, precioVenta, cantidad, descripcion);
        let tranformarJson = JSON.stringify(productoARegistrar);    
        addProductApi(tranformarJson);

    }


    formularioCarga.reset()
    consultaApi();


}


async function mostrarStock(productos) {

    muestraStock.innerHTML = "";
    
    productos.forEach((producto) => {
        console.log(producto.nombre);
        let column = document.createElement("div");
        column.className = "col-md-4 mt-3 ";
        column.id = `columna-${producto.id}`;
        column.innerHTML = `
        <div class="card h-100 shadow-sm mb-3">
        <div class="card-body">
            <div class="card-body">
                <div class="clearfix mb-3"> 
                 
                <span class="float-start badge rounded-pill bg-info fs-5" style = "width: 20rem ;">${producto.nombre}</span>
                
                 </div> 
                <h5 class="card-title">
               Cantidad disponible :${producto.cantidad}             
                <br>
                Precio de costo :${producto.precioCompra} <br>Precio de venta :${producto.precioVenta}</h5>
                <h5 class="card-title">
                #ID: ${producto.id}
                </h5>
                Descripcion :${producto.descripcion} 
                
                <div class="align-center">       
                <button type="button" class="btn btn-outline-danger btn-sm" id="eliminarCard-${producto.id}">Eliminar</button>
                </div>              
                </div>
                
                </div>`;

                console.log("deberia mostrar");
                muestraStock.append(column);
                let eliminarCard = document.getElementById(`eliminarCard-${producto.id}`)
                eliminarCard.onclick = () => confirmarEliminacion(producto.id)
            });
        }
        function confirmarEliminacion(idProducto) {
            Swal.fire({

        icon: "warning",
        title: '¿Quieres eliminar producto?',
        showDenyButton: true,
        width: "25%",
        confirmButtonText: 'Eliminar',
        denyButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            removeProduct(idProducto);
        } else if (result.isDenied) {
            Swal.fire('Eliminacion cancelada')
        }
    })
}

async function removeProduct(id){
    await fetch("https://6345f26639ca915a690abd6b.mockapi.io/app/producto/"+`${id}`,
    {
        method: 'DELETE',
    })
    .then(res => res.json)
    .then(res =>{
        generarAlertError("Producto elimanado exitosamente", success)
        consultaApi();
    })
    .catch(err => generarAlertError(err, error))
    
}

function generarAlertError(mensaje, tipo) {

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


function buscarProducto(productos) {
    let productoABuscar = prompt("Ingrese el nombre de producto a buscar").toLowerCase()
    let validado = validarString(productoABuscar)
    if (validado) {
        alert("El valor ingresado no es valido")
    } else {
        let buscarPorNombre = productos.filter((producto) => producto.nombre === productoABuscar)
        if (buscarPorNombre.length == 0) {
            alert("No se encontro ningun producto con ese nombre")
        } else {
            for (const producto of buscarPorNombre) {
                alert(producto.id + "- " + producto.nombre.toUpperCase() + " [stock: " + producto.cantidad + "]" + " Precio de venta : $" + producto.precioVenta)
            }
        }
    }

}
async function consultaApi() {
    fetch("https://6345f26639ca915a690abd6b.mockapi.io/app/producto")
    .then((res) => res.json())
    .then((productosResponse) => {
        products = productosResponse
        mostrarStock(productosResponse) 
    })
    .catch( err => generarAlertError(err, error))
};

async function addProductApi(productJson){
    try {
        const response = await fetch("https://6345f26639ca915a690abd6b.mockapi.io/app/producto",
        {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: productJson
          })//El await hace que espere hasta que llegue esa respuesta
        if(response.ok){
            generarAlertError("Producto agregado exitosamente", success)
            consultaApi();
        }
        
    } catch (errorApi) {
        generarAlertError(errorApi, error);
    }
} 


function main() {

    initElementos(); //Se inicializan los elementos
    initAccion();//La acciones con la que vamos a manipular lo elementos
    consultaApi();
    // mostrarStock();

}

main()