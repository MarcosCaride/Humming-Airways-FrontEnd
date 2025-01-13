import React from 'react'

import './DateItem.css'
const dias = ["Dom", "Lun", "Mar", "Mie", "Jue", "Sab"]


const DateItem = ({columnPosition, rowPosition, dia, mes, handleDataSalida, disabled}) => {
    const ifDisabled = () => {
        if (!disabled) {
            handleDataSalida(`${dias[columnPosition]}, ${mes} ${dia}`)
        }
    } 
    return (
        <div className={disabled ? `pos${columnPosition}` + ' Dia deshabilitada' : `pos${columnPosition}` + ' Dia'} onClick={() => ifDisabled()}>{dia}</div>
    )
}

export default DateItem