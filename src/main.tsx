import React from 'react';
import ReactDOM from 'react-dom/client';
{
    /*import App from './App.tsx';*/
}
import BoundBox from './BoundBox.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BoundBox />
        {/*<App />*/}
    </React.StrictMode>,
);
