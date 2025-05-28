import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignIn.css'; 

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      const response = await fetch('https://lavina.onrender.com/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      });

      const data = await response.json();
      console.log('Server response:', data);

      if (response.ok && data?.isOk) {
        // Сохраняем все данные пользователя
        localStorage.setItem("user", JSON.stringify(data));
        
        // Отдельно сохраняем key и secret если они есть в ответе
        if (data.key) {
          localStorage.setItem("key", data.key);
        }
        if (data.secret) {
          localStorage.setItem("secret", data.secret);
        }
        
        navigate('/hero');
      } else {
        // Обработка ошибок входа
        setErrors({
          general: data?.message || 'Invalid username or password'
        });
      }
    } catch (error) {
      console.error('SignIn error:', error);
      setErrors({
        general: 'An error occurred during sign in'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-form-wrapper">
        <form className="signin-form" onSubmit={handleSubmit}>
          <h2 className="signin-title">Sign in</h2>

          {errors.general && (
            <div className="error-message general-error">
              {errors.general} 
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={`form-input ${errors.username ? 'error' : ''}`}
              placeholder="Username"
            />
            {errors.username && (
              <div className="error-message">{errors.username}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`form-input ${errors.password ? 'error' : ''}`}
              placeholder="Password"
            />
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Sign In'}
          </button>

          <div className="signup-link">
            Don't have an account? <Link to="/signup" className="link">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;