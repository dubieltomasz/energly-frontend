import './chart.css';
import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Tooltip } from 'recharts';
import type { CleanEnergySource } from '../types';

type DataItem = {
    name: string;
    value: number;
};

type Props = {
    title: string;
    date?: string;
    cleanPercent: number;
    data: DataItem[];
};

const colors = ['#9ca3af', '#10b981'];
const cleanEnergySources = ['biomass', 'nuclear', 'hydro', 'wind', 'solar'] as const;

export const EnergyDayCard: React.FC<Props> = ({ title, date, cleanPercent, data }) => {
    return (
        <div className='card energy-card'>
            <div className='energy-card-header'>
                <h3 className='energy-card-title'>{title}</h3>
                {date && <small className='energy-card-date'>{date}</small>}
            </div>
            <div className='energy-card-chart'>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data.map((entry) => ({
                                ...entry,
                                fill: colors[Number(cleanEnergySources.includes(entry.name as CleanEnergySource))],
                            }))}
                            dataKey='value'
                            nameKey='name'
                            outerRadius={80}
                            innerRadius={50}
                            paddingAngle={3}
                        />
                        <Tooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className={'energy-card-badge'}>
                {cleanPercent}% Clean Energy
            </div>
        </div>
    );
};