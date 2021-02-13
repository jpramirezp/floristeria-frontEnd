
function MostrarContenido(){

    let num1 =  <HTMLInputElement>document.getElementById('Num1');
    let num2 =  <HTMLInputElement>document.getElementById('Num2');
   
    let operacion:any= parseInt(num1.value) + parseInt(num2.value)  

    alert('El Resultado es:' + operacion)
}
    




