//FORMA DE UTILIZAR LIBRERIAS JAVASCRIPT EN TYPESCRIPT PURO - SE DEBE HABER CARGADO EN EL HTML LA LIBRERIA
//SOLO SE CREA UNA VARIABLE GLOBAL CON EL NOMBRE DE LA LIBRERIA
declare var swal: any;

class Empleados {
   
    pID_Emp = <HTMLInputElement>document.getElementById('inputID');
    pNom_Emp = <HTMLInputElement>document.getElementById('inputNombre');
    pApe_Emp = <HTMLInputElement>document.getElementById('inputApellido');
    pNoID_Emp = <HTMLInputElement>document.getElementById('inputIdentidad');
    pTel_Emp = <HTMLInputElement>document.getElementById('inputTelefono');
    pCargo_Emp = <HTMLInputElement>document.getElementById('inputCargo');
    pArea_Emp = <HTMLInputElement>document.getElementById('inputArea');
    pDir_Emp = <HTMLInputElement>document.getElementById('inputDireccion');
    pEstado_Emp = <HTMLInputElement>document.getElementById('inputEstado');
    pFec_Ingreso = <HTMLInputElement>document.getElementById('inputFecIngreso');
    pFec_Salida = <HTMLInputElement>document.getElementById('inputFecSalida');

    //Crea propiedades los botones
    btnRegistrar = <HTMLButtonElement>document.getElementById('btnRegistrar');
    btnEliminar = <HTMLButtonElement>document.getElementById('btnEliminar');
    btnModificar = <HTMLButtonElement>document.getElementById('btnModificar');


    Empleados: IEmpleados[] = [];
    bodyListaEmpleados = <HTMLTableElement>document.getElementById('bodyListaEmpleados');

    constructor() {
    }


    postEmpleado(opcion?:any) {
        
        //decide a que ruta enviar'  1=Registro nuevo, 2= Actualizacion
        let URL
        if(opcion==1){
             URL= "http://localhost:3500/api/empleados/postEmpleado"
        }else{
            URL = "http://localhost:3500/api/empleados/putEmpleado"
        }

        
        //Se arma el Objeto que se enviara en el BODY
        const datos = {
            pOpcion: opcion,                            //opcion=1 Registrar, opcion=2 Actualizar   
            pID_Emp: this.pID_Emp.value ? this.pID_Emp.value :'0',      
            pNom_Emp: this.pNom_Emp.value,
            pApe_Emp: this.pApe_Emp.value,
            pNoID_Emp: 'vacio',
            pTel_Emp:this.pTel_Emp.value,
            pCargo_Emp:this.pCargo_Emp.value,
            pArea_Emp:this.pArea_Emp.value,
            pDir_Emp:this.pDir_Emp.value,
            pEstado_Emp:this.pEstado_Emp.value,
            pFec_Ingreso:this.pFec_Ingreso.value,
            pFec_Salida:this.pFec_Salida.value
            
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
                    empleado.getempleados()
                     //deshabilita los botones
                    this.btnRegistrar.disabled=true
                    this.btnEliminar.disabled=true
                    this.btnModificar.disabled=true
                })                               
                else
                swal("Error", "Ocurrio un problema al guardar el registro", "error");   //error               
            })
    };
   
    
    //Llena la Tabla de Empleados
    getempleados() {
        let URL = "http://localhost:3500/api/empleados/getempleados"
        //Metodo para llamar APIS, se le envia el body en formato JSON
        fetch(URL, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(res => {
                this.Empleados = res as IEmpleados[]
                
                //limpia siempre la tabla
                this.bodyListaEmpleados.innerHTML = '' 

                //llena de manera dinamica la tabla
                this.Empleados.forEach((emp,index) => {                          
                    this.bodyListaEmpleados.innerHTML += `
            <tr>
            <td>${emp.id}</td>
            <td>${emp.Nom_Emp}</td>
            <td>${emp.Ape_Emp}</td>
            <td>${emp.Area_Emp}</td>
            <td>${emp.NoID_Emp}</td>
            <td>${emp.Cargo_Emp}</td>
            <td>${emp.Estado_Emp}</td>    
            <td>
            <button type="button" id="btnSelect${index}" class="btn btn-info btn-sm" title="Seleccionar" onclick="empleado.seleccionarEmpleado(${emp.id})">
            <i class="fa fa-list"></i>
            </button>
            </td>       
          </tr>
            `
                })
            })
    }

    seleccionarEmpleado(emp:any){
        //Filtra del array principal el Id Seleccionado  
        let empleadoSeleccionado = this.Empleados.filter(empleado=> empleado.id==emp)
        
        //luego llena los textbox, usando el operador condicional ? para evitar el error de nulos
        this.pID_Emp.value=empleadoSeleccionado[0].id ? empleadoSeleccionado[0].id :''
        this.pNom_Emp.value=empleadoSeleccionado[0].Nom_Emp ? empleadoSeleccionado[0].Nom_Emp :''
        this.pApe_Emp.value=empleadoSeleccionado[0].Area_Emp ? empleadoSeleccionado[0].Area_Emp :''
        this.pNoID_Emp.value=empleadoSeleccionado[0].Ape_Emp ? empleadoSeleccionado[0].Ape_Emp :''
        this.pTel_Emp.value=empleadoSeleccionado[0].Tel_Emp ? empleadoSeleccionado[0].Tel_Emp :''
        this.pCargo_Emp.value=empleadoSeleccionado[0].Cargo_Emp ? empleadoSeleccionado[0].Cargo_Emp :''  
        this.pArea_Emp.value=empleadoSeleccionado[0].Area_Emp ? empleadoSeleccionado[0].Area_Emp :''      
        this.pDir_Emp.value=empleadoSeleccionado[0].Dir_Emp ? empleadoSeleccionado[0].Dir_Emp :''      
        this.pEstado_Emp.value=empleadoSeleccionado[0].Estado_Emp ? empleadoSeleccionado[0].Estado_Emp :''
        this.pFec_Ingreso.value=empleadoSeleccionado[0].Fec_Ingreso ? empleadoSeleccionado[0].Fec_Ingreso :''      
        this.pFec_Salida.value=empleadoSeleccionado[0].Fec_Salida ? empleadoSeleccionado[0].Fec_Salida :''            
        
        //habilita los botones
        this.btnEliminar.disabled=false
        this.btnModificar.disabled=false
        this.btnRegistrar.disabled=true
    }

    // Eliminar Empleado
  deleteEmpleado() {    
    let URL = "http://localhost:3500/api/empleados/deleteEmpleado"

    const datos = {
      pID_Emp: this.pID_Emp.value      
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
          alert('Empleado eliminado');
          
          //recarga la lista
           empleado.getempleados()

          //limpia
          empleado.limpiar()

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
        this.pID_Emp.value=''
        this.pNom_Emp.value=''
        this.pApe_Emp.value=''
        this.pNoID_Emp.value='0'
        this.pTel_Emp.value=''
        this.pCargo_Emp.value='' 
        this.pArea_Emp.value='0'
        this.pDir_Emp.value='0'
        this.pEstado_Emp.value='0'
        this.pFec_Ingreso.value='0'
        this.pFec_Salida.value='0'
        
        //habilita el boton registrar
        this.btnRegistrar.disabled=false
        this.btnEliminar.disabled=true
        this.btnModificar.disabled=true
    }

};


const empleado = new Empleados()

//Carga Inicial
window.onload = () => {
   empleado.getempleados()
}