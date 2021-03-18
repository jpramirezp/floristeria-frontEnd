//FORMA DE UTILIZAR LIBRERIAS JAVASCRIPT EN TYPESCRIPT PURO - SE DEBE HABER CARGADO EN EL HTML LA LIBRERIA
//SOLO SE CREA UNA VARIABLE GLOBAL CON EL NOMBRE DE LA LIBRERIA
declare var swal: any;

class Proveedores {

    pID_Prov = <HTMLInputElement>document.getElementById('inputID');
    pNom_Prov = <HTMLInputElement>document.getElementById('inputNombre');
    pApe_Prov = <HTMLInputElement>document.getElementById('inputApellido');
    pDir_Prov = <HTMLInputElement>document.getElementById('inputDireccion');
    pCorreo_Prov = <HTMLInputElement>document.getElementById('inputEmail');
    pNoID_Prov = <HTMLInputElement>document.getElementById('inputIdentidad');
    pTel_Prov = <HTMLInputElement>document.getElementById('inputTelefono');

//Crea propiedades los botones
    btnRegistrar = <HTMLButtonElement>document.getElementById('btnRegistrar');
    btnEliminar = <HTMLButtonElement>document.getElementById('btnEliminar');
    btnModificar = <HTMLButtonElement>document.getElementById('btnModificar');


    Proveedores: IProveedores[] = [];
    bodyListaProveedores = <HTMLTableElement>document.getElementById('bodyListaProveedores');

    constructor() {
    }


    postProveedores(opcion?:any) {
        
        //decide a que ruta enviar'  1=Registro nuevo, 2= Actualizacion
        let URL
        if(opcion==1){
             URL= "http://localhost:3500/api/proveedores/postProveedores"
        }else{
            URL = "http://localhost:3500/api/proveedores/putProveedor"
        }

        
        //Se arma el Objeto que se enviara en el BODY
        const datos = {
            pOpcion: opcion,                            //opcion=1 Registrar, opcion=2 Actualizar   
            pID_Prov: this.pID_Prov.value ? this.pID_Prov.value :'0',      
            pNom_Prov: this.pNom_Prov.value,
            pApe_Prov: this.pApe_Prov.value,
            pDir_Prov: this.pDir_Prov.value,
            pCorreo_Prov:this.pCorreo_Prov.value,
            pNoID_Prov:'vacio',
            pTel_Prov:this.pTel_Prov.value
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
                    proveedor.getproveedores()
                     //deshabilita los botones
                    this.btnRegistrar.disabled=true
                    this.btnEliminar.disabled=true
                    this.btnModificar.disabled=true
                })                               
                else
                swal("Error", "Ocurrio un problema al guardar el registro", "error");   //error               
            })
    };
   
    
    //Llena la Tabla de Proveedores
    getproveedores() {
        let URL = "http://localhost:3500/api/proveedores/getProveedores"
        //Metodo para llamar APIS, se le envia el body en formato JSON
        fetch(URL, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(res => {
                this.Proveedores = res as IProveedores[]
                
                //limpia siempre la tabla
                this.bodyListaProveedores.innerHTML = '' 

                //llena de manera dinamica la tabla
                this.Proveedores.forEach((prov,index) => {                          
                    this.bodyListaProveedores.innerHTML += `
            <tr>
            <td>${prov.id}</td>
            <td>${prov.Nom_Prov}</td>
            <td>${prov.Ape_Prov}</td>
            <td>${prov.Tel_Prov}</td>    
            <td>
            <button type="button" id="btnSelect${index}" class="btn btn-info btn-sm" title="Seleccionar" onclick="proveedor.seleccionarProveedor(${prov.id})">
            <i class="fa fa-list"></i>
            </button>
            </td>       
          </tr>
            `
                })
            })
    }

    seleccionarProveedor(prov:any){
        //Filtra del array principal el Id Seleccionado  
        let proveedorSeleccionado = this.Proveedores.filter(proveedor=> proveedor.id==prov)
        
        //luego llena los textbox, usando el operador condicional ? para evitar el error de nulos
        this.pID_Prov.value=proveedorSeleccionado[0].id ? proveedorSeleccionado[0].id :''
        this.pNom_Prov.value=proveedorSeleccionado[0].Nom_Prov ? proveedorSeleccionado[0].Nom_Prov :''
        this.pApe_Prov.value=proveedorSeleccionado[0].Ape_Prov ? proveedorSeleccionado[0].Ape_Prov :''
        this.pDir_Prov.value=proveedorSeleccionado[0].Dir_Prov ? proveedorSeleccionado[0].Dir_Prov :''
        this.pCorreo_Prov.value=proveedorSeleccionado[0].Correo_Prov ? proveedorSeleccionado[0].Correo_Prov :''
        this.pNoID_Prov.value=proveedorSeleccionado[0].NoID_Prov ? proveedorSeleccionado[0].NoID_Prov :''       
        this.pTel_Prov.value=proveedorSeleccionado[0].Tel_Prov ? proveedorSeleccionado[0].Tel_Prov :''       
        
        //habilita los botones
        this.btnEliminar.disabled=false
        this.btnModificar.disabled=false
        this.btnRegistrar.disabled=true
    }

    // Eliminar Producto
  deleteProveedor() {    
    let URL = "http://localhost:3500/api/proveedores/deleteProveedor"

    const datos = {
      pID_Prov: this.pID_Prov.value      
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
          alert('Proveedor eliminado');
          
          //recarga la lista
           proveedor.getproveedores()

          //limpia
          proveedor.limpiar()

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
        this.pID_Prov.value=''
        this.pNom_Prov.value=''
        this.pApe_Prov.value=''
        this.pDir_Prov.value=''
        this.pCorreo_Prov.value=''
        this.pNoID_Prov.value=''
        this.pTel_Prov.value=''
        
        //habilita el boton registrar
        this.btnRegistrar.disabled=false
        this.btnEliminar.disabled=true
        this.btnModificar.disabled=true
    }

};


const proveedor = new Proveedores()

//Carga Inicial
window.onload = () => {
   proveedor.getproveedores()
}