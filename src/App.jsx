import { useState, useEffect } from 'react'
import Header from './component/Header'
import Filtros from './component/Filtros'
import Modal from './component/Modal'
import ListadoGastos from './component/ListadoGastos'
import { generarId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import { object } from 'prop-types'


function App() {
   
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  )
   const [IsValidPresupuesto, setIsValidPresupuesto] = useState(false)
   const [modal, setModal] = useState(false)
   const [animarModal, setAnimarModal] = useState(false)
  
   const [gastoEditar, setGastoEditar] = useState({})
   
   const [filtro, setFiltro] = useState('')
   const [gastosFiltrados, setGastosFiltrados] = useState([])
   
   useEffect(() => {
    if(Object.keys(gastoEditar).length > 0) {
      setModal(true)
     
      setTimeout(() => {
        setAnimarModal(true)
      }, 600)
    }
   },[gastoEditar])

  /*******************useEfect localStorage****************************************** */
   useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
    },[presupuesto])
  
    useEffect(() =>{
      localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
      },[gastos])
    
   useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0

    if(presupuestoLS >0){
      setIsValidPresupuesto(true)
    }
  },[])
  
/************************************************************* */
  

  /***********************useEfect para filtros************************************* */
useEffect(() => {
  if(filtro){
    // filtrar gastos por categoria
    const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
    setGastosFiltrados(gastosFiltrados)
  }
}, [filtro])

 /******************************************************************************** */

 const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})
    setTimeout(() => {
      setAnimarModal(true)
    }, 600)
   }

   const guardarGasto = gasto => {

    if(gasto.id){
      //actualizar
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    }else{
      gasto.id = generarId()
      gasto.fecha = Date.now()
      console.log('esto es un gasto', gasto);
      
      setGastos([...gastos, gasto])
    }

    

    setAnimarModal(false)
    setTimeout(() => {
      setModal(false)
    }, 500)
   }

   const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizados)
   }

   

   return (
    <div className={modal ?'fijar' : ''}>
      <Header
        gastos = {gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        IsValidPresupuesto={IsValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {IsValidPresupuesto && 
          (
          <>
            <main>
              <Filtros
                filtro={filtro}
                setFiltro={setFiltro}
              />
              <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
              />
            </main>
            <div className='nuevo-gasto'>
                <img 
                src={IconoNuevoGasto} 
                alt="icono nuevo gasto" 
                onClick={handleNuevoGasto}/>
            </div>
          </>)
      }

      {modal && <Modal 
      setModal={setModal} 
      animarModal={animarModal}
      setAnimarModal={setAnimarModal}
      guardarGasto={guardarGasto}
      gastoEditar={gastoEditar}
      setGastoEditar={setGastoEditar}
      />
      }
      
    </div>
  )
}

export default App
