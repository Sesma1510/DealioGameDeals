import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Navigate } from 'react-router-dom';
import { AuthService } from '../../services/authService';

const SignUpForm = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await AuthService.register(formData.username, formData.email, formData.password);
      console.log('User registered successfully');
      setIsRegistered(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          const { status, data } = axiosError.response;
          if (status === 400) {
            setError((data as { error?: string })?.error || 'Registration failed. Please check your input.');
          } else if (status === 401) {
            setError('Unauthorized. Please log in first.');
          } else {
            setError('Registration failed. Please try again later.');
          }
        } else {
          setError('Network error. Please check your internet connection.');
        }
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   if (isRegistered) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-96 p-8 bg-white rounded-lg shadow-lg">
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="w-full mb-4 p-2 border border-gray-300 rounded" />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full mb-4 p-2 border border-gray-300 rounded" />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full mb-4 p-2 border border-gray-300 rounded" />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Register</button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </div>
  );
};

export { SignUpForm };
