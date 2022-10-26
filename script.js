let zonaElegida = 0
let eleccionMaqina = 0
let resultado = 0
let intentos = 0
let tableroResultado = ""

const reiniciarPuntajes = () => {
    zonaElegida = 0
    eleccionMaqina = 0
    resultado = 0
    intentos = 0
    tableroResultado = ""
}

const esGol = (zonaElegida) => {
    eleccionMaqina = (Math.floor(Math.random() * 5 ) + 1) //Número aleatorio entre 1 y 5
    console.log("eleccionMaqina: " + eleccionMaqina)
    console.log("eleccionHumano: " + zonaElegida)
    if (zonaElegida === eleccionMaqina){
        console.log("No es gol")
        return false
    }
    console.log("Es gol")
    return true
}

function patear() {
    //Devuelve una cadena dependiendo la elección del jugador
    while (true) {
        let ingreso = prompt(" INTENTO N° " + intentos + "\nIngrese a dónde quiere patear... \n Puede tomar la imagen de referencia! \n cancelar para salir ")
        if (ingreso === null) {
            return "salir"
        }
        if (isNaN(ingreso)) {
            alert("Debe ingresar sólo números! Intente nuevamente...")
        } else if (!Number.isInteger(Number(ingreso))) {
            alert("Debe ingresar sólo números enteros! Intente nuevamente...")
        } else if (ingreso < 1 || ingreso > 5) {
            alert("Ingreso inválido! Intente nuevamente...")
        } else {
            // zonaElegida = ingreso
            let mensajePenal = "Se prepara el jugador...\n"
            if (ingreso === 1) {
                mensajePenal += "Patea al mediooo... \n"
            } else if (ingreso % 2 === 0) {
                mensajePenal += "Patea abajooo...\n"
            } else {
                mensajePenal += "Dispara al angulooo....\n"
            }

            if (esGol(ingreso)) {
                alert(mensajePenal + "GOOOOOOOL!")
                return "gol"
            } else {
                alert(mensajePenal + "ATAJÓ EL ARQUERO!")
                return "atajo"
            }
        }
    }
}

const anotador = (intento, resultado) => {
    str= "Penal n° " + intento + ": "
    if (resultado === "gol"){
        str += "Gol\n"
    } else {
        str += "Atajado\n"
    }
    tableroResultado += str
}

const jugar = () => {
    console.log("-- Comienzo del juego --")
    alert("Bienvenido al pateapenales! \n Debe anotar al menos 4 goles para ser el campeón!\n Para patear o atajar, ingrese un número del 1 al 5 \n Quién ganará?")
    
    while (intentos < 5){
        intentos += 1
        console.log("Intento n° " + intentos)
        patada = patear()
        switch (patada) {
            case "gol":
            resultado += 1
            anotador(intentos, "gol")
            break
            case "atajo":
            anotador(intentos, "atajo")
            break
            case "salir":
            intentos = 6
            alert("adiós!")
            console.log("-- Juego cancelado --")
            break
        }
        if (intentos < 5){
            alert ("Resultado parcial:\n" + tableroResultado)
        } else if (intentos === 5) {
            mensajeFinal="Fin del juego! Resultado:\n" + tableroResultado  
            if (resultado > 3) {
                mensajeFinal += "\n 🏆 Ganador! 🏆"
            } else {
                mensajeFinal += "\n Perdedor!"
            }
            alert(mensajeFinal)
            console.log("-- Fin del juego --")
        }
    }
    alert("Excelente juego! Pero todavía falta para Qatar...\n Mientras podes jugar de nuevo!")
    
    reiniciarPuntajes()
}
