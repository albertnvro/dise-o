function numAzar() {
    var numAleatorio = Math.floor(Math.random() * 10) + 1;
    var respuesta = prompt("Escribe un numero del 1 al 10");
    var acertado = false;
  
    if (parseInt(respuesta) === numAleatorio) {
      acertado = true;
      document.write("<p> Cierto, lo has adivinado!");
    } else {
      document.write("No has ganado, el número correcto era:" + numAleatorio);
    }
  }
