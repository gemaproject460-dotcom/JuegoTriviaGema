
// 🔊 SONIDOS
const sonidoCorrecto = new Audio("correcto.mp3");
const sonidoIncorrecto = new Audio("incorrecto.mp3");
const sonidoClick = new Audio("click.mp3");

// 📋 PREGUNTAS (15)
let preguntas = [
{pregunta:"¿Qué hacer si hay incendio?", opciones:["Salir y avisar","Esconderse","Volver por cosas"], correcta:0,fondo:"imagenes/incendio.jpg.png"},
{pregunta:"Número de emergencia?", opciones:["911","123","999"], correcta:0,fondo:"imagenes/emergencia.jpg.png"},
{pregunta:"Con humo debes?", opciones:["Caminar","Gatear","Saltar"], correcta:1,fondo:"imagenes/humo.jpg.png"},
{pregunta:"Qué NO hacer?", opciones:["Salir","Buscar ayuda","Volver por cosas"], correcta:2,fondo:"imagenes/peligro.jpg.png"},
{pregunta:"Ropa en fuego?", opciones:["Correr","Rodar","Saltar"], correcta:1,fondo:"imagenes/ropa-fuego.jpg.png"},

{pregunta:"Qué usar para apagar fuego pequeño?", opciones:["Agua","Extintor","Papel"], correcta:1,fondo:"imagenes/extintor.jpg.png"},
{pregunta:"Dónde reunirse al evacuar?", opciones:["Punto seguro","Baño","Cocina"], correcta:0,fondo:"imagenes/evacuacion.jpg.png"},
{pregunta:"Qué hacer con electricidad y fuego?", opciones:["Agua","Nada","Desconectar"], correcta:2,fondo:"imagenes/electricidad.jpg.png"},
{pregunta:"Al oler humo debes?", opciones:["Ignorar","Avisar","Dormir"], correcta:1,fondo:"imagenes/humo2.jpg.png"},
{pregunta:"Puertas calientes significan?", opciones:["Seguro","Fuego cerca","Nada"], correcta:1, fondo:"imagenes/puerta.jpg"},

{pregunta:"Niños en incendio deben?", opciones:["Guiarse por adultos","Correr solos","Esconderse"], correcta:0,fondo:"imagenes/niños.jpg.png"},
{pregunta:"Ventanas abiertas?", opciones:["Sí","No","Solo de noche"], correcta:1,fondo:"imagenes/ventana.jpg.png"},
{pregunta:"Gas encendido?", opciones:["Apagar","Ignorar","Abrir fuego"], correcta:0,fondo:"imagenes/gas.jpg.png"},
{pregunta:"Fuego en cocina?", opciones:["Tapar","Correr","Soplar"], correcta:0,fondo:"imagenes/cosina.jpg.png"},
{pregunta:"Evacuación debe ser?", opciones:["Rápida","Lenta","Opcional"], correcta:0,fondo:"imagenes/puerta.jpg.png"}
];

// 🔀 MEZCLAR Y TOMAR SOLO 5
preguntas.sort(() => Math.random() - 0.5);
preguntas = preguntas.slice(0, 5);

let indice = 0;
let puntos = 0;
let tiempo = 15;
let intervalo;

// 🟢 PANTALLA INICIO

function pantallaInicio() {
    ponerFondoInicio();

    document.body.innerHTML = `

    <div class="menuInicio">

        <h1 class="tituloInicio">
             QUIZ DE EMERGENCIAS 
        </h1>

        <p class="textoInicio">
            ¡Demuestra cuánto sabes sobre seguridad
            y aprende a actuar correctamente en una emergencia!
        </p>

        <button class="btnInicio"
                onclick="iniciarJuego()">
            ▶ JUGAR
        </button>

    </div>

    `;
}


 //Función para poner el Fondo
function ponerFondoInicio() {
    document.body.style.backgroundImage = "url('imagenes/inicio.png')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
}


// 🎮 INICIAR
function iniciarJuego() {
    sonidoClick.play();

    indice = 0;
    puntos = 0;

    cargarPantalla();
    cargarPregunta();
}

