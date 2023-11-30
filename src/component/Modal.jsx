import { useState,useEffect } from 'react'
import Mensaje from './Mensaje'
import CerrarBtn from '../img/cerrar.svg' 

const Modal = ({setModal, animarModal,setAnimarModal,guardarGasto,gastoEditar,setGastoEditar}) => {

    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [id, setId] = useState('')
    const [fecha, setFecha] = useState('')

    useEffect(() => {
        if(Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
          }
    }, [])
    const ocultarModal = () => {
        setAnimarModal(false)
        setGastoEditar({})
        setTimeout(() => {
            setModal(false)
        }, 500)
    }

    const handleSubmit = e => {
        e.preventDefault()

        if([nombre,cantidad,categoria].includes('')){
       
            setMensaje('Todos los campos son obligatorios')
            
            setTimeout((e) => {
                setMensaje('')
            }, 3000)
            return
        }

       guardarGasto({nombre,cantidad,categoria,id,fecha})
    }
    return (
    <div className='modal'>
        <div className='cerrar-modal'>
            <img src={CerrarBtn} alt="cerrar modal" onClick={ocultarModal} />
        </div>

        <form 
        onSubmit={handleSubmit}
        className={`formulario ${animarModal ? "animar" : 'cerrar'}`} >
                <legend>{gastoEditar.nombre ? 'Editar gasto' : 'nuevo gasto'}</legend>

                {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}

                <div className='campo'>
                    <label htmlFor="nombre"> Nombre Gastos</label>

                    <input 
                    id='nombre'
                    type="text" 
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    placeholder='añade el nombre del gasto'
                     />
                </div>
                <div className='campo'>
                    <input 
                    id='cantidad'
                    type="text" 
                    value={cantidad}
                    onChange={e => setCantidad(Number(e.target.value))}
                    placeholder='añade la cantidad del gasto ej: 300'
                    />
                </div>

                <div className='campo'>
                    <select id="categoria" value={categoria} onChange={e => setCategoria(e.target.value)}>
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro"> Ahorro </option>
                        <option value="comida"> Comida </option>
                        <option value="casa"> Casa </option>
                        <option value="gastos"> Gastos Varios </option>
                        <option value="ocio"> Ocio </option>
                        <option value="salud"> Salud </option>
                        <option value="suscripciones"> Suscripciones </option>
                    </select>
                </div>
                
                <input 
                type="submit"
                value={gastoEditar.nombre ? 'Guardar cambios' : 'Añadir gasto'} />
        </form>
    </div>
  )
}

export default Modal