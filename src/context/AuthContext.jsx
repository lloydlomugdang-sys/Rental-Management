import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// 1. I-setup ang Context
const AuthContext = createContext();

// 2. Gumawa ng Custom Hook para madaling tawagin sa ibang components
export const useAuth = () => {
  return useContext(AuthContext);
};

// 3. Provider Component na babalot sa buong React App
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // CHECK SESSION: Tumatakbo ito tuwing magre-refresh ang page
  useEffect(() => {
    const checkLoggedInUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Tatawagin ang /me endpoint para i-verify ang token sa backend
          const res = await axios.get('http://localhost:8000/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(res.data.user); // I-restore ang user data
        } catch (error) {
          console.error("Session expired or invalid token:", error);
          localStorage.removeItem('token'); // Burahin kung expired na
          setUser(null);
        }
      }
      setLoading(false); // Payagan nang mag-load ang screen
    };

    checkLoggedInUser();
  }, []);

  // LOGIN FUNCTION
  const login = async (email, password) => {
    const res = await axios.post('http://localhost:8000/api/auth/login', { 
      email, 
      password 
    });
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
    return res.data.user;
  };

  // REGISTER FUNCTION
  const registerUser = async (name, email, contactNumber, password) => { 
    const res = await axios.post('http://localhost:8000/api/auth/register', { 
      name, 
      email, 
      contactNumber, // Siguraduhing kasama ito!
      password 
    });
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
    return res.data.user;
  };

  // LOGOUT FUNCTION
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Pagsamahin lahat ng functions at variables na ipapasa sa components
  const value = {
    user,
    loading,
    login,
    registerUser,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Huwag i-render ang UI hangga't hindi tapos mag-check ng token */}
      {!loading && children}
    </AuthContext.Provider>
  );
};