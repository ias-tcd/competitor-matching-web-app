import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage.tsx';
import RegisterUser from './RegisterUser.tsx';
{
    /*import App from './App.tsx';*/
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route index element={<RegisterUser />} />
                <Route path='/Login' element={<LoginPage />} />
                <Route path='/Register' element={<RegisterUser />} />
            </Routes>
        </Router>
    </React.StrictMode>,
);
