var NAdivinar=Math.floor((Math.random()*100)+1); //numero aleatorio entre 1 y 100
var contadorRespuestas=0;

function funcion_reiniciar(){
document.getElementById("formulario").reset();
}

function adivinar()
{
    var NRespuesta=document.getElementById("NRespuesta").value; //numero de respuestas posibles

    if(document.getElementById("NRespuesta").disabled==false)
    {
        if(isNumber(NRespuesta) && NRespuesta>0)
        {
            document.getElementById("NRespuesta").disabled=true;
            document.getElementById("numero").disabled=false;
            document.getElementById("numero").focus();
        }
    }else{
        var respuestas=document.getElementById("respuestas").innerHTML; //contenido del div que contiene las respuestas

        if(contadorRespuestas<NRespuesta)
        {
            var numero=document.getElementById("numero").value; //numero introducido por usuario

            if(isNumber(numero) && numero>0 && numero<101)
            {
                contadorRespuestas+=1; // aumenta el numero de la respuesta dada

                if(numero>NAdivinar)
                {
                    //si el numero dado es superrior:
                    respuestas+="<br>"+numero+" - El número que buscas es inferior";  //texto
                    document.getElementById("numero").focus();
                    msg = new SpeechSynthesisUtterance("El número que buscas es inferior a "+numero);                
                    speak(msg);
                }else if(numero<NAdivinar){
                    
                    //si el numero dado es inferior:
                    respuestas+="<br>"+numero+" - El número que buscas es superior"; //texto
                    document.getElementById("numero").focus();
                    msg = new SpeechSynthesisUtterance("El número que buscas es superior a "+numero); //voz               
                    speak(msg);
                }else{
                    
                    //si has acertado
                    var audio = new Audio('ganar.mp3'); //sonido ganar
                    audio.play(); // sonido
                    respuestas+="<br><span class='acertado'>"+numero+" ¡ENHORABUENA HAS ACERTADO!</span>"; //texto
                    msg = new SpeechSynthesisUtterance("Enhorabuena has acertado el número era el " +NAdivinar); //voz               
                    speak(msg);

                    fin()

                }
                // vaciar el valor del numero
                document.getElementById("numero").value="";
            }else{
                respuestas+="<br><span class='error'>"+numero+" - Tiene que ser un valor comprendido entre 1 y 100</span>"; //texto
                msg = new SpeechSynthesisUtterance("Tiene que ser un valor comprendido entre 1 y 100"); //voz               
                speak(msg);
            }
        }else{
          var audio = new Audio('perder.mp3'); //sonido
          audio.play(); //sonido
            respuestas+="<br><span class='fin'> ¡NO HAS ACERTADO! El número era el "+NAdivinar+"</span>"; //texto
            msg = new SpeechSynthesisUtterance("No has acertado. El número era el " +NAdivinar); //voz               
            speak(msg);

            fin()
        }

        // ponemos nuevamente todas las respuestas
        document.getElementById("respuestas").innerHTML=respuestas;
    }

    // devolvemos false para que el formulario no envie los valores
    return false;
}

// Funcion que se ejecuta al finalizar el juego
// ya sea por haber descubierto el numero o por finalizar el numero de
// intentos
function fin()
{

    // boton  siguiente
    document.getElementById("numero").disabled=true;
    document.getElementById("btnEnviar").disabled=true;
}

//  función para validar un numero
function isNumber(n)
{
    return !isNaN(parseFloat(n)) && isFinite(n);
}


function speak(text) { //función para que me diga con voz el resultado
   
    var voices = speechSynthesis.getVoices();
    voices.voice = speechSynthesis.getVoices()[5];
    msg.lang = "es-Es";
    speechSynthesis.speak(msg);
}