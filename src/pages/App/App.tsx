import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home.tsx';
import LoginPage from '../Login/LoginPage.tsx';
import SignUpPage from '../SignUp/SignUpPage.tsx';
import AboutUs from '../AboutUs/AboutUs.tsx';
import AuthProvider from '../../context/AuthProvider.tsx';
import AuthGuard from '../../utils/AuthGuard.tsx';
import NavBar from '../../components/NavBar/NavBar.tsx';
import ResultsPage from '../Results/ResultsPage.tsx';
import { DetectionProvider } from '../../context/DetectionProvider.tsx';

function App(): JSX.Element {
    return (
        <AuthProvider>
            <NavBar />
            <DetectionProvider>
                <Routes>
                    <Route element={<AuthGuard />}>
                        <Route path='/' element={<Home />} />
                    </Route>
                    <Route path='/results' element={<ResultsPage />} />
                    <Route path='/about' element={<AboutUs />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/signUp' element={<SignUpPage />} />
                </Routes>
            </DetectionProvider>
        </AuthProvider>
    );
}

export default App;
