let zonaElegida = 0
let eleccionMaqina = 0
let resultado = 0
let intentos = 0
let tableroResultado = ""
let jugadores = []

let jugadoresPorDefecto = [
    { nombre: "Lionel", apellido: "Messi", camiseta: 10, custom: false},
    { nombre: "Julián", apellido: "Alvarez", camiseta: 9, custom: false },
    { nombre: "Lautaro", apellido: "Martinez", camiseta: 22, custom: false },
    { nombre: "Joaquín", apellido: "Correa", camiseta: 17, custom: false },
    { nombre: "Ángel", apellido: "Di Maria", camiseta: 11, custom: false}
]

window.addEventListener('load', () => {
    jugadores = jugadoresPorDefecto.slice()
    cargarListaPlantel(jugadores);
});

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
        index = intentos -1
        let ingreso = prompt(" INTENTO N° " + intentos + "\nEjecuta " + jugadores[index].nombre + " " + jugadores[index].apellido + " con la casaca n° " + jugadores[index].camiseta + "\nIngrese a dónde quiere patear... \n Puede tomar la imagen de referencia! \n cancelar para salir ")
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
            let mensajePenal = "Se prepara "+ jugadores[index].apellido + " ...\n"
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
    
    if (jugadores.length < 5) {
        alert("Debe completar el plantel antes de comezar el juego!")
        
    } else {
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
}

const chequearNombre = (nombre) => {
    console.log("Chequeando " + nombre)
    if (nombre === "" ){
        alert("No ha ingresado el nombre completo!")
        return false
    } else if (/\d/.test(nombre)){
        alert("El nombre/apellido no puede contener números!\n(A menos que sea el hijo de Elon Musk...)")
        return false
    } else {
        return true;
    }
}

const chequearCamiseta = (camiseta) => {
    if ((Number.isInteger(Number(camiseta))) && Number(camiseta) >= 1 && Number(camiseta) <= 99 ){
        return true
    } else {
        
        return false
    }
}

// Chequea si existe el jugador:
//     Si alguien ya tiene esa n° de camiseta
//     Si hay alguien con el mismo nombre y apellido (permite personas con mismo apellido pero distinto nombre)
const camisetaEnUso = (shirtNumber, jugadores) => {
    console.log("Chequeando si la camiseta está en uso...")
    for (let jugador of jugadores){
        if (Number(shirtNumber) === jugador.camiseta){
            console.log("Camiseta en uso!")
            return true
        }
    }
}

const jugadorExiste = (firstName, lastName, jugadores) => {
    console.log("Chequeando existencia...")
    for (let jugador of jugadores){
        
        if (lastName === jugador.apellido){
            console.log("Info: apellido repetido. Chequeando nombre...")
            if (firstName === jugador.nombre){
                console.log("Nombre repetido. Jugador duplicado!")
                return true
            }
        }
    }
    console.log("Jugador no existe.")
    return false
}

const limpiarControles = () => {
    document.getElementById("player-first-name").value = ""
    document.getElementById("player-last-name").value = ""
    document.getElementById("player-shirt-number").value = ""
}

const cargarJugadores = () => {
    console.log("=== Comienzo carga de jugadores! ===")
    if (jugadores.length === 5){
        console.log("Plantel lleno")
        alert("El plantel está lleno! Elimine un jugador para cargar otro.")
    } else {
        let firstName = document.getElementById("player-first-name").value
        let lastName = document.getElementById("player-last-name").value
        let shirtNumber = document.getElementById("player-shirt-number").value
        
        if (!chequearNombre(firstName)){
            document.getElementById("player-first-name").value = ""
            
        } else if (!chequearNombre(lastName)){
            document.getElementById("player-last-name").value = ""
        } else if (!chequearCamiseta(shirtNumber)){
            alert("Sólo ingresar números de camiseta entre entre 1 y 99")
        } else if (camisetaEnUso(shirtNumber,jugadores)){
            alert("Camiseta ocupada!")
        } else if (jugadorExiste(firstName,lastName,jugadores)){
            alert("Ya existe ese jugador!")
        } else {
            console.log("=== Controles exitosos ===")
            let newPlayer = {
                nombre: firstName,
                apellido: lastName,
                camiseta: parseInt(shirtNumber),
                custom: true
            }
            console.log(newPlayer)
            jugadores.push(newPlayer)
            cargarListaPlantel(jugadores)
            limpiarControles()
        }
    }
    console.log("=== Fin carga de jugadores ===")
}

