import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Loader } from '../components/loading';
import * as api from '../util/energlyApi';

vi.mock('../util/energlyApi', () => ({
    fetchStatus: vi.fn(),
}));

describe('Loader', () => {
    beforeEach(() => vi.clearAllMocks());

    it('shows spinner while connecting', () => {
        vi.mocked(api.fetchStatus).mockImplementation(() => new Promise(() => {}));
        render(<Loader />);
        expect(screen.getByText(/connecting to server/i)).toBeInTheDocument();
        expect(document.querySelector('.spinner')).toBeInTheDocument();
    });

    it('renders nothing on successful connection', async () => {
        vi.mocked(api.fetchStatus).mockResolvedValue({ status: 'ok' });
        const { container } = render(<Loader />);
        await waitFor(() => expect(container).toBeEmptyDOMElement());
    });

    it('shows error screen when server is unavailable', async () => {
        vi.mocked(api.fetchStatus).mockRejectedValue(new Error('Network error'));
        render(<Loader />);
        await waitFor(() => {
            expect(screen.getByText(/server unavailable/i)).toBeInTheDocument();
        });
    });

    it('retries when retry button is clicked', async () => {
        vi.mocked(api.fetchStatus)
            .mockRejectedValueOnce(new Error('fail'))
            .mockResolvedValueOnce({ status: 'ok' });

        render(<Loader />);
        await waitFor(() => expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument());

        await userEvent.click(screen.getByRole('button', { name: /retry/i }));
        await waitFor(() => expect(api.fetchStatus).toHaveBeenCalledTimes(2));
    });

    it('shows error after 10 second timeout', async () => {
        vi.useFakeTimers();
        vi.mocked(api.fetchStatus).mockImplementation(() => new Promise(() => {}));

        render(<Loader />);

        await act(async () => {
            vi.advanceTimersByTime(10000);
        });

        expect(screen.getByText(/server unavailable/i)).toBeInTheDocument();

        vi.useRealTimers();
    });
});
