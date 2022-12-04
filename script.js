let zonaElegida = 0
let eleccionMaqina = 0
let golesAcumulados = 0
let intentos = 0
let tableroResultado = ""
let jugadores = []
let deleteButtons = []

let jugadoresPorDefecto = [
    { nombre: "Lionel", apellido: "Messi", camiseta: 10, custom: false},
    { nombre: "Julián", apellido: "Alvarez", camiseta: 9, custom: false },
    { nombre: "Lautaro", apellido: "Martinez", camiseta: 22, custom: false},
    { nombre: "Joaquín", apellido: "Correa", camiseta: 17, custom: false },
    { nombre: "Ángel", apellido: "Di Maria", camiseta: 11, custom: false}
]

window.addEventListener('load', () => {
    if (localStorage.getItem("savedPlayers") == null) {
        jugadores = jugadoresPorDefecto.slice()
    } else {
        let savedContent = localStorage.getItem("savedPlayers")
        jugadores = JSON.parse(savedContent)
    }
    cargarListaPlantel(jugadores);
    console.log("Jugadores:")
    console.log(jugadores)
});

const reiniciarPuntajes = () => {
    zonaElegida = 0
    eleccionMaqina = 0
    resultado = 0
    intentos = 0
    index=0
    tableroResultado = ""
    mensajePenal = ""
    
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

function patear(ingreso) {
    console.log("=== COMIENZO DE PATADA ===")
    
    for (let kb of kickButtons){
        kb.style.visibility = "hidden"
    }
    intentos++
    console.log("Se pateó a " + ingreso)
    console.log("intentos:" + intentos)
    let index = intentos - 1
    console.log("index :" + index)
    let messageWindow = document.createElement("div")
    messageWindow.className="message-window"    
    messageWindow.innerHTML = `
    <h3 class=\"kick-message-title\">INTENTO N° ${intentos}</h3>
    <p class=\"kick-message-player-data\">Ejecuta ${jugadores[index].nombre} ${jugadores[index].apellido}</p>
    <pclass=\"kick-message-player-shirt\">con la casaca n°  ${jugadores[index].camiseta}</p>
    `
    playArea.prepend(messageWindow)
    
    let mensajePenal = "<p class=\"kick-message-prelude\">Se prepara "+ jugadores[index].apellido + " ...</p>"
    if (ingreso === 1) {
        mensajePenal += "<p class=\"kick-message-direction\">Patea al mediooo...</p>"
    } else if (ingreso % 2 === 0) {
        mensajePenal += "<p class=\"kick-message-direction\">Patea abajooo...</p>"
    } else {
        mensajePenal += "<p class=\"kick-message-direction\">Dispara al angulooo....</p>"
    }
    setTimeout( () => {
        messageWindow.innerHTML = `${mensajePenal}`
    } , 2000)
    
    
    setTimeout( () => {
        if (esGol(ingreso)) {
            mensajePenal += "<p class=\"kick-message-goal\">GOOOOOOOL!</p>"
            anotador(intentos, true)
            golesAcumulados++
        } else {
            mensajePenal += "<p class=\"kick-message-keeper\">ATAJÓ EL ARQUERO!</p>"
            anotador(intentos, false)
            
        }
        messageWindow.innerHTML = `${mensajePenal}`
    } , 3500)
    
    setTimeout( () => {
        messageWindow.remove()
        for (let kb of kickButtons) {
            kb.style.visibility = "visible"
        }
        if (intentos === 5 ){
            golesAcumulados >= 4 ? tableroResultado+= `<p>🏆 Campeon! 🏆</p>` : tableroResultado+= `<p>Estuvo cerca! 😕</p>`
            terminarPartida()
        }
    }
    , 6000)
}

const terminarPartida = () => {
    
    Swal.fire({
        title: 'Fin de la partida!',
        html: tableroResultado,
        iconHtml: '<img src="./img/world-cup.png">',
        customClass: {
            icon: "no-border"
        }
    })
    
    reiniciarPuntajes()
    
    for(let btn of deleteButtons) {
        btn.style.visibility = "visible"
    }
    for (let kb of kickButtons){
        kb.style.visibility = "visible"
    }
    startSubmit.style.visibility = "visible"
    endSubmit.style.visibility = "hidden"
    playArea.style.display = "none";
    
}

const abortPlay = () => {
    reiniciarPuntajes()
    
    for(let btn of deleteButtons) {
        btn.style.visibility = "visible"
    }
    for (let kb of kickButtons){
        kb.style.visibility = "visible"
    }
    startSubmit.style.visibility = "visible"
    endSubmit.style.visibility = "hidden"
    playArea.style.display = "none";
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Partida finalizada!',
    })
}

