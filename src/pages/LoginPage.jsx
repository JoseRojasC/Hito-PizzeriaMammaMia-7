import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../Context/UserContext'; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { login } = useUserContext();  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage('Todos los campos son obligatorios.');
    } else if (password.length < 6) {
      setMessage('La contraseña debe tener al menos 6 caracteres.');
    } else {
      try {
        await login({ email, password });
        setMessage('Inicio de sesión exitoso.');
        setTimeout(() => navigate("/profile"), 2000); 
      } catch (error) {
        setMessage('Credenciales incorrectas.');
      }
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="col-md-6">
        <div className="card shadow-lg p-4">
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          {message && <div className="alert alert-info text-center">{message}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Introduce tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                placeholder="Introduce tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
