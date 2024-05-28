import { Link } from 'react-router-dom';
import  { useState } from 'react';
import './App.css';
import logo from './images/logo.png';
import ProgressBody from './components/ProgressBody';
import ProgressRoutines from './components/progressRoutines';
function App() {
  const [activeCategory, setActiveCategory] = useState('Entrenamiento');
  
  return (
    <>
      <nav className="navigation">
        <img src={logo} alt="Logo" className="logo" />
        <Link className='link' to="/register">Registrarme</Link>
      </nav>
      <div className="content">
        <h1 className='title'>Progreso</h1>
        <div>
          <div className='category'>
            <h2 
              className={`category-title ${activeCategory === 'Entrenamiento' ? 'active' : ''}`} 
              onClick={() => setActiveCategory('Entrenamiento')}
            >
              Entrenamiento
            </h2>
            <h2 
              className={`category-title ${activeCategory === 'Cuerpo' ? 'active' : ''}`} 
              onClick={() => setActiveCategory('Cuerpo')}
            >
              Cuerpo
            </h2>
          </div>
          <div>
            {activeCategory === 'Entrenamiento' ? <ProgressRoutines /> : <ProgressBody />}
          </div>
        </div>
      </div>
    </>
  );
  
}

export default App;



