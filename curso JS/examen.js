/*
Ejercicio práctico

1) Crea un programa que haga un exámen (Temática libre)
2) Haz un seguimiento de las respuestas acertadas
3) Al finalizar, muestra al usuario cuantas preguntas ha acertado
4) Califica su ejercicio con una nota en base a las respuestas acertadas:
    5 de 5 =  Sobresaliente
    3-4 de 5 = Notable
    1-2 de 5 = Necesita mejorar
    0 de 5 = Suspenso

    */


    var contador = 0;




    //PREGUNTAS
    var prUno = prompt("Cuántas provincias tiene España?");
        document.write("¿Cuántas provincias tiene España? - " + "Has respondido: " +prUno + "<br>");
    
    var prDos = prompt("Cuál es el resultado de la operación 2 + 2 / 2?");
        document.write("Cuál es el resultado de la operación 2 + 2 / 2? - " + "Has respondido: " +prDos + "<br>");
    
    var prTres = prompt("Quién ganó el mundial de fútbol en el año 2010?").toLowerCase();
        document.write("Quién ganó el mundial de fútbol en el año 2010? - " + "Has respondido: " +prTres + "<br>");
    
    var prCuatro = prompt("Cuántos segundos tiene un día?");
        document.write("Cuántos segundos tiene un día? - " + "Has respondido: " +prCuatro + "<br>");
    
    var prCinco = prompt("Cuál lenguaje te está dando las respuestas?").toLowerCase();
        document.write("Cuál lenguaje te está dando las respuestas? - " + "Has respondido: " +prCinco + "<br>");
    
    
    
    
    
    //sumar puntos respuestas
    if(prUno == 12){
        contador+= 1;
      
    }
    if(prDos == 2){
        contador+=1;
    }
    if(prTres.toLowerCase() == "españa"){
        contador+=1;
    }
    if(prCuatro == 8000){
        contador+=1;
    
    }
    if(prCinco.toLowerCase == "javascript"){
        contador+=1;
    }
    
    document.write("<br>Has acertado: " + contador + " de 5 preguntas"); {
            
    }
    
    
    //contador notas examen
    
    if(contador === 5){
        document.write("Estás aprobado con un sobresaliente!" + contador);
    }
    else if(contador <= 4 || contador >= 3){
        document.write("Has sacado un notable!");
    }
    else if(contador === 1){
        document.write("Necesitas mejorar");
    }
    else {
        document.write("Has fracasado de manera descomunal");
    }
    
    
    console.log("COMPROBACIÓN CONTADOR POR CONSOLA: " + contador)
    
    
    