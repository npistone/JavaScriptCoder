let precioMin;
let precioMax;
let nombreABuscar;
let muestraResultado;
let formPrecios;
let formNombre;



function initEventos() {

    formPrecios = document.getElementById("busquedaPrecio")
    formNombre = document.getElementById("busquedaNombre")
    precioMin = document.getElementById("precioMin")
    precioMax = document.getElementById("precioMax")
    nombreABuscar = document.getElementById("nombreABuscar")
    muestraResultado = document.getElementById("muestra_Resultado")
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

function initAcciones() {
    formPrecios.onsubmit = (evento) => buscarPorPrecios(evento);
    formNombre.onsubmit = (eventoX) => buscarPorNombre(eventoX);
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

        muestraResultado.append(column);
    });


}

function buscarPorPrecios(evento) {
    evento.preventDefault();
    let minimo = precioMin.value;
    let maximo = precioMax.value;
    let validacion = validarPrecios(minimo, maximo);
    let productosStorage;
    let resultado = [];

    if (validacion) {
        productosStorage = getProductosStorage();

        if (productosStorage.length > 0) {
            resultado = productosStorage.filter((producto) => producto.precioVenta <= maximo && producto.precioVenta >= minimo);
            if (resultado.length > 0) {
                mostrarProductos(resultado);
            } else {
                console.log("no encuentra producto");
                muestraResultado.innerHTML = "";
                let column = document.createElement("div");
                column.className = "col-md-3 mt-3 text-center";
                column.innerHTML = `
                <div class="mb-3">
                <p class="text-danger fs-4"> No existen productos dentro del rango ingresado</p>
                </div>`;
                muestraResultado.append(column);
            }
        }
    } else {
        muestraResultado.innerHTML = "";
        let column = document.createElement("div");
        column.className = "col-md-3 mt-3 ";
        column.innerHTML = `
        <div class="mb-3">
        <p class="text-danger fs-4"> El precio minimo no puede ser mayor que el máximo</p>
        </div>`;
        muestraResultado.append(column);
    }
    formPrecios.reset();
}

function buscarPorNombre(eventoX) {
    console.log("entra");
    eventoX.preventDefault();
    let nombreBuscado = nombreABuscar.value;
    let productosStorage;
    let resultado = [];

    if (validarString(nombreBuscado)) {
        productosStorage = getProductosStorage();
        console.log("busca storage");

        if (productosStorage.length > 0) {
            console.log("filtra");
            resultado = productosStorage.filter((producto) => producto.nombre == nombreBuscado);
            if (resultado.length > 0) {
                mostrarProductos(resultado);
            } else {
                console.log("no encuentra producto");
                muestraResultado.innerHTML = "";
                let column = document.createElement("div");
                column.className = "col-md-3 mt-3 text-center";
                column.innerHTML = `
                <div class="mb-3">
                <p class="text-danger fs-4"> No existen con el nombre ingresado</p>
                </div>`;
                muestraResultado.append(column);
            }
        }
    } else {
        muestraResultado.innerHTML = "";
        let column = document.createElement("div");
        column.className = "col-md-3 mt-3 ";
        column.innerHTML = `
        <div class="mb-3">
        <p class="text-danger fs-4"> El valor ingresado no es válido</p>
        </div>`;
        muestraResultado.append(column);
    }
    formNombre.reset();
}

function main() {
    initEventos();
    initAcciones();
}
main()