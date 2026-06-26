import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GenerationMix } from './components/generationMix';
import { OptimalWindow } from './components/optimalWindow';
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
                <Route path='/' element={<GenerationMix />} />
                <Route path='/optimal-window' element={<OptimalWindow />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
