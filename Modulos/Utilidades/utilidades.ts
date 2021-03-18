function validarSeguridad(){

    //funcion sencilla que unicamente valida si existe el local storage con un login valido
    if (localStorage.getItem('userLogin'))
    return true
    else
    return false
}