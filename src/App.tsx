import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home.tsx';
import LoginPage from './pages/LoginPage.tsx';

function App(): JSX.Element {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<LoginPage />} />
            </Routes>
        </Router>
    );
}

export default App;
