//FORMA DE UTILIZAR LIBRERIAS JAVASCRIPT EN TYPESCRIPT PURO - SE DEBE HABER CARGADO EN EL HTML LA LIBRERIA
//SOLO SE CREA UNA VARIABLE GLOBAL CON EL NOMBRE DE LA LIBRERIA
declare var swal: any;

class Productos {

    //Crea propiedades a partir de los controles INPUTS
    pID= <HTMLInputElement>document.getElementById('inputID');
    pNom_Prod = <HTMLInputElement>document.getElementById('inputNombre');
    pTipo_Prod = <HTMLInputElement>document.getElementById('inputTipo');
    pCant_Prod = <HTMLInputElement>document.getElementById('inputCantidad');
    pNoID_Prod= <HTMLInputElement>document.getElementById('inputCodigoBarra');
    pDescripcion= <HTMLInputElement>document.getElementById('inputDescripcion');
    pURL_imagen= <HTMLInputElement>document.getElementById('inputURL');
    pPrecio= <HTMLInputElement>document.getElementById('inputPrecio');

    //Crea propiedades los botones
    btnRegistrar = <HTMLButtonElement>document.getElementById('btnRegistrar');
    btnEliminar = <HTMLButtonElement>document.getElementById('btnEliminar');
    btnModificar = <HTMLButtonElement>document.getElementById('btnModificar');


    Productos: IProductos[] = [];
    bodyListaProductos = <HTMLTableElement>document.getElementById('bodyListaProductos');

    constructor() {
    }


    postProducto(opcion?:any) {
        
        //decide a que ruta enviar'  1=Registro nuevo, 2= Actualizacion
        let URL
        if(opcion==1){
             URL= "http://localhost:3500/api/productos/postProducto"
        }else{
            URL = "http://localhost:3500/api/productos/putProducto"
        }

        
        //Se arma el Objeto que se enviara en el BODY
        const datos = {
            pOpcion: opcion,                            //opcion=1 Registrar, opcion=2 Actualizar   
            pID: this.pID.value ? this.pID.value :'0',      
            pNom_Prod: this.pNom_Prod.value,
            pTipo_Prod: this.pTipo_Prod.value,
            pCant_Prod: this.pCant_Prod.value,
            pNoID_Prod:'vacio',
            pDescripcion:this.pDescripcion.value,
            pURL_imagen:this.pURL_imagen.value,
            pPrecio:this.pPrecio.value
        }

        //Metodo para llamar APIS, se le envia el body en formato JSON
        fetch(URL, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
            .then(res => res.json())
            .then(res => {
                if(res.status=='OK')
                swal("Completado", "Registro actualizado", "success").then((res: any)=>{
                    //recarga la lista
                    producto.getproductos()
                     //deshabilita los botones
                    this.btnRegistrar.disabled=true
                    this.btnEliminar.disabled=true
                    this.btnModificar.disabled=true
                })                               
                else
                swal("Error", "Ocurrio un problema al guardar el registro", "error");   //error               
            })
    };
   
    
    //Llena la Tabla de Productos
    getproductos() {
        let URL = "http://localhost:3500/api/productos/getProductos"
        //Metodo para llamar APIS, se le envia el body en formato JSON
        fetch(URL, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(res => {
                this.Productos = res as IProductos[]
                
                //limpia siempre la tabla
                this.bodyListaProductos.innerHTML = '' 

                //llena de manera dinamica la tabla
                this.Productos.forEach((prod,index) => {                          
                    this.bodyListaProductos.innerHTML += `
            <tr>
            <td>${prod.id}</td>
            <td>${prod.Nom_Prod}</td>
            <td>${prod.Cant_Prod}</td>
            <td>${prod.Precio}</td>    
            <td>
            <button type="button" id="btnSelect${index}" class="btn btn-info btn-sm" title="Seleccionar" onclick="producto.seleccionarProducto(${prod.id})">
            <i class="fa fa-list"></i>
            </button>
            </td>       
          </tr>
            `
                })
            })
    }

    seleccionarProducto(prod:any){
        //Filtra del array principal el Id Seleccionado  
        let productoSeleccionado = this.Productos.filter(producto=> producto.id==prod)
        
        //luego llena los textbox, usando el operador condicional ? para evitar el error de nulos
        this.pID.value=productoSeleccionado[0].id ? productoSeleccionado[0].id :''
        this.pNom_Prod.value=productoSeleccionado[0].Nom_Prod ? productoSeleccionado[0].Nom_Prod :''
        this.pTipo_Prod.value=productoSeleccionado[0].Tipo_Prod ? productoSeleccionado[0].Tipo_Prod :''
        this.pCant_Prod.value=productoSeleccionado[0].Cant_Prod ? productoSeleccionado[0].Cant_Prod :''
        this.pDescripcion.value=productoSeleccionado[0].Descripcion ? productoSeleccionado[0].Descripcion :''
        this.pURL_imagen.value=productoSeleccionado[0].URL_Imagen ? productoSeleccionado[0].URL_Imagen :''  
        this.pPrecio.value=productoSeleccionado[0].Precio ? productoSeleccionado[0].Precio :''      
        
        //habilita los botones
        this.btnEliminar.disabled=false
        this.btnModificar.disabled=false
        this.btnRegistrar.disabled=true
    }

    // Eliminar Producto
  deleteProducto() {    
    let URL = "http://localhost:3500/api/productos/deleteProducto"

    const datos = {
      pID: this.pID.value      
    }

    //Metodo para llamar APIS, se le envia el body en formato JSON
    fetch(URL, {
      method: 'POST',
      body: JSON.stringify(datos),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.status == 'OK') {
          // Swal.fire("Completado", "Registro actualizado", "success");             
          alert('Producto eliminado');
          
          //recarga la lista
           producto.getproductos()

          //limpia
          producto.limpiar()

          //deshabilitar botones
          this.btnEliminar.disabled=true
          this.btnModificar.disabled=true
          
        } else {
          console.log("todo mal");
          alert('No se elimino el registro');
        }
      })
  };

 limpiar(){
        this.pID.value=''
        this.pNom_Prod.value=''
        this.pTipo_Prod.value=''
        this.pCant_Prod.value='0'
        this.pDescripcion.value=''
        this.pURL_imagen.value='' 
        this.pPrecio.value='0'
        
        //habilita el boton registrar
        this.btnRegistrar.disabled=false
        this.btnEliminar.disabled=true
        this.btnModificar.disabled=true
    }

};


const producto = new Productos()

//Carga Inicial
window.onload = () => {
   producto.getproductos()
   if (!validarSeguridad()){    
    window.location.href="../Autenticacion/login.html";  
   }else{
      let usuarioLabel = <HTMLLabelElement>document.getElementById('lblTipoUsuario')
      let contenido:any=localStorage.getItem('userLogin') ? localStorage.getItem('userLogin') : 'Usuario'
      usuarioLabel.innerHTML=contenido
   }
}