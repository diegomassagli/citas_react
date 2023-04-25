import { useState, useEffect } from 'react';

import Error from './Error';


const Formulario = ( { pacientes, setPacientes, paciente, setPaciente } ) => {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  useEffect( () => {
    if (Object.keys(paciente).length > 0) {  // esta es una forma de comprobar si un objeto tiene algo
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)        // no puede zafar de poner paciente.sintomas porque ya esta usada la variable sintomas en el useState y se confundiria...
    }     
  }, [paciente])

  const generarId = () => {
    const random = Math.random().toString(36).slice(2)
    const fecha = Date.now().toString(36)
    return random + fecha
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    // validacion del formulario
    if([nombre, propietario, email, fecha, sintomas ].includes('')) {      
      setError(true)
      return
    }

    setError(false)

    // aca ya pasamos la validacion, ahora agregamos los pacientes
    // construyo el objeto y como nombre y valor se llaman igual solo pongo uno
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas
    }
    
    if (paciente.id) {  //significa que estamos editando
        // editando
        objetoPaciente.id = paciente.id      
        const pacientesActualizados = pacientes.map ( pacienteState =>    // no puedo usar paciente porque ya esta usada, este pacienteState es c/u de los elementos del state principal y paciente es EL PACIENTE QUE ESTOY EDITANDO
          pacienteState.id === paciente.id ? objetoPaciente : pacienteState )  // aca lo que hago es si encontre el id que estoy modificando, reemplazo con ObjetoPaciente editado, sino devuelvo pacienteState que era el original          
        
        setPacientes(pacientesActualizados)  // aca tengo el nuevo arreglo ya "actualizado"

        setPaciente({})   // limpio el state del paciente editado

    } else {
        objetoPaciente.id = generarId();
        setPacientes([...pacientes, objetoPaciente])  // si hago asi, es mala practica, porque no estoy preservando los pacientes anteriores, debo ir agregando. Si fueran medios de pagos, quizas tendria que ir reescribiendo y quedarme con el ultimo
                        // no puedo utilizar el metodo "push" para modificar el arreglo, es mala practica. Estaria modificando un arreglo sin pasar por el "setPacientes"
    }
    

    // Reiniciar el Formulario
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')

  }

  return (
    <div className="md:w-1/2 lg:w-2/5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {' '}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form 
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-5">

        { error && <Error><p>Todos los campos son obligatorios</p></Error> }
               
        <div className="mb-5">
          <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
            Nombre Mascota
          </label>
          <input 
          id="mascota"
            type="text" 
            placeholder="Nombre de la Mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={ (e) => setNombre(e.target.value)}  /* esto es un callback y tenemos acceso a e que es el evento de este onchange*/ 
          />
        </div>

        <div className="mb-5">
          <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">
            Nombre Propietario
          </label>
          <input 
          id="propietario"
            type="text" 
            placeholder="Nombre del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={ (e) => setPropietario(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
            Email
          </label>
          <input 
          id="email"
            type="email" 
            placeholder="Email Contacto Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={ (e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
            Fecha de Alta
          </label>
          <input 
          id="alta"
            type="date" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange={ (e) => setFecha(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
            Sintomas
          </label>
          <textarea 
          id="sintomas"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Describe los Sintomas"
          value={sintomas}
          onChange={ (e) => setSintomas(e.target.value)}
          /> 
        </div>

        <input 
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
          value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente' }
        />

      </form>
    </div>
  )
}
export default Formulario
