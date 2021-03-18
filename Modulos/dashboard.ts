class Dashboard {
}

const dashboard = new Dashboard()

//Carga Inicial
window.onload = () => {
   if (!validarSeguridad()){    
    window.location.href="Autenticacion/login.html";  
   }else{
      let usuarioLabel = <HTMLLabelElement>document.getElementById('lblTipoUsuario')
      let contenido:any=localStorage.getItem('userLogin') ? localStorage.getItem('userLogin') : 'Usuario'
      usuarioLabel.innerHTML=contenido
   }
}