// const cargarListaPlantel = (jugadores) => {
//     let plantel = document.getElementById("player-list")
//     plantel.innerHTML = ""
//     for (jugador of jugadores){
//         let parrafoNewPlayer = document.createElement("p")
//         parrafoNewPlayer.innerText = jugador.nombre + " " + jugador.apellido +  " -> N° " + jugador.camiseta
//         plantel.appendChild(parrafoNewPlayer)
//     }
// }

const cargarListaPlantel = (jugadores) => {
    
    let plantel = document.getElementById("team-container")
    plantel.innerHTML = ""
    jugadores.forEach( jugador => {
        let playerCard = document.createElement("div")
        playerCard.className = "card"
        portrait = jugador.custom ? "dummy" : jugador.apellido
        playerCard.innerHTML = `
        <img class="card-img-top" src="./img/players/${portrait}.jpg" alt="${jugador.apellido}">
        <div class="card-body">
        <h5 class="card-title">${jugador.nombre} ${jugador.apellido}</h5>
        <p class="card-text"> Camiseta n°${jugador.camiseta}</p>
        <button class="boton btn btn-outline-primary delete-player" onclick="borrarJugador(${jugador.camiseta})">Eliminar</button>
        </div>`
        plantel.append(playerCard)
    });
    
}

// const borrarJugador = () => {
//     console.log("=== Comienzo de borrado ===")
//     let shirtNumber = document.getElementById("delete-shirt-number").value
//     console.log("ShirtNumber: " +shirtNumber)

//     if (!chequearCamiseta(shirtNumber)){
//         alert("Sólo ingresar números de camiseta entre 1 y 99")

//     }else if (!camisetaEnUso(shirtNumber, jugadores)){
//         console.log("=== Jugador no encontrado! ===")
//         alert("No existe ese jugador!")

//     } else {
//         console.log("=== Jugador encontrado! ===")
//         const indice = jugadores.findIndex(object => object.camiseta === Number(shirtNumber))
//         jugadores.splice(indice, 1)
//         cargarListaPlantel(jugadores)
//         console.log("=== Borrado exitoso! ===")
//         document.getElementById("delete-shirt-number").value = ""
//     }
// }

const borrarJugador = (jugadorCamiseta) => {
    console.log("=== Comienzo de borrado ===")
    // let shirtNumber = document.getElementById("delete-shirt-number").value
    console.log("ShirtNumber: " +jugadorCamiseta)
    
    // if (!chequearCamiseta(shirtNumber)){
    //     alert("Sólo ingresar números de camiseta entre 1 y 99")
    
    // }else if (!camisetaEnUso(shirtNumber, jugadores)){
    //     console.log("=== Jugador no encontrado! ===")
    //     alert("No existe ese jugador!")
    
    // } else {
    // console.log("=== Jugador encontrado! ===")
    const indice = jugadores.findIndex(object => object.camiseta === Number(jugadorCamiseta))
    jugadores.splice(indice, 1)
    cargarListaPlantel(jugadores)
    console.log("=== Borrado exitoso! ===")
    // document.getElementById("delete-shirt-number").value = ""
    // }
}



const borrarTodo = () => {
    if (confirm("Esta seguro que desea borrar todo el plantel?")){
        jugadores.splice(0, jugadores.length)
        cargarListaPlantel(jugadores)
    }
}

const cargarDefault = () => {
    if (confirm("Está seguro de que desea cargar los valores por defecto?")){
        jugadores.splice(0, jugadores.length)
        console.log(jugadoresPorDefecto)
        jugadores = jugadoresPorDefecto.slice()
        console.log(jugadores)
        cargarListaPlantel(jugadores);
    }
}

// let borrarJugadorButton = document.getElementsByClassName("delete-player")
// borrarJugadorButton.addEventListener("click", borrarJugador(borrarJugadorButton))

let startSubmit = document.getElementById("start-play")
startSubmit.addEventListener("click", jugar)

let playerSubmit = document.getElementById("player-submit")
playerSubmit.addEventListener("click",cargarJugadores)

let deleteSubmit = document.getElementById("player-delete-submit")
deleteSubmit.addEventListener("click",borrarJugador)

let deleteAllSubmit = document.getElementById("delete-all-submit")
deleteAllSubmit.addEventListener("click", borrarTodo)

let loadDefaultSubmit = document.getElementById("load-default-submit")
loadDefaultSubmit.addEventListener("click", cargarDefault)