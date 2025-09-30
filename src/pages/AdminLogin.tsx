import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/admin'); 
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-3xl font-serif text-center mb-6" style={{ color: '#3E0309' }}>
          Admin Login
        </h2>
        {error && (
          <p className="text-rose-500 text-center mb-4 text-sm font-medium">{error}</p>
        )}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-200 transition-colors"
              style={{ borderColor: '#3E0309' }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-200 transition-colors"
              style={{ borderColor: '#3E0309' }}
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full py-3 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#3E0309' }}
          >
            Sign In
          </button>
        </div>
        <p className="text-center text-sm text-gray-600 mt-6">
          Forgot your password?{' '}
          <a
            href="/contact"
            className="text-rose-200 hover:text-rose-300 transition-colors"
            style={{ color: '#3E0309' }}
          >
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
