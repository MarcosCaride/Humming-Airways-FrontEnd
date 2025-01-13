import React, { useEffect, useState } from 'react'
import DateItem from './Datepicker/DateItem.jsx'
import { GrNext, GrPrevious  } from "react-icons/gr";

import './DatePicker.css'

const DatePicker = ({handleDataRegreso, handleDataSalida, datePickerVisible, fechaRegreso, fechaSalida, fechasVuelos}) => {
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Novimbre", "Diciembre"];
    const dias = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"]
    let currentDate = new Date()
    const getDays = (year, month) => new Date(year, month, 0).getDate()

    console.log("Iniciando DatePicker");
    let fechaInicial = new Date(fechaSalida);
    let fechaFinal = new Date(fechaRegreso);
    console.log(fechaInicial);
    console.log(fechaFinal);
    console.log(fechasVuelos);
    
    

    const [firstMonth, setFirtsMonth] = useState()
    const [ date, setDate ] = useState(currentDate)
    const [secondMonth, setSecondMonth] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth()+2, 0))
    const [ days2ndMonth, setDays2ndMonth ] = useState(getDays(secondMonth.getFullYear(), secondMonth.getMonth()))
    
    const daysFirstMonth = getDays(currentDate.getFullYear(), currentDate.getMonth())
    let diasCalendario = []
    
    for (let index = 1; index <= 42; index++) {
        let mes = new Date(date.getFullYear(), date.getMonth(), index)
        let fecha = mes.getDay()
        
        let semana = 0

        if (mes.getMonth() == date.getMonth()) {
            switch (fecha) {
                case 6:
                    semana = semana + 1
                    if (fechasVuelos) {
                        let deshabilitada = false;
                        fechasVuelos.disabled.forEach(fecha => {
                            let fechaDeshabilitada = new Date(fecha)
                            fechaDeshabilitada.setHours(0)

                            if (mes.getTime() === fechaDeshabilitada.getTime()) {
                                deshabilitada = true
                            }
                        });    
                        if (deshabilitada) {
                            diasCalendario.push(<DateItem columnPosition={fecha} rowPosition={semana} dia={index} mes={meses[currentDate.getMonth()]} key={index} handleDataRegreso={handleDataRegreso} handleDataSalida={handleDataSalida} disabled={true} />)
                        }else {
                            diasCalendario.push(<DateItem columnPosition={fecha} rowPosition={semana} dia={index} mes={meses[currentDate.getMonth()]} key={index} handleDataRegreso={handleDataRegreso} handleDataSalida={handleDataSalida} disabled={false} />)
                        }
                    }
                    break;
            
                default:
                    if (fechasVuelos) {
                        let deshabilitada = false;
                        fechasVuelos.disabled.forEach(fecha => {
                            let fechaDeshabilitada = new Date(fecha)
                            fechaDeshabilitada.setHours(0)
                            
                            if (mes.getTime() === fechaDeshabilitada.getTime()) {
                                deshabilitada = true
                            }

                        });
                        
                        if (deshabilitada) {
                            diasCalendario.push(<DateItem columnPosition={fecha} rowPosition={semana} dia={index} mes={meses[currentDate.getMonth()]} key={index} handleDataRegreso={handleDataRegreso} handleDataSalida={handleDataSalida} disabled={true} />)
                        }else {
                            diasCalendario.push(<DateItem columnPosition={fecha} rowPosition={semana} dia={index} mes={meses[currentDate.getMonth()]} key={index} handleDataRegreso={handleDataRegreso} handleDataSalida={handleDataSalida} disabled={false} />)
                        }
                    }
                    break;
            }
            
        }else {
            diasCalendario.push(<div key={index} className={fecha + " blank" }></div>)
        }
        
    }

    let diasCalendario2doMes = []

    for (let index = 1; index <= 42; index++) {
        let mes = new Date(secondMonth.getFullYear(), secondMonth.getMonth(), index)
        let fecha = mes.getDay()
        let semana = 0
        
        if (mes.getMonth() == secondMonth.getMonth()) {
            switch (fecha) {
                case 6:
                    if (fechasVuelos) {
                        let deshabilitada = false;
                        fechasVuelos.disabled.forEach(fecha => {
                            let fechaDeshabilitada = new Date(fecha)
                            fechaDeshabilitada.setHours(0)

                            if (mes.getTime() === fechaDeshabilitada.getTime()) {
                                deshabilitada = true
                            }
                        });    
                        if (deshabilitada) {
                            diasCalendario2doMes.push(<DateItem columnPosition={fecha} rowPosition={semana} dia={index} mes={meses[currentDate.getMonth()]} key={index} handleDataRegreso={handleDataRegreso} handleDataSalida={handleDataSalida} disabled={true} />)
                        }else {
                            diasCalendario2doMes.push(<DateItem columnPosition={fecha} rowPosition={semana} dia={index} mes={meses[currentDate.getMonth()]} key={index} handleDataRegreso={handleDataRegreso} handleDataSalida={handleDataSalida} disabled={false} />)
                        }
                    }
                    
                    semana = semana + 1

                break;
            
                default:
                    if (fechasVuelos) {
                        let deshabilitada = false;
                        fechasVuelos.disabled.forEach(fecha => {
                            let fechaDeshabilitada = new Date(fecha)
                            fechaDeshabilitada.setHours(0)
                            
                            if (mes.getTime() === fechaDeshabilitada.getTime()) {
                                deshabilitada = true
                            }

                        });
                        
                        if (deshabilitada) {
                            diasCalendario2doMes.push(<DateItem columnPosition={fecha} rowPosition={semana} dia={index} mes={meses[currentDate.getMonth()]} key={index} handleDataRegreso={handleDataRegreso} handleDataSalida={handleDataSalida} disabled={true} />)
                        }else {
                            diasCalendario2doMes.push(<DateItem columnPosition={fecha} rowPosition={semana} dia={index} mes={meses[currentDate.getMonth()]} key={index} handleDataRegreso={handleDataRegreso} handleDataSalida={handleDataSalida} disabled={false} />)
                        }
                    }
                    // diasCalendario2doMes.push(<DateItem columnPosition={fecha} rowPosition={semana} dia={index} mes={meses[currentDate.getMonth()]} key={index} handleDataRegreso={handleDataRegreso} handleDataSalida={handleDataSalida} />)
                    break;
            }
            
        }else {
            diasCalendario2doMes.push(<div key={index} className={fecha + " blank" }></div>)
        }
    }
    

    const nextMonth = () => {
        if (!(date.getMonth() >= fechaFinal.getMonth())) {
            switch (secondMonth.getMonth()) {
                case 11:
                    setDate(new Date(date.getFullYear()+1, 1, 0))
                    setSecondMonth(new Date(date.getFullYear(), date.getMonth()+3, 0))
                    break;
    
                case 10:
                    setDate(new Date(date.getFullYear(), date.getMonth()+2, 0))
                    setSecondMonth(new Date(date.getFullYear()+1, 1, 0))
                    break
            
                default:
                    setDate(new Date(date.getFullYear(), date.getMonth()+2, 0))
                    setSecondMonth(new Date(date.getFullYear(), date.getMonth()+3, 0))
                    break;
            }
        }
    }

    const prevMonth = () => {
        if (!(date.getMonth() <= fechaInicial.getMonth())) {
            console.log(!(date.getMonth <= fechaInicial));
            
            switch (date.getMonth()) {
                case 0:
                    setDate(new Date(date.getFullYear()-1, 12, 0))
                    setSecondMonth(new Date(secondMonth.getFullYear(), 1, 0))
                    break;
                
                case 11:
                    setDate(new Date(date.getFullYear(), date.getMonth(), 0))
                    setSecondMonth(new Date(date.getFullYear(), 12, 0))
                    break;
            
                default:
                    setDate(new Date(date.getFullYear(), date.getMonth(), 0))
                    setSecondMonth(new Date(date.getFullYear(), secondMonth.getMonth(), 0))
                    break;
            }
            
        }
    }
    
    useEffect(() => {

    }, [date, secondMonth])
    
    
    return (
        <>
            <div id='DatePicker'>
                <div onClick={() => prevMonth()} id='btnMesAnterior'>
                    <GrPrevious />
                </div>
                <section id='primerMes'>
                    <h2>{meses[date.getMonth()]}, {date.getFullYear()}</h2>
                    <div id='calendario'>
                        {
                            dias.map((cod) => <p className='diaCalendario' key={cod}>{cod}</p>
                            )
                        }

                        {diasCalendario.map((dia) => dia )}
                        
                    </div>
                    
                </section>
                <span id='spanCalendario'></span>
                <section id='primerMes'>
                    <h2>{meses[secondMonth.getMonth()]}, {secondMonth.getFullYear()}</h2>
                    <div id='calendario'>
                        {dias.map((dia) => {
                            <p className='diaCalendario' key={dia}>{dia}</p>
                        })}

                        {
                            dias.map((cod) => <p className='diaCalendario' key={cod}>{cod}</p>
                            )
                        }
                        {diasCalendario2doMes.map((dia) => dia )}
                        
                    </div>
                    
                </section>
                <div onClick={() => nextMonth()} id='btnMesSiguiente'>
                    <GrNext />
                </div>
                <div>
                    <button id='doneBttn' onClick={ () => datePickerVisible()}>Listo</button>
                </div>
            </div>
        </>
    )
}

export default DatePicker