const anotador = (intento, resultado) => {
    str= `<p> Penal n° " ${intento}: `
    resultado ? str += "Gol ! ✔️" : str+= "Atajado ! ❌"
    str += `</p>`
    tableroResultado += str
}

const jugar = () => {
    
    if (jugadores.length < 5) {
        Swal.fire({
            icon: 'error',
            title: 'Hay equipo!... O no?',
            text: 'Debe completar el plantel antes de comezar el juego!',
        })
        
    } else {
        console.log("-- Comienzo del juego --")
        
        deleteButtons = document.getElementsByClassName("delete-button")
        for(let btn of deleteButtons) {
            btn.style.visibility = "hidden"
        }
        
        startSubmit.style.visibility = "hidden"
        endSubmit.style.visibility = "visible"
        Swal.fire({
            title: 'Bienvenido al pateapenales!',
            text: 'Debe anotar al menos 4 goles para ser el campeón',
            iconHtml: '<img src="./img/world-cup.png">',
            customClass: {
                icon: "no-border"
            }
        })
        
        playArea.style.display = "block"
        
    }
}

const chequearNombre = (nombre) => {
    console.log("Chequeando " + nombre)
    if (nombre === "" ){
        Swal.fire({
            icon: 'error',
            title: 'Y vo\' quien so\'?',
            text: 'No ha ingresado el nombre completo!',
        })
        
        return false
    } else if (/\d/.test(nombre)){
        Swal.fire({
            icon: 'error',
            title: 'N0mbr3 1nv4lid0',
            text: 'El nombre/apellido no puede contener números! (A menos que sea el hijo de Elon Musk...',
        })
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
            Swal.fire({
                icon: 'error',
                title: 'Casaca ocupada!',
                text: 'Ese número de camiseta ya está ocupado! Por favor elegí otro...',
            })
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
        Swal.fire({
            icon: 'error',
            title: 'Overflow de jugadores!',
            text: 'El plantel está lleno! Elimine un jugador para cargar otro.',
        })
    } else {
        let firstName = document.getElementById("player-first-name").value
        let lastName = document.getElementById("player-last-name").value
        let shirtNumber = document.getElementById("player-shirt-number").value
        
        if (!chequearNombre(firstName)){
            document.getElementById("player-first-name").value = ""
            
        } else if (!chequearNombre(lastName)){
            document.getElementById("player-last-name").value = ""
        } else if (!chequearCamiseta(shirtNumber)){
            console.log("Sólo ingresar números de camiseta entre entre 1 y 99")
        } else if (camisetaEnUso(shirtNumber,jugadores)){
            console.log("Camiseta ocupada!")
        } else if (jugadorExiste(firstName,lastName,jugadores)){
            console.log("Ya existe ese jugador!")
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
        <button class="delete-button btn btn-outline-primary delete-player" onclick="borrarJugador(${jugador.camiseta})">Eliminar</button>
        </div>`
        plantel.append(playerCard)
    });
    
    let JSONJugadores = JSON.stringify(jugadores)
    localStorage.setItem("savedPlayers", JSONJugadores)
    
}

const borrarJugador = (jugadorCamiseta) => {
    console.log("=== Comienzo de borrado ===")
    console.log("ShirtNumber: " +jugadorCamiseta)
    
    const indice = jugadores.findIndex(object => object.camiseta === Number(jugadorCamiseta))
    jugadores.splice(indice, 1)
    cargarListaPlantel(jugadores)
    console.log("=== Borrado exitoso! ===")
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
        jugadores = jugadoresPorDefecto.slice()
        cargarListaPlantel(jugadores);
    }
}

let playArea = document.getElementById("play-area")

let kickButtons = document.getElementById("play-area").children

let startSubmit = document.getElementById("start-play")
startSubmit.addEventListener("click", jugar)

let endSubmit = document.getElementById("end-play")
endSubmit.addEventListener("click", abortPlay)

let playerSubmit = document.getElementById("player-submit")
playerSubmit.addEventListener("click",cargarJugadores)

let deleteAllSubmit = document.getElementById("delete-all-submit")
deleteAllSubmit.addEventListener("click", borrarTodo)

let loadDefaultSubmit = document.getElementById("load-default-submit")
loadDefaultSubmit.addEventListener("click", cargarDefault)

let middleKick = document.getElementById("middle-kick")
middleKick.addEventListener("click",  () => { patear(1)})
let bottomLeftKick = document.getElementById("bottom-left-kick")
bottomLeftKick.addEventListener("click", () => { patear(2)})
let topLeftKick = document.getElementById("top-left-kick")
topLeftKick.addEventListener("click", () => { patear(3)})
let bottomRightKick = document.getElementById("bottom-right-kick")
bottomRightKick.addEventListener("click", () => { patear(4)})
let topRightKick = document.getElementById("top-right-kick")
topRightKick.addEventListener("click", () => { patear(5)})
