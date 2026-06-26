import '@testing-library/jest-dom';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { fetchStatus, fetchEnergyMix, fetchOptimalWindow } from '../util/energlyApi';

const mockFetch = (ok: boolean, body: unknown, status = 200) => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok,
        status,
        text: async () => JSON.stringify(body),
    }));
};

describe('energlyApi', () => {
    afterEach(() => vi.unstubAllGlobals());

    describe('fetchStatus', () => {
        it('resolves with parsed data on ok response', async () => {
            mockFetch(true, { status: 'ok' });
            await expect(fetchStatus()).resolves.toEqual({ status: 'ok' });
        });

        it('throws with status code on non-ok response', async () => {
            mockFetch(false, {}, 503);
            await expect(fetchStatus()).rejects.toThrow('Request failed: 503');
        });
    });

    describe('fetchEnergyMix', () => {
        const mockData = [
            { date: '2024-01-15', generationmix: [], cleanEnergyPercent: 60 },
            { date: '2024-01-16', generationmix: [], cleanEnergyPercent: 70 },
        ];

        it('resolves with parsed energy mix data', async () => {
            mockFetch(true, mockData);
            await expect(fetchEnergyMix()).resolves.toEqual(mockData);
        });

        it('throws on non-ok response', async () => {
            mockFetch(false, {}, 500);
            await expect(fetchEnergyMix()).rejects.toThrow('Request failed: 500');
        });
    });

    describe('fetchOptimalWindow', () => {
        const mockResult = { from: '2024-01-15T08:00:00Z', to: '2024-01-15T11:00:00Z', cleanEnergyPercent: 74 };

        it('resolves with parsed window data', async () => {
            mockFetch(true, mockResult);
            await expect(fetchOptimalWindow(3)).resolves.toEqual(mockResult);
        });

        it('passes hours as query parameter', async () => {
            mockFetch(true, mockResult);
            await fetchOptimalWindow(3);
            const calledUrl = (fetch as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
            expect(calledUrl).toContain('hours=3');
        });

        it('throws on non-ok response', async () => {
            mockFetch(false, {}, 404);
            await expect(fetchOptimalWindow(2)).rejects.toThrow('Request failed: 404');
        });
    });
});
