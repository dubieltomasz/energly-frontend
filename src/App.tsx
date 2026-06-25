import { useState } from 'react';
import './App.css'
import { fetchStatus, fetchEnergyMix, fetchOptimalWindow } from './api/energlyApi';

function App() {
    const [hours, setHours] = useState('1');

    function checkStatus() {
        fetchStatus()
            .then((e) => console.log(e))
            .catch((e) => console.error(e))
    };

    function getEnergyMix() {
        fetchEnergyMix()
            .then((e) => console.log(e))
            .catch((e) => console.error(e))
    };

    function checkOptimalWindow() {
        const value: number = Number(hours);

        if(value < 1 || 6 < value) {
            console.error("Invalid user input: ", hours);
            return;
        }

        fetchOptimalWindow(value)
            .then((e) => console.log(e))
            .catch((e) => console.error(e))
    };

    return (
        <>
            <button onClick={checkStatus}>aaa</button>
            <button onClick={getEnergyMix}>aaa</button>
            <button onClick={checkOptimalWindow}>aaa</button>
            <input type='number' min={1} max={6} step={1} value={hours} onChange={event => setHours(event.target.value)}/>
        </>
    )
}

export default App
