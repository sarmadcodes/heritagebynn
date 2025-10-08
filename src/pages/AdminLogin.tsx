<<<<<<< HEAD

=======
>>>>>>> 9f90e478c2b211e0bfeca9cae52073ffdd57d972
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

<<<<<<< HEAD
export function AdminLogin() {
=======
const AdminLogin = () => {
>>>>>>> 9f90e478c2b211e0bfeca9cae52073ffdd57d972
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

<<<<<<< HEAD
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/admin');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
=======
  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/admin'); 
    } catch (err) {
      setError('Login failed. Please check your credentials.');
>>>>>>> 9f90e478c2b211e0bfeca9cae52073ffdd57d972
    }
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-sm max-w-md w-full">
        <h2 className="text-2xl font-serif mb-6" style={{ color: '#3E0309' }}>Admin Login</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
=======
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
>>>>>>> 9f90e478c2b211e0bfeca9cae52073ffdd57d972
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
<<<<<<< HEAD
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
=======
              placeholder="Enter your email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-200 transition-colors"
              style={{ borderColor: '#3E0309' }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
>>>>>>> 9f90e478c2b211e0bfeca9cae52073ffdd57d972
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
<<<<<<< HEAD
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white py-3 rounded-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#3E0309' }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
=======
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
>>>>>>> 9f90e478c2b211e0bfeca9cae52073ffdd57d972
