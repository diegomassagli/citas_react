// antes del return se puede colocar codigo javascript
// dentro del return no if no funciones si es lo que se ve en pantalla
// dentro del return, no van funciones, salen por pantalla, el codigo javascript va entre llaves 

import { useState, useEffect } from 'react'
import Formulario from "./components/Formulario"
import Header from "./components/Header"
import ListadoPacientes from "./components/ListadoPacientes"


function App() {  
 
  const [ pacientes, setPacientes ] = useState([]);  // otra opcion? = useState(JSON.parse(localStorage.getItem('pacientes')) ?? [])
  const [ paciente, setPaciente ] = useState({});


  useEffect( () => {
    const obtenerLS = () => {
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];  // ?? devuelve el operador del lado derecho cuando el lado izquierdo es nulo o undefined
      setPacientes(pacientesLS)
    }
    obtenerLS();  // llama a la funcion
  },[]);  // como no le puse dependencias, se va a ejecutar solo una vez, cuando el componente esta listo. ES IMPORTANTE EL ORDEN PORQUE ESTE LLENA pacientes !!

  // el localStorage no permite guardar arreglos, solo string !!   se ejecuta con altas, bajas, modificaciones etc
  useEffect( () => {
    localStorage.setItem('pacientes', JSON.stringify( pacientes ));
  }, [pacientes])


  const eliminarPaciente = id => {
    const pacientesActualizados = pacientes.filter(paciente => paciente.id !==id)    //me traigo los que son diferentes y filter devuelve un arreglo nuevo
    setPacientes(pacientesActualizados)
  }


  return (
    <div className="container mx-auto mt-20">
  
      <Header />
      <div className="mt-12 md:flex">     
        <Formulario 
          pacientes={pacientes}
          setPacientes={setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
        <ListadoPacientes 
          pacientes={pacientes}   
          setPaciente = {setPaciente}    
          eliminarPaciente={eliminarPaciente}
        />
      </div>

    </div>
  )
}

export default App
