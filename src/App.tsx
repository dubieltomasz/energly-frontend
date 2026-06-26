import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GenerationMixData } from './components/home';
import { Navigation } from './components/navigation';
import { Loader } from './components/loading';

const navItems = [
    { label: 'Generation Mix', path: '/' },
    { label: 'Calculate Optimal Window', path: '/optimal-window' },
];

function App() {
    return (
        <BrowserRouter>
            <Loader />
            <Navigation items={navItems} />
            <Routes>
                <Route path='/' element={<GenerationMixData />} />
                <Route path='/optimal-window' element={<GenerationMixData />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
