import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EnergyDayCard } from '../components/chart';

vi.mock('recharts', () => ({
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    PieChart: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Pie: () => <div data-testid='pie' />,
    Tooltip: () => null,
}));

const mockData = [
    { name: 'wind', value: 40 },
    { name: 'coal', value: 35 },
    { name: 'solar', value: 25 },
];

describe('EnergyDayCard', () => {
    it('renders the title', () => {
        render(<EnergyDayCard title='Today' cleanPercent={60} data={mockData} />);
        expect(screen.getByText('Today')).toBeInTheDocument();
    });

    it('renders the date when provided', () => {
        render(<EnergyDayCard title='Today' date='2024-01-15' cleanPercent={60} data={mockData} />);
        expect(screen.getByText('2024-01-15')).toBeInTheDocument();
    });

    it('does not render date element when not provided', () => {
        render(<EnergyDayCard title='Today' cleanPercent={60} data={mockData} />);
        expect(screen.queryByText(/2024/)).not.toBeInTheDocument();
    });

    it('displays the clean energy percentage', () => {
        render(<EnergyDayCard title='Today' cleanPercent={74} data={mockData} />);
        expect(screen.getByText('74% Clean Energy')).toBeInTheDocument();
    });

    it('renders the pie chart', () => {
        render(<EnergyDayCard title='Today' cleanPercent={60} data={mockData} />);
        expect(screen.getByTestId('pie')).toBeInTheDocument();
    });
});
