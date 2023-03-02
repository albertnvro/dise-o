function nombreVacio() {
 var nombre = document.getElementById("nombre");
 if (nombre.value === "" ){
    return true;
 }else{
    return false;
 }
}
var vacio = nombreVacio();
if (vacio === true) {
    alert("Necesitamos el nombre");

}


function saludar(){
    alert("Heyyyy" + nombre);
}
