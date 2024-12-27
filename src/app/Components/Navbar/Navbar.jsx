"use client"
import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import { IoIosMenu, IoIosArrowUp } from "react-icons/io";
import { FaPlaneDeparture, FaUser  } from "react-icons/fa";
import { TiTick  } from "react-icons/ti";

const Navbar = () => {

    const [ formularioReservaVisible, setFromularioVisible ] = useState(false)
    const [ formularioTipoDeViajeVisible, setFormularioTipoDeViajeVisible ] = useState(false)
    const [ formularioCantidadPasajerosVisible, setFormularioCantidadPasajerosVisible ] = useState(false)

    const [ tipoDeViaje, setTipoDeViaje ] = useState('Ida y Vuelta')
    let origenSeleccionado

    useEffect(() => {
        let formulario = document.getElementById('FormularioReserva')
        let formularioTipoDeViaje = document.getElementById('FormularioTipoDeViaje')
        let formularioCantidadPasajeros = document

        let flechaTipo = document.getElementById('flechaTipo')

        let botonIda = document.getElementById('Ida')
        let tickIda = document.getElementById('IdaTick')
        let botonIdaVuelta = document.getElementById('IdaVuelta')
        let tickIdaVuelta = document.getElementById('IdaVueltaTick')
        console.log(flechaTipo);
        
        
        if (formularioReservaVisible) {
            formulario.classList.remove('invisible')
        }else{
            formulario.classList.add('invisible')
        }

        if (formularioTipoDeViajeVisible) {
            formularioTipoDeViaje.classList.remove('invisible')
            flechaTipo.classList.add('dadoVuelta')
        }else{
            formularioTipoDeViaje.classList.add('invisible')
            flechaTipo.classList.remove('dadoVuelta')
        }

        if (tipoDeViaje == 'Ida y Vuelta') {
            botonIdaVuelta.classList.add('seleccionado')
            botonIda.classList.remove('seleccionado')
            tickIda.style.display = 'none'
            tickIdaVuelta.style.display = 'inline'

        }else{
            botonIdaVuelta.classList.remove('seleccionado')
            botonIda.classList.add('seleccionado')
            tickIda.style.display = 'inline'
            tickIdaVuelta.style.display = 'none'
        }
    }, [formularioReservaVisible, formularioTipoDeViajeVisible, tipoDeViaje])
    
    

    useEffect(() => {
        async function getData() {
            let token = '4f2a879bd30eb1e8aaa328850c2306b2e376eab11acf6c3bb647772ee6e8a8a9'
            let response = await fetch( "https://hummingairways.xgestion.com.ar/intranet/sys/mods/flights/motor.php", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': `Bearer ${token}`
                },
                body: {
                    "execute": "getAirportsFrom"
                }
            })
            
            const data  = await response
            console.log(data);
        }
        getData()
    })

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
                        <div id='TipoDeViaje' onClick={() => setFormularioTipoDeViajeVisible(!formularioTipoDeViajeVisible)}>
                            <FaPlaneDeparture />
                            <p id='opcionTipoDeViaje'>{tipoDeViaje}</p>
                            <IoIosArrowUp id='flechaTipo' />
                            <div id='FormularioTipoDeViaje' onClick={() => setFormularioTipoDeViajeVisible(false)}>
                                <div id='select'>
                                    <h3 id='IdaVuelta' onClick={() => setTipoDeViaje('Ida y Vuelta')}>Ida y Vuelta <TiTick id='IdaVueltaTick' /></h3>
                                    <span></span>
                                    <h3 id='Ida' onClick={() => setTipoDeViaje('Ida')}>Ida <TiTick id='IdaTick' /></h3>
                                </div>
                            </div>
                        </div>
                        {/* formulario cantidad de personas */}
                        <div id='CantidadPersonas'  onClick={() => setFormularioCantidadPasajerosVisible(false)}>
                            <FaUser />
                            <IoIosArrowUp id='flechaTipo' />
                            <div>
                                <div>
                                    <div>
                                    <h3>Adultos</h3>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <h3>Niños</h3>
                                        <p>Niños debajo de los 14 años (menores acompañados) no pueden viajar solos en HM</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <h3>Bebés</h3>
                                        <p>Debajo de los 2 años, deben viajar sentados sobre el tutor responsable.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='formAbajo'>
                        <div id='DestinoOrigen'>
                            <div id='Origen'>
                                <p>Origen</p>
                                <h3>{origenSeleccionado}</h3>
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