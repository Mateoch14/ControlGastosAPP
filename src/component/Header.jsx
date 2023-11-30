import NuevoPresupuesto from "./NuevoPresupuesto"
import ControlPresupuesto from "./ControlPresupuesto"

const Header = ({gastos,setGastos,presupuesto, setPresupuesto, IsValidPresupuesto, setIsValidPresupuesto}) => {

    return(
        <header>
            <h1> Planificador de Gastos</h1>

            {IsValidPresupuesto ? 
                (<ControlPresupuesto
                    gastos={gastos}
                    setGastos={setGastos}
                    presupuesto={presupuesto}
                    setPresupuesto={setPresupuesto}
                    setIsValidPresupuesto={setIsValidPresupuesto}
                />)
            : (
                <NuevoPresupuesto
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
            />
            )}
            
        </header>
    )
}

export default Header