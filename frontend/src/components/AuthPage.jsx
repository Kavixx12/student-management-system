import React, { useState } from 'react';
import './AuthPage.css';
// 🔥 IMPORT: Services to communicate with Backend
import { loginAPICall, registerAPICall, storeToken } from '../services/AuthService';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // 🔥 UPDATED: Handle Form Submission (Connects to Backend)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // ==========================
      //      LOGIN LOGIC
      // ==========================
      try {
        // 1. Call the Login API
        const response = await loginAPICall(formData.email, formData.password);
        
        // 2. Extract Token (Prefix with 'Bearer ')
        const token = 'Bearer ' + response.data;
        
        // 3. Store Token in LocalStorage
        storeToken(token);

        alert("Login Successful! 🔥");
        console.log("Token received:", token);

        // TODO: Redirect to Dashboard here
        // window.location.href = "/dashboard"; 

      } catch (error) {
        console.error(error);
        alert("Login Failed! Please check your credentials.");
      }

    } else {
      // ==========================
      //     REGISTER LOGIC
      // ==========================
      try {
        // 1. Combine First Name + Last Name
        const fullName = formData.firstName + " " + formData.lastName;
        
        // 2. Prepare Data Object for Backend
        // Note: Since we don't have a 'username' field in UI, we generate one or use email.
        // Here, I am generating a username using firstName + random number for testing.
        const registerObj = {
            name: fullName,
            username: formData.firstName.toLowerCase() + Math.floor(Math.random() * 1000), 
            email: formData.email,
            password: formData.password
        };

        // 3. Call the Register API
        await registerAPICall(registerObj);
        
        alert("Registration Successful! Please Login.");
        
        // 4. Switch to Login View
        setIsLogin(true);

      } catch (error) {
        console.error(error);
        alert("Registration Failed! Username or Email might already exist.");
      }
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      rememberMe: false
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className="auth-container">
      
      <div className="auth-form-section">


        <div className="form-wrapper">
          
          <div className="auth-header">
            <h2 className="system-title">
                {isLogin ? 'Login' : 'Register'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            
            {!isLogin && (
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" name="firstName" className="form-control modern-input" placeholder="Enter first name" value={formData.firstName} onChange={handleInputChange} required={!isLogin} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" name="lastName" className="form-control modern-input" placeholder="Enter last name" value={formData.lastName} onChange={handleInputChange} required={!isLogin} />
                  </div>
                </div>
              </div>
            )}

            <div className="form-group mb-3">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" className="form-control modern-input" placeholder="Enter your email" value={formData.email} onChange={handleInputChange} required />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input type={showPassword ? 'text' : 'password'} id="password" name="password" className="form-control modern-input" placeholder="Enter your password" value={formData.password} onChange={handleInputChange} required />
                <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  )}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="form-group mb-3">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="password-input-wrapper">
                  <input type={showConfirmPassword ? 'text' : 'password'} id="confirmPassword" name="confirmPassword" className="form-control modern-input" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleInputChange} required={!isLogin} />
                  <button type="button" className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)} aria-label="Toggle confirm password visibility">
                    {showConfirmPassword ? (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>) : (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>)}
                  </button>
                </div>
              </div>
            )}

            {isLogin && (
              <div className="form-options mb-4">
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="rememberMe" name="rememberMe" checked={formData.rememberMe} onChange={handleInputChange} />
                  <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                </div>
                <a href="#" className="forgot-password">Forgot password?</a>
              </div>
            )}

            <button type="submit" className="btn btn-primary auth-submit-btn w-100 mb-3">
              {isLogin ? 'LOGIN' : 'REGISTER'}
            </button>

            <div className="auth-toggle text-center">
              <p className="mb-0">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button type="button" className="btn-link" onClick={toggleAuthMode}>
                  {isLogin ? 'Register here' : 'Login here'}
                </button>
              </p>
            </div>
          </form>
        </div>
        

        <div className="brand-container">
            <div className="brand-icon">
                <img 
                    src="/logo.png" 
                    alt="School Logo" 
                    style={{ width: '350px', height: 'auto' }} 
                />
            </div>
        </div>

      </div>
      
    </div>
  );
};

export default AuthPage;