import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Home/Home.tsx';
import LoginPage from '../Login/LoginPage.tsx';
import SignUpPage from '../SignUp/SignUpPage.tsx';
import AboutUs from '../AboutUs/AboutUs.tsx';
import ResultsPage from '../Results/ResultsPage';
import NavBar from '../../components/NavBar/NavBar.tsx';
import AuthProvider from '../../context/AuthProvider';
import AuthGuard from '../../utils/AuthGuard.tsx';
import ImageUploader from '../../components/ImageUploader/ImageUploader.tsx';
import { DetectionProvider } from '../../context/DetectionProvider.tsx';

function App(): JSX.Element {
    return (
        <Router>
            <AuthProvider>
                <DetectionProvider>
                    <NavBar />
                    <Routes>
                        {/* Wrap protected routes with AuthGuard */}
                        <Route element={<AuthGuard />}>
                            <Route path='/' element={<Home />} />
                            {/* Protected route */}
                            <Route
                                path='/upload'
                                element={
                                    <ImageUploader
                                        onClose={function (): void {
                                            throw new Error('Function not implemented.');
                                        }}
                                        setFileNames={function (): void {
                                            throw new Error('Function not implemented.');
                                        }}
                                    />
                                }
                            />
                            <Route path='/results' element={<ResultsPage />} />
                        </Route>
                        {/* Public routes */}
                        <Route path='/about' element={<AboutUs />} />
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/signUp' element={<SignUpPage />} />
                    </Routes>
                </DetectionProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
