//FORMA DE UTILIZAR LIBRERIAS JAVASCRIPT EN TYPESCRIPT PURO - SE DEBE HABER CARGADO EN EL HTML LA LIBRERIA
//SOLO SE CREA UNA VARIABLE GLOBAL CON EL NOMBRE DE LA LIBRERIA
declare var swal: any;

class Usuarios {

  pID_Usuario = <HTMLInputElement>document.getElementById('inputID');
  pNom_Usuario = <HTMLInputElement>document.getElementById('inputNombre');
  pApe_Usuario = <HTMLInputElement>document.getElementById('inputApellido');
  pNoID_Usuario = <HTMLInputElement>document.getElementById('inputIdentidad');
  pTipo_Usuario = <HTMLInputElement>document.getElementById('inputTipo');
  pArea_Usuario = <HTMLInputElement>document.getElementById('inputArea');
  pUser_Usuario = <HTMLInputElement>document.getElementById('inputUsuario');
  pClave_Usuario = <HTMLInputElement>document.getElementById('inputClave');

  //Crea propiedades los botones
  btnRegistrar = <HTMLButtonElement>document.getElementById('btnRegistrar');
  btnEliminar = <HTMLButtonElement>document.getElementById('btnEliminar');
  btnModificar = <HTMLButtonElement>document.getElementById('btnModificar');


  Usuarios: IUsuarios[] = [];
  bodyListaUsuarios = <HTMLTableElement>document.getElementById('bodyListaUsuarios');

  constructor() {
  }

  postUsuario(opcion?:any) {
        
    //decide a que ruta enviar'  1=Registro nuevo, 2= Actualizacion
    let URL
    if(opcion==1){
         URL= "http://localhost:3500/api/usuarios/postUsuario"
    }else{
        URL = "http://localhost:3500/api/usuarios/putUsuario"
    }

    
    //Se arma el Objeto que se enviara en el BODY
    const datos = {
        pOpcion: opcion,                            //opcion=1 Registrar, opcion=2 Actualizar   
        pID_Usuario: this.pID_Usuario.value ? this.pID_Usuario.value :'0',      
        pNom_Usuario: this.pNom_Usuario.value,
        pApe_Usuario: this.pApe_Usuario.value,
        pNoID_Usuario: 'vacio',
        pTipo_Usuario:this.pTipo_Usuario.value,
        pArea_Usuario:this.pArea_Usuario.value,
        pUser_Usuario:this.pUser_Usuario.value,
        pClave_Usuario:this.pClave_Usuario.value
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
                usuario.getusuarios()
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
  getusuarios() {
    let URL = "http://localhost:3500/api/usuarios/getUsuarios"
    //Metodo para llamar APIS, se le envia el body en formato JSON
    fetch(URL, {
        method: 'GET'
    })
        .then(res => res.json())
        .then(res => {
            this.Usuarios = res as IUsuarios[]
            
            //limpia siempre la tabla
            this.bodyListaUsuarios.innerHTML = '' 

            //llena de manera dinamica la tabla
            this.Usuarios.forEach((us,index) => {                          
                this.bodyListaUsuarios.innerHTML += `
        <tr>
        <td>${us.id}</td>
        <td>${us.Nom_Usuario}</td>
        <td>${us.Ape_Usuario}</td>
        <td>${us.Tipo_Usuario}</td>    
        <td>
        <button type="button" id="btnSelect${index}" class="btn btn-info btn-sm" title="Seleccionar" onclick="usuario.seleccionarUsuario(${us.id})">
        <i class="fa fa-list"></i>
        </button>
        </td>       
      </tr>
        `
            })
        })
}

seleccionarUsuario(us:any){
  //Filtra del array principal el Id Seleccionado  
  let usuarioSeleccionado = this.Usuarios.filter(usuario=> usuario.id==us)
  
  //luego llena los textbox, usando el operador condicional ? para evitar el error de nulos
  this.pID_Usuario.value=usuarioSeleccionado[0].id ? usuarioSeleccionado[0].id :''
  this.pNom_Usuario.value=usuarioSeleccionado[0].Nom_Usuario ? usuarioSeleccionado[0].Nom_Usuario :''
  this.pApe_Usuario.value=usuarioSeleccionado[0].Ape_Usuario ? usuarioSeleccionado[0].Ape_Usuario :''
  this.pNoID_Usuario.value=usuarioSeleccionado[0].NoID_Usuario ? usuarioSeleccionado[0].NoID_Usuario :''
  this.pTipo_Usuario.value=usuarioSeleccionado[0].Tipo_Usuario ? usuarioSeleccionado[0].Tipo_Usuario :''
  this.pArea_Usuario.value=usuarioSeleccionado[0].Area_Usuario ? usuarioSeleccionado[0].Area_Usuario :''  
  this.pUser_Usuario.value=usuarioSeleccionado[0].User_Usuario ? usuarioSeleccionado[0].User_Usuario :''
  this.pClave_Usuario.value=usuarioSeleccionado[0].Clave_Usuario ? usuarioSeleccionado[0].Clave_Usuario :''      
  
  //habilita los botones
  this.btnEliminar.disabled=false
  this.btnModificar.disabled=false
  this.btnRegistrar.disabled=true
}

  // Eliminar Usuario
  deleteUsuario() {    
    let URL = "http://localhost:3500/api/usuarios/deleteUsuario"

    const datos = {
      pID_Usuario: this.pID_Usuario.value      
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
          alert('Usuario eliminado');
          
          //recarga la lista
           usuario.getusuarios()

          //limpia
          usuario.limpiar()

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
    this.pID_Usuario.value=''
    this.pNoID_Usuario.value=''
    this.pArea_Usuario.value=''
    this.pNoID_Usuario.value=''
    this.pTipo_Usuario.value=''
    this.pArea_Usuario.value='' 
    this.pUser_Usuario.value=''
    this.pClave_Usuario.value=''
    
    //habilita el boton registrar
    this.btnRegistrar.disabled=false
    this.btnEliminar.disabled=true
    this.btnModificar.disabled=true
}

};
const usuario = new Usuarios()

//Carga Inicial
window.onload = () => {
   usuario.getusuarios()
}