import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home.tsx';
import LoginPage from '../Login/LoginPage.tsx';
import SignUpPage from '../SignUp/SignUpPage.tsx';
import NavBar from '../../components/NavBar/NavBar.tsx';
import AuthProvider from '../../context/AuthProvider.tsx';
import AuthGuard from '../../utils/AuthGuard.tsx';

function App(): JSX.Element {
    return (
        <AuthProvider>
            <NavBar />
            <Routes>
                <Route element={<AuthGuard />}>
                    <Route path='/' element={<Home />} />
                </Route>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signUp' element={<SignUpPage />} />
            </Routes>
        </AuthProvider>
    );
}

export default App;
