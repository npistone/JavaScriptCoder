const { jsPDF } = window.jspdf;

let precioMin;
let precioMax;
let nombreABuscar;
let muestraResultado;
let formPrecios;
let formNombre;
let showCarrito;
let generarPresup;
let limpiarPresup;
let presupuesto = [];
let cerrarSesion;



class Producto {
    constructor(id, nombre, precioCompra, precioVenta, cantidad, descripcion) {
        this.id = id;
        this.nombre = nombre;
        this.precioCompra = precioCompra;
        this.precioVenta = precioVenta;
        this.cantidad = cantidad;
        this.descripcion = descripcion;
    }}


function initEventos() {

    formPrecios = document.getElementById("busquedaPrecio")
    formNombre = document.getElementById("busquedaNombre")
    precioMin = document.getElementById("precioMin")
    precioMax = document.getElementById("precioMax")
    nombreABuscar = document.getElementById("nombreABuscar")
    muestraResultado = document.getElementById("muestra_Resultado")
    showCarrito = document.getElementById("mostrarCarrito")
    generarPresup = document.getElementById("generarPresupuesto")
    limpiarPresup = document.getElementById("vaciarPresupuesto")
    cerrarSesion = document.getElementById("loguot")

}
function initAcciones() {
    formPrecios.onsubmit = (evento) => buscarPorPrecios(evento);
    formNombre.onsubmit = (eventoX) => buscarPorNombre(eventoX);
    generarPresup.onclick = (eventoY) => finalizarCarrito(eventoY);
    limpiarPresup.onclick = (eventoZ) => limpiarCarrito(eventoZ);
    cerrarSesion.onclick = (eventoX)=> cerrarPrograma(eventoX)

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



function buscarlocalStorage() {


    let buscaStorage = localStorage.getItem("carritoCompras");
    console.log(buscaStorage);
    if (buscaStorage !=null) {
        let carritoJson = JSON.parse(buscaStorage)
        insertarCarrito(carritoJson);
    }

}
function cerrarPrograma(evento){
    localStorage.clear();
    window.location.replace("/index.html")
    
}

function limpiarCarrito(evento){
    localStorage.removeItem("carritoCompras");    
    window.location.replace("/busqueda.html")
    
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

                    <span class="float-start badge rounded-pill bg-info fs-5"
                        style="width: 20rem ;">${producto.nombre}</span>

                </div>
                <div>
                    <h5 class="card-title">
                        Cantidad disponible :${producto.cantidad}
                        <br>Precio de venta :${producto.precioVenta}
                    </h5>
                </div>

                Descripcion :${producto.descripcion}
                <div class="container d-flex align-items-center justify-content-center mt-5">
                    <div>
                        <button type="button" class="btn btn-success btn-sm" id="addProduct-${producto.id}">Agregar al
                            presupuesto</button>
                    </div>
                </div>

            </div>

        </div>`;

        muestraResultado.append(column);
        let agregarCarrito = document.getElementById(`addProduct-${producto.id}`)
        agregarCarrito.onclick = () => agregarCarritoProd(producto);
    });

}

function agregarCarritoProd(producto) {

    console.log(typeof producto, producto);

    let getJson = localStorage.getItem('carritoCompras')
    

    let carrito = JSON.parse(getJson)
    console.log(carrito);
    if (carrito == null || carrito.length == 0) {
        carrito= []
        carrito.push(producto);
       
        generarAlert(producto.nombre + " agrega correctamente", "success")
        insertarCarrito(carrito)

        console.log("carrito antes de agregar producto "+ carrito[0]);
        let transformarAJson = JSON.stringify(carrito);
        localStorage.setItem('carritoCompras', transformarAJson)
    } else {
        let existente = carrito.some((product) => product.nombre == producto.nombre)
        if (existente) {
            generarAlert("El producto ya se encuentra en el carrito", "error")
        } else {
            carrito.push(producto);
            console.log("agrega carrito" + carrito);
            generarAlert(producto.nombre + " agrega correctamente", "success")
            insertarCarrito(carrito)
            let transformarAJson = JSON.stringify(carrito);
            localStorage.setItem('carritoCompras', transformarAJson)

        }

    }
}
    function insertarCarrito(productos) {
        showCarrito.innerHTML = "";

        productos.forEach((producto) => {
            const row = document.createElement('tr');
            row.id = `row-${producto.id}`
            row.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.precioVenta}</td>
            <td>
            <input id="cantidadComprada-${producto.id}" type="number" placeholder="Cantidad" min=0 required>
            </td>
            <td>
            <button type="button" class="btn btn-success btn-sm" id="confirm-Cantidad-${producto.id}">Agregar</button>
            </td>
            <td>
            <button type="button" class="btn btn-danger btn-sm" id="remove-${producto.id}">Eliminar</button>
            </td>
            
        `;
            showCarrito.append(row);

            let botonAgregar = document.getElementById(`confirm-Cantidad-${producto.id}`)
            let eliminarProd = document.getElementById(`remove-${producto.id}`)
            eliminarProd.onclick = () => eliminarProductoCarrito(`${producto.id}`)
            botonAgregar.onclick = () => agregarCantidadPresupuesto(`${producto.id}`)
        });


    }

    function eliminarProductoCarrito(idProducto) {

        let eliminarRow = document.getElementById(`row-${idProducto}`);
        let productosJSON = localStorage.getItem('carritoCompras');
        let productos = JSON.parse(productosJSON);

        let idProdABorrar = productos.findIndex((producto) => (producto.id) == (idProducto))
        productos.splice(idProdABorrar, 1);
        eliminarRow.remove();

        generarAlert("Producto eliminado", "success")
        let transformarAJson = JSON.stringify(productos);
        localStorage.setItem('carritoCompras', transformarAJson)

    }

    function agregarCantidadPresupuesto(idProducto) {

        let cantComprada = document.getElementById(`cantidadComprada-${idProducto}`)
        let cant = cantComprada.value;


        let productosJSON = localStorage.getItem("carritoCompras")
        let productos = {}
        productos = JSON.parse(productosJSON)

        console.log(productos);
        let indexProducto = productos.findIndex((producto) => (producto.id.toString()) == (idProducto))

        let productoUpdate = []
        productoUpdate = productos[indexProducto]
        console.log(productoUpdate);
        productoUpdate.cantidadPresupuesto = cant

        productos.splice(indexProducto, 1);
        productos.push(productoUpdate)
        console.log("produsctosadd " + productos);
        generarAlert("Cantidad agregada", "success")
        let transformarAJson = JSON.stringify(productos);
        localStorage.setItem("carritoCompras", transformarAJson)

        console.log("transformacion productos"+ transformarAJson);


    }
    function finalizarCarrito(eventoY){

        let productosJSON = localStorage.getItem("carritoCompras")
        let productos = JSON.parse(productosJSON)
        
        if(productos == null|| productos.length == 0){
            generarAlert("No hay productos para generar presupuesto", "error")
        }else{
            let bandera = false;
          
            for (let index = 0; index < productos.length; index++) {
                if(!("cantidadPresupuesto" in productos[index])){
                    bandera = true;
                }           
            }
            if(bandera){
                generarAlert("No ingreso la cantidad en alguno de los productos, vuelva a hacerlo", "error")
            }else{
                
                let calculo = [];
                calculo =calculoPresupuesto();
                console.log(calculo);
                crearPdf(calculo);
            }

            
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
            generarAlert("El nombre ingresado no es v??lido", "error")
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

    function calculoPresupuesto(){
        let presupuesto = [];
   
        let getLocal = localStorage.getItem('carritoCompras')
    
        if(getLocal == null ){
            console.log("presupuesto vacio");
        }else{
            let parseCarrito = JSON.parse(getLocal);
            
           
            for (let index = 0; index < parseCarrito.length; index++) {
                let elemento = {};
                elemento.nombre = parseCarrito[index].nombre;
                elemento.cantidad = parseCarrito[index].cantidadPresupuesto
                elemento.precio = Number(parseCarrito[index].precioVenta) * Number(parseCarrito[index].cantidadPresupuesto)
                console.log(elemento.precio);
                presupuesto.push(elemento)            
            }
    
            precioTotal = presupuesto.reduce((acu, presupuesto)=>{
                return acu + presupuesto.precio
            },0 )
            
            console.log(precioTotal);
    
            console.log(presupuesto);
        
        }

        return presupuesto
    
    }

    function crearPdf( presupuesto ){
        let titulo = "Presupuesto Tienda End-P???int ??";
        let doc = new jsPDF();
    
        doc.setFontSize(20);
        doc.setFont("courier", "normal");
        doc.text("Presupuesto Tienda End-Point", 10 ,15);
        doc.setLineWidth(0.5);
        doc.line(10, 20, 200, 20);
        
        doc.setFontSize(14);
        doc.setFont("courier", "normal");
        doc.text("Producto", 10 ,30);
        
        doc.setFontSize(14);
        doc.setFont("courier", "normal");
        doc.text("Cantidad", 80 ,30);
        
        doc.setFontSize(14);
        doc.setFont("courier", "normal");
        doc.text("Subtotal", 170 ,30);
    
        let moverY = 30;
        for (let index = 0; index < presupuesto.length; index++) {
            moverY +=10
            
            doc.setFontSize(14);
            doc.setFont("courier", "normal");
            doc.text(presupuesto[index].nombre , 10 ,moverY);
            
            doc.setFontSize(14);
            doc.setFont("courier", "normal");
            doc.text(presupuesto[index].cantidad, 80 ,moverY);
            
            doc.setFontSize(14);
            doc.setFont("courier", "normal");
            doc.text((presupuesto[index].precio).toString(), 170 ,moverY);
            
        }
    
        doc.line(10, 280, 200, 280);
        doc.text("Total $", 160, 290 );
        doc.text(precioTotal.toString(), 180, 290 );
        let getApellido = localStorage.getItem("userLast")
        let nombre = "presupuesto-"+getApellido+".pdf"
        doc.save(nombre)
    
    }



    function main() {

        initEventos();
        initAcciones();
        buscarlocalStorage();
    }

    main()