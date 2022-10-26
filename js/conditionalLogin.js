let condicionalLogin;

function initElementos(){
    condicionalLogin= document.getElementById("conditionaLogin")
}

function verifyLogin(){
    if(sessionStorage.getItem("login") == "true"){
       condicionalLogin.innerHTML=`<section class="titleList">
       <div class="container text-center">
           <div class="row justify-content-center mt-5">
       
               <h2>Sistema de Stock</h2>
       
           </div>
       </div>
       <div class="row justify-content-center">
           <div class="col-md-3">
               <h3 class="text-center">Carga de productos</h3>
               <form id="formularioCarga">
       
                   <div class="mb-3 align-text-left">
                       <label class="form-label ">Nombre</label>
                       <input type="text" class="form-control" id="inputName"
                           placeholder="Ingrese el nombre del producto" required>
                   </div>
       
                   <div class="mb-3">
                       <label class="form-label">Costo</label>
                       <input type="number" class="form-control" id="inputCosto"
                           placeholder="Ingrese el precio de costo del producto" min=1 required />
                   </div>
       
                   <div class="mb-3">
                       <label class="form-label">Venta</label>
                       <input type="number" class="form-control" id="inputVenta"
                           placeholder="Ingrese el precio de Venta del producto" min=1 required />
                   </div>
       
                   <div class="mb-3">
                       <label class="form-label">Cantidad</label>
                       <input type="number" class="form-control" id="inputCantidad" placeholder="Cantidad ingresada"
                           required />
                   </div>
       
                   <div class="mb-3 text-left">
                       <label class="form-label">Descripcion producto</label>
                       <textarea class="form-control" id="inputDescripcion" rows="3"></textarea>
       
                   </div>
                   <div class="mb-3 text-center">
                       <button type="submit" class="btn btn-primary">Registrar</button>
                   </div>
               </form>
           </div>
       </div>
       
       
       </section>
       <div class="container">
       <div class="row justify-content-center text-center" id="resultado__Carga">
       
       </div>
       </div>
       
       <div class="stock">
       <div class="container mb-5 py-0">
           <div class="row mb-5" id="muestra__Stock">
       
       
           </div>
       </div>
       </div>`;
       condicionalLogin.append();
    }else{
        console.error("USER NOT LOGED");
    }
}

function main(){
    verifyLogin();
}

main();