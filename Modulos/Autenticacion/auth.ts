//import keys from '../../keys'
declare var swal: any;

class Login {

    User_Usuario =  <HTMLInputElement>document.getElementById('inputUsuario')
    Clave_Usuario =  <HTMLInputElement>document.getElementById('inputPassword')
    
    constructor(){             
    }

    getLogin(){
                
        let URL = `http://localhost:3500/api/usuarios/getlogin`

         //Se arma el Objeto que se enviara en el BODY
         const datos = {
            User_Usuario: this.User_Usuario.value,
            Clave_Usuario: this.Clave_Usuario.value           
        }

        fetch(URL, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
            .then(res => res.json())
            .then(res => {                
                if(res.status=='OK'){
                //Crea la variable en local storage
                localStorage.setItem('userLogin', this.User_Usuario.value);
                //si el acceso fue concedido navega hacia el dashboard
                swal("Acceso correcto", "Bienvenido", "success").then((res: any)=>{
                  window.location.href="../dashboard.html";  
                })               
                }       
                else
                swal("Error", "Ocurrio un problema al autenticar el usuario", "error");   //error   
            });          
    };
};


const login = new Login()