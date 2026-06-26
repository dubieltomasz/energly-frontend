import './numberInput.css';
import React from 'react';

type Props = {
    value: number;
    onChange: (value: number) => void;
};

export const NumberInput: React.FC<Props> = ({ value, onChange }) => {
    return (
        <input
            className='input'
            type='number'
            min={1}
            max={6}
            value={value}
            onChange={(e) => {
                let val = Number(e.target.value);
                if (val < 1) val = 1;
                if (val > 6) val = 6;
                onChange(val);
            }}
        />
    );
};