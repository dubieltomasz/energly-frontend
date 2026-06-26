export type GenerationMixItem = {
    fuel: string;
    perc: number;
};

export type EnergyDayResponse = {
    date: string;
    generationmix: GenerationMixItem[];
    cleanEnergyPercent: number;
};

export type EnergyApiResponse = EnergyDayResponse[];

export type FuelType =
    | 'biomass'
    | 'coal'
    | 'imports'
    | 'gas'
    | 'nuclear'
    | 'other'
    | 'hydro'
    | 'solar'
    | 'wind';

export type CleanEnergySource =
    | 'biomass'
    | 'nuclear'
    | 'hydro'
    | 'wind'
    | 'solar'

export type EnergyChartData = {
    name: FuelType;
    value: number;
};

export type EnergyDay = {
    date: Date;
    cleanEnergyPercent: number;
    chartData: EnergyChartData[];
};