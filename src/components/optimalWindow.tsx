import '../style/optimalWindow.css';
import { useState } from 'react';
import { NumberInput } from './numberInput';
import { Button } from './button';
import { fetchOptimalWindow } from '../util/energlyApi';

type Result = {
    from: string;
    to: string;
    cleanEnergyPercent: number;
};

const formatDateTime = (iso: string) => {
    const [date, time] = iso.split('T');
    return `${date} ${time.split('Z')[0]}`;
};

export const OptimalWindow: React.FC = () => {
    const [hours, setHours] = useState<number>(1);
    const [result, setResult] = useState<Result | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCalculate = async () => {
        setLoading(true);
        setError(null);
        try {
            setResult(await fetchOptimalWindow(hours));
        } catch {
            setError('Failed to fetch optimal window. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container'>
            <div className='optimal-window'>
                <div className='card mb-2'>
                    <h2 className='result-title'>Find Optimal Charging Window</h2>
                    <div className='controls mt-2'>
                        <NumberInput value={hours} onChange={setHours} />
                        <Button label={loading ? 'Calculating...' : 'Calculate'} onClick={handleCalculate} />
                    </div>
                </div>

                {error && (
                    <div className='card mb-2'>
                        <p className='error'>{error}</p>
                    </div>
                )}

                {result && (
                    <div className='card result'>
                        <h2 className='result-title'>Optimal Charging Window</h2>

                        <div className='times'>
                            <div className='time-row'>
                                <span className='time-label'>Start</span>
                                <span className='time-value'>{formatDateTime(result.from)}</span>
                            </div>
                            <div className='time-row'>
                                <span className='time-label'>End</span>
                                <span className='time-value'>{formatDateTime(result.to)}</span>
                            </div>
                        </div>

                        <div className='clean'>
                            <span className='clean-label'>Average clean energy</span>
                            <span className='clean-percent'>{result.cleanEnergyPercent}%</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};