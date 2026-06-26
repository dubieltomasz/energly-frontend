import './button.css';
import React from 'react';

type Props = {
    label: string;
    onClick: () => void;
};

export const Button: React.FC<Props> = ({ label, onClick }) => {
    return (
        <button className='btn btn-primary' onClick={onClick}>
            {label}
        </button>
    );
};