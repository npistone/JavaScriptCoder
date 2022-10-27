let precioMin;
let precioMax;
let nombreABuscar;
let muestraResultado;
let formPrecios;
let formNombre;
let formCarrito;
let carritoProducto;
let carritoProductoCantidad;
let carrito = [];



function initEventos() {

    formPrecios = document.getElementById("busquedaPrecio")
    formNombre = document.getElementById("busquedaNombre")
    precioMin = document.getElementById("precioMin")
    precioMax = document.getElementById("precioMax")
    nombreABuscar = document.getElementById("nombreABuscar")
    muestraResultado = document.getElementById("muestra_Resultado")

}
function initAcciones() {
    formPrecios.onsubmit = (evento) => buscarPorPrecios(evento);
    formNombre.onsubmit = (eventoX) => buscarPorNombre(eventoX);

}

function validarPrecios(min, max) {
    let bandera = true
    if (min > max) {
        bandera = false;
    }

    return bandera;
}
function validarString(palabra) {
    let bandera = true
    if (palabra === '' || palabra === null) {
        bandera = false;
    }
    return bandera
}


function getProductosStorage() {
    let productos = [];
    let productosJSON = localStorage.getItem("productos")//Buscamos en localStorage si hay productos guardados
    if (productosJSON) {
        productos = JSON.parse(productosJSON)
    }
    return productos
}
function mostrarProductos(productos) {

    muestraResultado.innerHTML = "";

    productos.forEach((producto) => {
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
                 <div>
                    <h5 class="card-title">
                    Cantidad disponible :${producto.cantidad}             
                    <br>Precio de venta :${producto.precioVenta}</h5>
                </div>

                    Descripcion :${producto.descripcion}  
                    <div class="container d-flex align-items-center justify-content-center mt-5">
                        <div>
                        <button type="button" class="btn btn-success btn-sm" id="addProduct-${producto.id}" >Agregar al presupuesto</button>
                        </div>
                    </div>
                
                  
            </form>              
        </div>
        
      </div>`;

        muestraResultado.append(column);
        let agregarCarrito = document.getElementById(`addProduct-${producto.id}`)
        agregarCarrito.onclick = () => agregarCarritoProd(producto);
    });

}

function agregarCarritoProd(producto) {

    let existente = carrito.some((product) => product.nombre == producto.nombre)
    if (existente) {
        generarAlert("El producto ya se encuentra en el carrito", "error")
    } else {
        carrito.push(producto);
        generarAlert(producto.nombre + " agrega correctamente", "success")
    }

}

async function buscarPorPrecios(evento) {
    evento.preventDefault();
    let minimo = precioMin.value;
    let maximo = precioMax.value;
    let validacion = validarPrecios(minimo, maximo);
    let productosStorage;


    validacion ? consultaApiPorPrecio(minimo, maximo) : generarAlert("Parametros de busqueda errorenes", error)


    formPrecios.reset();
}

async function buscarPorNombre(eventoX) {
    console.log("entra");
    eventoX.preventDefault();
    let nombreBuscado = nombreABuscar.value;
    nombreBuscado = nombreBuscado.toLowerCase();
    let resultado = [];

    if (validarString(nombreBuscado)) {

        consultaApiPorNombre(nombreBuscado)
    } else {
        generarAlert("El nombre ingresado no es válido", "error")
    }

    formNombre.reset();
}


async function consultaApiPorNombre(nombre) {
    await fetch(`https://6345f26639ca915a690abd6b.mockapi.io/app/producto?filter=${nombre}`)//Utilidad de filtrado de MockApi
        .then((res) => res.json())
        .then((productosResponse) => {
            if (productosResponse == null || productosResponse.length == 0) {
                generarAlert("No existen productos con ese nombre", "error")
            } else {
                mostrarProductos(productosResponse);
            }

        })
        .catch(err => generarAlert(err, "error"))
};

async function consultaApiPorPrecio(min, max) {
    await fetch("https://6345f26639ca915a690abd6b.mockapi.io/app/producto")
        .then((res) => res.json())
        .then((productosResponse) => {
            let resultado = []

            if (productosResponse == null || productosResponse.length == 0) {
                generarAlert("No existen productos en ese rango de precios", "error")
            } else {
                resultado = productosResponse.filter((producto) => producto.precioVenta <= max && producto.precioVenta >= min);
                mostrarProductos(resultado);
            }

        })
        .catch((err) => generarAlert(err, "error"))
};



function generarAlert(mensaje, tipo) {

    tipo == "error" &&
        (tipo == "error")
    Swal.fire({
        icon: "error",
        title: mensaje,
        width: "25%",
        timer: 1500
    });

    tipo == "success" &&
        Swal.fire({
            icon: "success",
            title: mensaje,
            width: "25%",
            timer: 1500
        })


}
function main() {
    initEventos();
    initAcciones();
}
main()