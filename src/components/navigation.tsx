import './navigation.css';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

type Props = {
    items: { label: string; path: string }[];
};

export const Navigation: React.FC<Props> = ({ items }) => {
    const location = useLocation();

    return (
        <nav className='navbar'>
            {items.map((item) => {
                const isActive = location.pathname === item.path;

                return (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={isActive ? 'active' : ''}
                    >
                        {item.label}
                    </Link>
                );
            })}
        </nav>
    );
};