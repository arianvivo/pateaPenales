const chequearNombre = (nombre) => {
    if (nombre === "" ){
        alert("No ha ingresado nada!")
        return false
    } else if (/\d/.test(ingresoNombre)){
        alert("El nombre/apellido no puede contener números!\n(A menos que sea el hijo de Elon Musk...)")
        return false
    } else {
        return true;
    }
}

class Jugador {
    
    constructor(nombre, apellido, nroCamiseta){
        this.nombre = nombre
        this.apellido = apellido
        this.nroCamiseta = nroCamiseta
    }
    
    cargarJugadores = () => {
        
        let player = []
        //Nombre
        while (true) {
            ingresoNombre = prompt("Ingrese el jugador")
            if (ingresoNombre){
                player.push(ingresoNombre)
                break;
            }
        }
        //Apellido
        while(true){
            ingresoApellido = prompt("Ingrese el apellido!")
            if (ingresoApellido){
                player.push(ingresoApellido)
                break
            }
        }
        //Numero de Camiseta
        while(true){
            ingresoCamiseta = prompt("Ingrese el número de camiseta")
            if ((Number.isInteger(Number(ingresoCamiseta))) && Number(ingresoCamiseta) >= 1 && Number(ingresoCamiseta) <= 99 ){
                player.push(ingresoCamiseta)
                break
            } else {
                alert("Sólo ingresar números entre 1 y 99")
            }
        }
    }
}

class Equipo {
    constructor(nombre, jugadores){
        this.nombre = nombre
        this.jugadores = jugadores
    }
    
    mostrarJugador = (index) => {
        return this.jugadores[index]
    }
    
}