import React, { useEffect, useState } from 'react';
import { EnergyDayCard } from './chart';
import {fetchEnergyMix} from '../util/energlyApi';
import type { EnergyDayResponse } from '../util/types';

export const GenerationMixData: React.FC = () => {
    const [firstDay, setFirstDay] = useState<EnergyDayResponse | null>(null);
    const [secondDay, setSecondDay] = useState<EnergyDayResponse | null>(null);
    const [thirdDay, setThirdDay] = useState<EnergyDayResponse | null>(null);

    useEffect(() => {
        fetchEnergyMix()
            .then((data: EnergyDayResponse[]) => {
                const sorted = [...data].sort(
                    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
                );

                setFirstDay(sorted[0] ?? null);
                setSecondDay(sorted[1] ?? null);
                setThirdDay(sorted[2] ?? null);
            });
    }, []);

    return (
        <div className='container'>
            <div className='card mb-2'>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                        gap: '1rem',
                    }}
                >
                    {firstDay ?
                        <EnergyDayCard
                            title={'Today'}
                            date={firstDay.date}
                            cleanPercent={firstDay.cleanEnergyPercent}
                            data={ firstDay.generationmix.map(x => ({
                                name: x.fuel,
                                value: x.perc,
                            }))}
                        />
                        : <EnergyDayCard title={'Today: data unavailable'} date={new Date().toISOString()} cleanPercent={0} data={[]}/>
                    }

                    {secondDay ?
                        <EnergyDayCard
                            title={'Tomorrow'}
                            date={secondDay.date}
                            cleanPercent={secondDay.cleanEnergyPercent}
                            data={ secondDay.generationmix.map(x => ({
                                name: x.fuel,
                                value: x.perc,
                            }))}
                        />
                        : <EnergyDayCard title={'Tomorrow: data unavailable'} date={new Date().toISOString()} cleanPercent={0} data={[]}/>
                    }

                    {thirdDay ?
                        <EnergyDayCard
                            title={'The day after tomorrow'}
                            date={thirdDay.date}
                            cleanPercent={thirdDay.cleanEnergyPercent}
                            data={ thirdDay.generationmix.map(x => ({
                                name: x.fuel,
                                value: x.perc,
                            }))}
                        />
                        : <EnergyDayCard title={'The day after tomorrow: data unavailable'} date={new Date().toISOString()} cleanPercent={0} data={[]}/>
                    }
                </div>
            </div>
        </div>
    );
};