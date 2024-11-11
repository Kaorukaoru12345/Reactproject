import React, { useState } from 'react';
import '../../App.css';
import './SignUp.css';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import './index.css';
import { supabase } from 'C:/Users/Kaoru/Desktop/react/my-react-website/src/supabaseClient.js';
import { useNavigate } from 'react-router-dom';

const LoginRegister = () => {
  const [action, setAction] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const registerLink = () => {
    setAction(' active');
  };

  const loginLink = () => {
    setAction('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    // Redirect after handling login regardless of success or error
    window.location.href = "http://localhost:3000/"; // Always redirect after attempting to log in

    if (error) {
      setError(error.message);
    } else {
      const user = data?.user;
      if (user) {
        console.log('Logged in user:', user);
        navigate('/dashboard'); // Optionally navigate to dashboard if desired
      } else {
        setError('Login failed. No user data returned.');
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      // Check for specific errors
      if (error.message.includes("user_already_exists")) {
        setError("This email is already registered. Please use a different email."); // Specific error message
      } else {
        setError(error.message); // Display other errors
      }
      // Redirect regardless of error
      window.location.href = "http://localhost:3000/"; // Redirect after error
      return; // Stop execution if there's an error
    }

    const user = data?.user;
    if (!user) {
      setError('Registration failed. No user data returned.');
      window.location.href = "http://localhost:3000/"; // Redirect after error
      return;
    }

    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{ id: user.id, username }]);

    if (profileError) {
      setError(profileError.message);
      window.location.href = "http://localhost:3000/"; // Redirect after error
      return;
    }

    console.log('Registration successful:', user);
    setSuccess('Registration successful! Redirecting to the dashboard...');
    
    // Redirect after successful registration
    window.location.href = "http://localhost:3000/";
  };

  return (
    <body class="background">
    <div className={`wrapper${action}`}>
      <div className="form-box login">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <FaEnvelope className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <FaLock className="icon" />
          </div>
          <button type="submit" disabled={loading}>Login</button>
          <div className="register-link">
            <p>
              Don't have an account? <a href="#" onClick={registerLink}>Register</a>
            </p>
          </div>
        </form>
      </div>
      <div className="form-box register">
        <form onSubmit={handleRegister}>
          <h1>Registration</h1>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              id="name"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <FaEnvelope className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <FaLock className="icon" />
          </div>
          <button type="submit" disabled={loading}>Register</button>
          <div className="register-link">
            <p>
              Already have an account? <a href="#" onClick={loginLink}>Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
    </body>
  );
};

export default LoginRegister;
