import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Home/Home.tsx';
import LoginPage from '../Login/LoginPage.tsx';
import SignUpPage from '../SignUp/SignUpPage.tsx';
import NavBar from '../../components/NavBar/NavBar.tsx';
import AuthProvider from '../../context/AuthProvider.tsx';

function App(): JSX.Element {
    return (
        <AuthProvider>
            <NavBar />
            <Router>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/signUp' element={<SignUpPage />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
