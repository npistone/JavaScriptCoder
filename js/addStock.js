//Defino variable globales para poder acceder después desde cualquier parte del doc

let id;
let inName;
let inVenta;
let inCosto;
let inCantidad;
let inDescripcion;
let productos = [];
let formularioCarga;
let muestraStock;


class Producto {
    constructor(id, nombre, precioCompra, precioVenta, cantidad, descripcion) {
        this.id = id;
        this.nombre = nombre.toLowerCase();
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

function initAccion() {
    formularioCarga.onsubmit = (evento) => agregarProducto(evento)
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

    bandera = validarNumero(cantidad)
    if (bandera) {
        validacion++
        bandera = false
    }

    return validacion;

}
function agregarProducto(evento) {
    evento.preventDefault();
    let id = productos.length + 1;
    let nombre = inName.value;
    let precioVenta = inVenta.value;
    let precioCompra = inCosto.value;
    let cantidad = inCantidad.value;
    let descripcion = inDescripcion.value;

    let productoValidado = validacionProducto(nombre, precioCompra, precioVenta, cantidad)
    let existeProducto = productos.some((producto) => producto.nombre == nombre.toLowerCase())


    if (productoValidado > 0) {
        let mensaje = "Datos ingresados invalidos vuelva a cargar el producto"
        generarAlertError(mensaje, "error");

    } else if (existeProducto) {
        let mensaje = "Ya existe un producto registrado con ese nombre"
        generarAlertError(mensaje, "error");

    } else {
        if (descripcion == null || descripcion == "") {
            descripcion = "-"
        }

        let productoARegistrar = new Producto(id, nombre, precioCompra, precioVenta, cantidad, descripcion);

        productos.push(productoARegistrar)

        agregarProductoStorage();
        let mensaje = "Producto ingresado correctamente"
        generarAlertError(mensaje, "success");
    }


    formularioCarga.reset()
    mostrarStock()

    return productos
}

function agregarProductoStorage() {
    let productosJSON = JSON.stringify(productos)
    localStorage.setItem("productos", productosJSON)

}

function getProductosStorage() {

    let productosJSON = localStorage.getItem("productos")//Buscamos en localStorage si hay productos guardados
    if (productosJSON) {
        productos = JSON.parse(productosJSON)
        mostrarStock()
    }
}
function clearLocalStorage() {
    localStorage.clear;
}

function mostrarStock() {

    muestraStock.innerHTML = "";

    productos.forEach((producto) => {
        let column = document.createElement("div");
        column.className = "col-md-4 mt-3 ";
        column.id = `columna-${producto.id}`;
        column.innerHTML = `
      <div class="card h-100 shadow-sm mb-5">
        <div class="card-body">
            <div class="card-body"> <div class="clearfix mb-3"> 
                <span class="float-start badge rounded-pill bg-primary fs-5" style = "width: 10rem ;">${producto.nombre}</span>
                <span class="float-end price-product">Precio de venta :${producto.precioVenta}</span>
            </div> 
                <h5 class="card-title"> Precio de costo : ${producto.precioCompra} <br> Descripcion :${producto.descripcion}
                <br> #IdProduct : ${producto.id} 
                </h5> 
            <div class="align-items-center">       
            <button type="button" class="btn btn-outline-danger btn-sm" id="eliminarCard-${producto.id}">Eliminar</button>
            </div>              
        </div>
        
      </div>`;

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
            eliminarProducto(idProducto);
        } else if (result.isDenied) {
            Swal.fire('Eliminacion cancelada')
        }
    })
}
function eliminarProducto(id) {
    let borrarCard = document.getElementById(`columna-${id}`)
    let productoABorrar = productos.findIndex((producto) => Number(producto.id) === Number(id))

    productos.slice(productoABorrar, 1)
    borrarCard.remove();
}

function generarAlertError(mensaje, tipo) {

    tipo =="error" &&
     (tipo == "error") 
        Swal.fire({
            icon: "error",
            title: mensaje,
            width: "25%",
            time : 3000
        });
    
     tipo =="success" &&   
        Swal.fire({
            icon: "success",
            title: mensaje,
            width: "25%",
            time : 3000
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

    try {
        const response = await fetch("https://6345f26639ca915a690abd6b.mockapi.io/app/producto")//El await hace que espere hasta que llegue esa respuesta
        const data = await response.json();
        productos = [...data]
        mostrarStock();
    } catch (error) {
        
    }
}


function main() {

    initElementos(); //Se inicializan los elementos
    initAccion();//La acciones con la que vamos a manipular lo elementos
    consultaApi();
   // getProductosStorage();// Buscamos en el storage los elementos guardados y si estan generamos las cards

}

main()