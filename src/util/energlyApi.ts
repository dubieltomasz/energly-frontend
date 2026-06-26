const url: String = import.meta.env.VITE_API_URL;
const status: String = import.meta.env.VITE_API_STATUS;
const generationMix: String = import.meta.env.VITE_API_GENERATION_MIX;
const optimalWindow: String = import.meta.env.VITE_API_OPTIMAL_WINDOW;

const headers: HeadersInit = {
    'Accept':'application/json'
};

export async function fetchStatus() {
    const response = await fetch(`${url}/${status}`, { method: 'GET', headers: headers })
    
    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }
    
    const data = await response.text();

    return JSON.parse(data);
}

export async function fetchEnergyMix() {
    const response = await  fetch(`${url}/${generationMix}`, { method: 'GET', headers: headers })
      
    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }
    
    const data = await response.text();

    return JSON.parse(data);
}

export async function fetchOptimalWindow(hours: number) {
    const response = await  fetch(`${url}/${optimalWindow}?hours=${hours}`, { method: 'GET', headers: headers })
    
    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }
    
    const data = await response.text();

    return JSON.parse(data);
}