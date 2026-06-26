import '../style/loading.css';
import { useState, useEffect } from 'react';
import { fetchStatus } from '../util/energlyApi';
import { Button } from './button';

type ServerStatus = 'loading' | 'ok' | 'error';

export function Loader() {
    const [serverStatus, setServerStatus] = useState<ServerStatus>('loading');

    useEffect(() => {
        if (serverStatus !== 'loading') return;

        const timeout = setTimeout(() => setServerStatus('error'), 10000);

        fetchStatus()
            .then(() => setServerStatus('ok'))
            .catch(() => setServerStatus('error'))
            .finally(() => clearTimeout(timeout));

        return () => clearTimeout(timeout);
    }, [serverStatus]);

    if (serverStatus === 'loading') {
        return (
            <div className='status-screen'>
                <div className='spinner' />
                <p>Connecting to server...</p>
            </div>
        );
    }

    if (serverStatus === 'error') {
        return (
            <div className='status-screen'>
                <div className='container card'>
                    <h2>Server Unavailable</h2>
                    <p>Could not connect to the backend. Please try again later.</p>
                    <Button label='Retry' onClick={() => setServerStatus('loading')} />
                </div>
            </div>
        );
    }

    return <></>
};