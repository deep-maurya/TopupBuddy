// src/routers/All_Router.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ForgetPasswordPage } from '../Pages/ForgetPasswordPage';
import { HomePage } from '../Pages/HomePage';
import { LoginPage } from '../Pages/LoginPage';
import { PageNotFoundPage } from '../Pages/PageNotFoundPage';
import { RegisterPage } from '../Pages/RegisterPage';
import { ProfilePage } from '../Pages/ProfilePage';
import { Dashboard } from '../Pages/Dashboard';
import { WalletPage } from '../Pages/WalletPage';

export const All_Router = () => {
  return (

    <Routes>
      {/* Protected Route */}
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/wallet" element={<WalletPage/>} />
      <Route path='/profile' element={<ProfilePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/' element={<HomePage />} />
      <Route path='/forget_password' element={<ForgetPasswordPage />} />
      <Route path='/forget_password/:token' element={<ForgetPasswordPage />} />
      
      <Route path='/*' element={<PageNotFoundPage />} />
    </Routes>
   
  );
};
