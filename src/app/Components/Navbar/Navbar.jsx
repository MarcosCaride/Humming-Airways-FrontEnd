"use client"
import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import { IoIosMenu, IoIosArrowUp } from "react-icons/io";
import { FaPlaneDeparture, FaUser } from "react-icons/fa";
import { FaPlus, FaMinus } from 'react-icons/fa6'
import { TiTick } from "react-icons/ti";


const Navbar = () => {

    const [formularioReservaVisible, setFromularioVisible] = useState(true)
    const [formularioTipoDeViajeVisible, setFormularioTipoDeViajeVisible] = useState(false)
    const [formularioCantidadPasajerosVisible, setFormularioCantidadPasajerosVisible] = useState(false)

    const [tipoDeViaje, setTipoDeViaje] = useState('Ida y Vuelta')

    // SELECCION DE CANTIDAD DE PASAJEROS
    const [cantidadPasajeros, setCantidadPasajeros] = useState(1)
    const [cantidadAdultos, setCantidadAdultos] = useState(1)
    const [cantidadNinos, setCantidadNinos] = useState(0)
    const [cantidadBebes, setCantidadBebes] = useState(0)

    // SELECCION DE ORIGENES Y DESTINOS
    const [origenSeleccionado, setOrigenSeleccionado] = useState({ Nombre: '', id: '', code:'' })
    const [formularioOrigenVisible, setFormularioOrigenVisible] = useState(false)
    const [origenes, setOrigenes] = useState([])

    const [destinoSeleccionado, setDestinoSeleccionado] = useState({ Nombre: '', id: '', code:'' })
    const [formularioDestinoVisible, setFormularioDestinoVisible] = useState(false)
    const [destinos, setDestinos] = useState([])


    const validacionCantidadPasajeros = () => {
        if (cantidadAdultos > 9) {
            return false
        }
        if (cantidadBebes > cantidadAdultos) {
            return false
        }
        if (cantidadNinos + cantidadAdultos > 9) {
            return false
        }
        return true
    }

    useEffect(() => {
        let formulario = document.getElementById('FormularioReserva')
        let formularioTipoDeViaje = document.getElementById('FormularioTipoDeViaje')
        let formularioCantidadPasajeros = document.getElementById('FormularioCantidadPasajeros')

        let botonIda = document.getElementById('Ida')
        let tickIda = document.getElementById('IdaTick')
        let botonIdaVuelta = document.getElementById('IdaVuelta')
        let tickIdaVuelta = document.getElementById('IdaVueltaTick')


        if (formularioReservaVisible) {
            formulario.classList.remove('invisible')
        } else {
            formulario.classList.add('invisible')
        }

        if (formularioTipoDeViajeVisible) {
            formularioTipoDeViaje.classList.remove('invisible')
        } else {
            formularioTipoDeViaje.classList.add('invisible')
        }

        if (formularioCantidadPasajerosVisible) {
            formularioCantidadPasajeros.classList.remove('invisible')
        } else {
            formularioCantidadPasajeros.classList.add('invisible')
        }

        if (tipoDeViaje == 'Ida y Vuelta') {
            botonIdaVuelta.classList.add('seleccionado')
            botonIda.classList.remove('seleccionado')
            tickIda.style.display = 'none'
            tickIdaVuelta.style.display = 'inline'

        } else {
            botonIdaVuelta.classList.remove('seleccionado')
            botonIda.classList.add('seleccionado')
            tickIda.style.display = 'inline'
            tickIdaVuelta.style.display = 'none'
        }

    }, [formularioReservaVisible, formularioTipoDeViajeVisible, tipoDeViaje, formularioOrigenVisible])

    useEffect(() => {
        console.log('actualizando');
        console.log(formularioOrigenVisible);


    }, [formularioOrigenVisible])

    useEffect(() => {
        async function getData() {
            let bodyData = new FormData()
            bodyData.append('execute', 'getAirportsFrom')
            let token = '4f2a879bd30eb1e8aaa328850c2306b2e376eab11acf6c3bb647772ee6e8a8a9'
            let response = await fetch("https://hummingairways.xgestion.com.ar/intranet/sys/mods/flights/motor.php", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: bodyData
            })

            let data = await response.json()
            let listaAirports = data.AirportsFrom.map(Airport =>
                <p key={Airport.airportId} className='ListaAirports' onClick={() => setOrigenSeleccionado({ Nombre: Airport.airportName, id: Airport.airportId, code: Airport.airportCode })}>{Airport.airportName} <span className='spanSelect'>{` (${Airport.airportCode})`}</span></p>

            )
            console.log(listaAirports);

            setOrigenes(listaAirports)


        }
        getData()
    }, [])

    // OBTENEMOS LOS DESTINOS DISPONIBLES PARA EL ORIGEN SELECCIONADO

    useEffect(() => {
        async function getDestinos() {
            let bodyData = new FormData()
            bodyData.append('execute', 'getAirportsTo')
            bodyData.append('airportFrom', origenSeleccionado.id)
            let token = '4f2a879bd30eb1e8aaa328850c2306b2e376eab11acf6c3bb647772ee6e8a8a9'
            let response = await fetch("https://hummingairways.xgestion.com.ar/intranet/sys/mods/flights/motor.php", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: bodyData
            })

            let data = await response.json()
            console.log(data.AirportsTo);
            console.log(Object.values(data.AirportsTo));
            let dataDestinos = Object.values(data.AirportsTo)
            console.log("DataDestinos");
            console.log(dataDestinos);
            

            let listaDestinos = dataDestinos.map(Airport => 
                <p key={Airport.airportId} className='ListaAirports' onClick={() => setDestinoSeleccionado({ Nombre: Airport.airportName, id: Airport.airportId, code: Airport.airportCode })}>{Airport.airportName}<span className='spanSelect'>{` (${Airport.airportCode})`}</span></p>
            )
            console.log(listaDestinos);

            setDestinos(listaDestinos)

        }
        getDestinos()
        setDestinoSeleccionado({ Nombre: '', id: '', code: '' })

    }, [origenSeleccionado])


    // OBTENEMOS LOS VUELOS DISPONIBLES

    useEffect(() => {
        async function getVuelos() {
            let bodyData = new FormData()
            bodyData.append('execute', 'getFlightDates')
            bodyData.append('airportFrom', origenSeleccionado.id)
            bodyData.append('airportTo', destinoSeleccionado.id)

            let token = '4f2a879bd30eb1e8aaa328850c2306b2e376eab11acf6c3bb647772ee6e8a8a9'
            let response = await fetch("https://hummingairways.xgestion.com.ar/intranet/sys/mods/flights/motor.php", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: bodyData
            })

            // let data = await response.json()
            // console.log(data.AirportsTo);
            // console.log(Object.values(data.AirportsTo));
            // let dataDestinos = Object.values(data.AirportsTo)
            // console.log("DataDestinos");
            // console.log(dataDestinos);
            

            // let listaDestinos = dataDestinos.map(Airport => 
            //     <p key={Airport.airportId} className='ListaAirports' onClick={() => setDestinoSeleccionado({ Nombre: Airport.airportName, id: Airport.airportId, code: Airport.airportCode })}>{Airport.airportName}<span className='spanSelect'>{` (${Airport.airportCode})`}</span></p>
            // )
            // console.log(listaDestinos);

            // setDestinos(listaDestinos)

        }
        getVuelos()
    }, [destinoSeleccionado])

    return (
        <div>
            <header id='Desktop'>

                {/* Menu lado Izquierdo */}

                <div className='izquierda'>
                    <img src='/hummingMedia/LogoHM.png' alt="Logo de la empresa Humming Airways" />
                    <div>
                        <button onClick={() => setFromularioVisible(!formularioReservaVisible)}>Reservá</button>
                        <button className='Boton2'>Mis vuelos</button>
                        <button className='Boton2'>Estado del vuelo</button>
                    </div>
                </div>
                <div id='FormularioReserva' className='invisible'>
                    <div className='formArriba'>
                        <div id='TipoDeViaje' className='Input' onClick={() => setFormularioTipoDeViajeVisible(!formularioTipoDeViajeVisible)}>
                            <FaPlaneDeparture />
                            <p id='opcionTipoDeViaje'>{tipoDeViaje}</p>
                            <IoIosArrowUp id='flechaTipo' className={formularioTipoDeViajeVisible ? 'dadoVuelta BttnAzul' : 'BttnAzul'} />
                            <div id='FormularioTipoDeViaje' onClick={() => setFormularioTipoDeViajeVisible(false)}>
                                <div id='select'>
                                    <h3 id='IdaVuelta' onClick={() => setTipoDeViaje('Ida y Vuelta')}>Ida y Vuelta <TiTick id='IdaVueltaTick' /></h3>
                                    <span></span>
                                    <h3 id='Ida' onClick={() => setTipoDeViaje('Ida')}>Ida <TiTick id='IdaTick' /></h3>
                                </div>
                            </div>
                        </div>
                        {/* formulario cantidad de personas */}
                        <div id='CantidadPersonas' className='Input' onClick={() => setFormularioCantidadPasajerosVisible(true)}>
                            <FaUser />
                            <p>{cantidadPasajeros}</p>
                            <IoIosArrowUp className={ formularioCantidadPasajerosVisible ? 'dadoVuelta BttnAzul' : 'BttnAzul' } />
                        </div>
                        <div id='FormularioCantidadPasajeros' onClick={() => setFormularioCantidadPasajerosVisible(true)} className={formularioCantidadPasajerosVisible ? '' : 'invisible'}>
                            <div>

                                <div className='ContainerTipoPasajero'>
                                    <div className='eleccionCategoriaPasajero'>
                                        <h3>Adultos</h3>
                                        <div className='botonesCantidadPasajeros'>
                                            <FaMinus onClick={() => setCantidadAdultos(cantidadAdultos - 1)} />
                                            <p>{cantidadAdultos}</p>
                                            <FaPlus onClick={() => setCantidadAdultos(cantidadAdultos + 1)} />
                                        </div>
                                    </div>
                                </div>
                                <div className='ContainerTipoPasajero' >
                                    <div className='eleccionCategoriaPasajero'>
                                        <h3>Niños</h3>
                                        <div className='botonesCantidadPasajeros'>
                                            <FaMinus onClick={() => setCantidadNinos(cantidadNinos - 1)} />
                                            <p>{cantidadNinos}</p>
                                            <FaPlus onClick={() => setCantidadNinos(cantidadNinos + 1)} />
                                        </div>
                                    </div>
                                    <p>Niños debajo de los 14 años (menores acompañados) no pueden viajar solos en HM</p>
                                </div>
                                <div className='ContainerTipoPasajero'>
                                    <div className='eleccionCategoriaPasajero'>
                                        <h3>Bebés</h3>
                                        <div className='botonesCantidadPasajeros'>
                                            <FaMinus onClick={() => setCantidadBebes(cantidadBebes - 1)} />
                                            <p>{cantidadBebes}</p>
                                            <FaPlus onClick={() => setCantidadBebes(cantidadBebes + 1)} />
                                        </div>
                                    </div>
                                    <p>Debajo de los 2 años, deben viajar sentados sobre el tutor responsable.</p>
                                </div>
                                <button onClick={() => setFormularioCantidadPasajerosVisible(false)}>Listo</button>
                            </div>

                        </div>
                    </div>


                    <div className='formAbajo'>

                        {/* SELECCION DE ORIGEN Y DESETINO  */}
                        <div id='DestinoOrigen'>
                            <div id='Origen' className='Input Select' onClick={() => setFormularioOrigenVisible(true)}>
                                <p>Origen</p>
                                <div className='selectInput'>
                                    <h3>{origenSeleccionado.code == '' ? 'Desde' : origenSeleccionado.code}</h3>
                                    <IoIosArrowUp className='BttnAzul Arrow' />
                                </div>
                            </div>
                            <div id='FormularioOrigen' onClick={() => setFormularioOrigenVisible(false)} className={formularioOrigenVisible ? '' : 'invisible'}>
                                <div id='selectOrigen'>
                                    {origenes}
                                </div>
                            </div>
                            <div id='Destino' className='Input Select' onClick={() => setFormularioDestinoVisible(true)}>
                                <p>Destino</p>
                                <div className='selectInput'>
                                    <h3>{destinoSeleccionado.code == '' ? 'Hasta' : destinoSeleccionado.code }</h3>
                                    <IoIosArrowUp className='BttnAzul Arrow' />
                                </div>
                            </div>
                            <div id='FormularioOrigen' onClick={() => setFormularioDestinoVisible(false)} className={formularioDestinoVisible ? '' : 'invisible'}>
                                <div id='selectOrigen'>
                                    {destinos}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Menu lado Derecho */}

                <div className='derecha'>
                    <button className='Boton2'>Destinos</button>
                    <button className='Boton2'>Experiencia HM</button>
                    <div className='Usuario'>
                        <button className='Boton2' id='Login'>Login</button>
                        <span></span>
                        <button className='Boton2'>Registrate</button>
                    </div>
                    <div id='MenuDesktop'>
                        <IoIosMenu />
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Navbar