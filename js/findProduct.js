let precioMin;
let precioMax;
let nombreABuscar;
let muestraResultado;
let formPrecios;
let formNombre;
let products = {}



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
            <form class="addCarrito">
                <div class="mb-2">
                    <label class="form-label">Cantidad</label>
                     <input type="number" class="form-control form-control-sm" id="addQuantity" required />
                 </div>
                 <input type="hidden" id="addProductId" name="articuloId" value=${producto.id}  />
                <button type="submit" class="btn btn-outline-danger btn-sm">Agregar al carrito</button>
                  
            </form>              
        </div>
        
      </div>`;

        muestraResultado.append(column);
    });


}

async function buscarPorPrecios(evento) {
    evento.preventDefault();
    let minimo = precioMin.value;
    let maximo = precioMax.value;
    let validacion = validarPrecios(minimo, maximo);
    let productosStorage;
    let resultado = [];

    if (validacion) {
        productosStorage = consultaApi();

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

async function buscarPorNombre(eventoX) {
    console.log("entra");
    eventoX.preventDefault();
    let nombreBuscado = nombreABuscar.value;
    let resultado = [];

    if (validarString(nombreBuscado)) {
       console.log(products);
        if (products.length > 0) {
            console.log("filtra");
            resultado = products.inclues(nombreBuscado);
            // resultado= products.map((producto)=> producto.nombre.includes(nombreBuscado) )
            resultado.length > 0 ? mostrarProductos(resultado) : generarAlert("No se encontraron productos con ese nombre", "error");
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

async function consultaApi() {
    fetch("https://6345f26639ca915a690abd6b.mockapi.io/app/producto")
    .then((res) => res.json())
    .then((productosResponse) => {
        products = productosResponse
        console.log(products);
    })
    .catch( err => generarAlert(err, error))
};

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
function main() {
    initEventos();
    initAcciones();
    consultaApi();
}
main()