// 🎨 CARGA ESTRUCTURA
// 🎨 CARGA ESTRUCTURA
function cargarPantalla() {

    document.body.innerHTML = `

    <div class="contenedor">

        <!-- IZQUIERDA -->
        <div class="lado-izq">

            <h2 id="tituloTrivia" class="tituloTrivia">
                Trivia 1
            </h2>

            <img src="imagenes/mascota.png"
                 class="mascota">

        </div>


        <!-- DERECHA -->
        <div class="lado-der">

            <h1 class="titulo">
                TRIVIA: ¿QUÉ HACER EN CASO DE INCENDIO?
            </h1>

            <p class="sub">
                Lee la pregunta y elige la mejor respuesta
            </p>

            <div class="tarjeta">

                <div id="pregunta"
                     class="pregunta">
                </div>

                <div id="opciones">
                </div>

                <div class="info">

                    ⏱ Tiempo:
                    <span id="tiempo">15</span>

                    ⭐ Puntos:
                    <span id="puntos">0</span>

                </div>

            </div>

        </div>

    </div>

    `;
}

// 📌 CARGAR PREGUNTA
// 📌 CARGAR PREGUNTA
// 📌 CARGAR PREGUNTA
function cargarPregunta() {

    if (indice >= preguntas.length) {
        pantallaFinal();
        return;
    }

    let p = preguntas[indice];

    // Cambiar el fondo según la trivia
    document.body.style.backgroundImage = `url('${p.fondo}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";

    // Cambiar el número de trivia
    document.getElementById("tituloTrivia").innerText =
        "Trivia " + (indice + 1);

    // Mostrar la pregunta
    document.getElementById("pregunta").innerText =
        p.pregunta;

    // Crear las opciones
    let html = "";

    p.opciones.forEach((op, i) => {

        html += `
            <div class="opcion" onclick="responder(${i})">

                <span class="letra">
                    ${String.fromCharCode(65 + i)}
                </span>

                <p>${op}</p>

            </div>
        `;

    });

    document.getElementById("opciones").innerHTML = html;

    // Actualizar puntaje
    document.getElementById("puntos").innerText = puntos;

    // Iniciar el temporizador
    iniciarTiempo();

}

// 🎯 RESPONDER
function responder(op) {
    clearInterval(intervalo);

    let correcta = preguntas[indice].correcta;
    let opciones = document.querySelectorAll(".opcion");

    opciones.forEach((btn, i) => {
        if (i === correcta) {
            btn.style.background = "#2ecc71";
        } else {
            btn.style.background = "#e74c3c";
        }
        btn.style.pointerEvents = "none";
    });

    if (op === correcta) {
        puntos++;
        document.getElementById("puntos").innerText = puntos;
        sonidoCorrecto.play();
    } else {
        sonidoIncorrecto.play();
    }

    indice++;
    setTimeout(cargarPregunta, 1500);
}

// ⏱ TIEMPO
function iniciarTiempo() {
    tiempo = 15;
    document.getElementById("tiempo").innerText = tiempo;

    intervalo = setInterval(() => {
        tiempo--;
        document.getElementById("tiempo").innerText = tiempo;

        if (tiempo <= 0) {
            clearInterval(intervalo);
            indice++;
            cargarPregunta();
        }
    }, 1000);
}

// 🏁 FINAL
// 🏁 FINAL

function pantallaFinal() {

    ponerFondoInicio();

    let mensaje = "";

    if(puntos == 5){
        mensaje = " ¡Excelente! Eres un experto en seguridad.";
    }
    else if(puntos >= 3){
        mensaje = " ¡Muy bien! Conoces las medidas básicas.";
    }
    else{
        mensaje = "  Sigue practicando para aprender más.";
    }

    document.body.innerHTML = `

    <div class="finalJuego">

        <h1 class="tituloFinal">
             ¡QUIZ COMPLETADO!
        </h1>

        <div class="harphy">
        <img src="imagenes/mascota.png"> 
        </div>
          

       
       <div class="cuadrito">
         <h2>Tu puntuación</h2>

        <div class="puntajeFinal">
            ${puntos}/${preguntas.length}
        </div>

        <p class="mensajeFinal">
            ${mensaje}
        </p>

        <div class="botonesFinal">

            <button class="btnVerde"
                    onclick="iniciarJuego()">
                   Jugar otra vez
            </button>

            <button class="btnNaranja"
                    onclick="pantallaInicio()">
                 Inicio
            </button>

        </div>

    </div>
    </div>

    `;
}


// ▶ START
pantallaInicio();
``