import '../css/Register.css'
import image from '../images/img.jpg'
import logo from '../images/logo.png'
import user from '../images/user.png'
import phone from '../images/tel.png'
import gmail from '../images/gmail.png'
import password from '../images/password.png'
import arrow from '../images/flecha.png'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { RegisterFormData } from "../models/RegisterFormData ";
import { registerUser } from '../api/auth'
import { useState } from 'react'
import ModalRegister from './ModalRegister'
import { addProgressBody } from '../api/data'
import { addProgressRoutines } from '../api/data'
function Register() {
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); 
    const { register, handleSubmit } = useForm<RegisterFormData>();

    const onSubmit = async (data: RegisterFormData) => {
        setIsLoading(true);
        console.log(data);
        try {
          const response = await registerUser(data);
          console.log('Success:', response);
          setIsLoading(false);
          if (response.message) {
            setShowModal(true);
            setMessage(response.message);
          } else if (response.error) {
            setShowModal(true);
            setMessage(response.error);
          } else if (response.id) {
            await addProgressBody(response.id);
            await addProgressRoutines(response.id);
            setShowModal(true);
            setMessage('¡Registrado correctamente!');
          }
        } catch (error) {
          console.log('Error:', error);
          setIsLoading(false);
        }
      };
      
    

    return (
        <>
            <div className='ContRegister'>
                <div className='contentr'>
                    <div>
                        <Link to="/">
                            <img src={arrow} alt="Return" className='return' />
                        </Link>
                    </div>
                    <div className='formulary'>
                        <img src={logo} alt="" className='logor' />
                        <h1 className='titleformulary'>Hola, <br />Registrate ahora</h1>
                        <form onSubmit={handleSubmit(onSubmit)}
                            className="inputs">
                            <div className="input-container">
                                <img src={user} alt="" className='logos' />
                                <input type="text" {...register("username", { required: true })} className="input" placeholder="Nombre" />
                            </div>
                            <div className="input-container">
                                <img src={phone} alt="" className='logos' />
                                <input type="tel" {...register("phone", { required: true })} className="input" placeholder="Número de Teléfono" />
                            </div>
                            <div className="input-container">
                                <img src={gmail} alt="" className='logos' />
                                <input type="email" {...register("email", { required: true })} className="input" placeholder="Correo" />
                            </div>
                            <div className="input-container">
                                <img src={password} alt="" className='logos' />
                                <input type="password" {...register("password", { required: true })} className="input" placeholder="Contraseña" />
                            </div>
                            <div className='contentbutton'>
                                <button type="submit" className='button textbutton'>
                                    {isLoading ? 'Cargando...' : <p className='textbutton'>Registrate aquí</p>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='image'>
                    <img className='imgregister' src={image} alt="" />
                </div>
            </div>
            <ModalRegister showModal={showModal} setShowModal={setShowModal} message={message} />
        </>
    );
}

export default Register;


