import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { OptimalWindow } from '../components/optimalWindow';
import * as api from '../util/energlyApi';

vi.mock('../util/energlyApi', () => ({
    fetchOptimalWindow: vi.fn(),
}));

const mockResult = {
    from: '2024-01-15T08:00:00Z',
    to: '2024-01-15T11:00:00Z',
    cleanEnergyPercent: 74,
};

describe('OptimalWindow', () => {
    beforeEach(() => vi.clearAllMocks());

    it('renders input and calculate button', () => {
        render(<OptimalWindow />);
        expect(screen.getByRole('spinbutton')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /calculate/i })).toBeInTheDocument();
    });

    it('shows result after successful fetch', async () => {
        vi.mocked(api.fetchOptimalWindow).mockResolvedValue(mockResult);
        render(<OptimalWindow />);

        fireEvent.click(screen.getByRole('button', { name: /calculate/i }));

        await waitFor(() => {
            expect(screen.getByText('2024-01-15 08:00:00')).toBeInTheDocument();
            expect(screen.getByText('2024-01-15 11:00:00')).toBeInTheDocument();
            expect(screen.getByText('74%')).toBeInTheDocument();
        });
    });

    it('shows error message on failed fetch', async () => {
        vi.mocked(api.fetchOptimalWindow).mockRejectedValue(new Error('Network error'));
        render(<OptimalWindow />);

        fireEvent.click(screen.getByRole('button', { name: /calculate/i }));

        await waitFor(() => {
            expect(screen.getByText(/failed to fetch optimal window/i)).toBeInTheDocument();
        });
    });

    it('shows calculating label while loading', async () => {
        vi.mocked(api.fetchOptimalWindow).mockImplementation(
            () => new Promise((resolve) => setTimeout(() => resolve(mockResult), 100))
        );
        render(<OptimalWindow />);

        fireEvent.click(screen.getByRole('button', { name: /calculate/i }));
        expect(screen.getByRole('button', { name: /calculating/i })).toBeInTheDocument();
    });

    it('calls fetchOptimalWindow with the selected hours', async () => {
        vi.mocked(api.fetchOptimalWindow).mockResolvedValue(mockResult);
        render(<OptimalWindow />);

        fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '3' } });
        fireEvent.click(screen.getByRole('button', { name: /calculate/i }));

        await waitFor(() => {
            expect(api.fetchOptimalWindow).toHaveBeenCalledWith(3);
        });
    });

    it('clears previous error on new successful fetch', async () => {
        vi.mocked(api.fetchOptimalWindow)
            .mockRejectedValueOnce(new Error('fail'))
            .mockResolvedValueOnce(mockResult);

        render(<OptimalWindow />);
        fireEvent.click(screen.getByRole('button', { name: /calculate/i }));
        await waitFor(() => expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument());

        fireEvent.click(screen.getByRole('button', { name: /calculate/i }));
        await waitFor(() => expect(screen.queryByText(/failed to fetch/i)).not.toBeInTheDocument());
    });
});
