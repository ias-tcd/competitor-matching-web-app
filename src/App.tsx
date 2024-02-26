import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home.tsx';
import LoginPage from './LoginPage.tsx';
import RegisterUser from './RegisterUser.tsx';

function App(): JSX.Element {
    return (
        <Router>
            <Routes>
                <Route index element={<Home />} />
                <Route path='/' element={<Home />} />
                <Route path='/Login' element={<LoginPage />} />
                <Route path='/Register' element={<RegisterUser />} />
            </Routes>
        </Router>
    );
}

export default App;
