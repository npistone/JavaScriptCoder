class Producto {
    constructor(id, nombre, precioCompra, precioVenta, cantidad) {
        this.id = id;
        this.nombre = nombre.toLowerCase();
        this.precioCompra = precioCompra;
        this.precioVenta = precioVenta;
        this.cantidad = cantidad;
    }

}

function validarString(palabra, bandera) {
    if (palabra === '' || palabra === null) {
        bandera = true;
    } else {
        bandera = false
    }
    return bandera
}

function validarNumero(numero, bandera) {
    if (numero == 0 || isNaN(numero)) {
        bandera = true
    } else {
        bandera = false
    }
    return bandera
}

function agregarProducto(productos) {

    let numeroProductos = parseInt(
        prompt("Cuantos productos se van a registar")
    );

    for (let index = 0; index < numeroProductos; index++) {

        let bandera = false;
        let id;
        let nombre;
        let precioVenta;
        let precioCompra;
        let cantidad;

        do {
            id = productos.length + 1;
            nombre = prompt("Ingrese nombre")
            bandera = validarString(nombre)

            if (bandera) {
                alert("•Valor ingresado invalido. \n•Cargue nuevamente el producto")
                index = -1
                break
            }

            precioCompra = parseFloat(prompt("Ingrese el precio compra"))
            bandera = validarNumero(precioCompra)
            if (bandera) {
                alert("•Valor ingresado invalido. \n•Cargue nuevamente el producto")
                index = -1
                break
            }

            precioVenta = parseFloat(prompt("Ingrese el precio venta"))
            bandera = validarNumero(precioVenta)
            if (bandera) {
                alert("•Valor ingresado invalido. \n•Cargue nuevamente el producto")
                index = -1
                break
            }

            cantidad = parseInt(prompt("Ingrese la cantidad"))
            bandera = validarNumero(cantidad)
            if (bandera) {
                alert("•Valor ingresado invalido. \n•Cargue nuevamente el producto")
                index = -1
                break
            }
            let existeProducto = productos.some((producto) => producto.nombre === nombre)
            if(existeProducto){
                alert("Ya hay un producto registrado con ese nombre");
                index = -1
                break
            }

            let productoARegistrar = new Producto(id, nombre, precioCompra, precioVenta, cantidad);

            productos.push(productoARegistrar)

            alert("-Producto registrado-")

        } while (bandera)



    }

    return productos
}

function mostrarStock(productos) {
    for (let producto of productos) {

        alert(producto.id + "- " + producto.nombre.toUpperCase() + " [stock: " + producto.cantidad + "]")
    }
}

function buscarProducto(productos){

}


function main() {
    let opcion = 0
    let productos = []
    let producto1 = new Producto(1, "lapiz", 10, 20, 10)
    let producto2 = new Producto(2, "lapicera", 20, 25, 5)
    let producto3 = new Producto(3, "goma", 10, 12, 8)
    productos.push(producto1, producto2, producto3);
    do {
        do {
            opcion = parseInt(prompt("  ====  MENU  ==== \n 1- Carga de productos \n 2- Mostrar stock \n 3- Buscar producto \n 4- Salir"))

        } while (opcion > 4 || opcion < 1 || opcion == NaN)

        switch (opcion) {
            case 1:
                productos = agregarProducto(productos)
                break;
            case 2:
                if (productos.length < 1) {
                    alert("No hay productos registrados")
                } else {
                    mostrarStock(productos)
                }
                break;
            case 3:
                break;
            default:
                break;
        }
    } while (opcion != 4)

    alert("System down")
}

main()