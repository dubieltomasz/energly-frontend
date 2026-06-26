import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Navigation } from '../components/navigation';

const items = [
    { label: 'Generation Mix', path: '/' },
    { label: 'Optimal Window', path: '/optimal-window' },
];

const renderNav = (initialPath = '/') =>
    render(
        <MemoryRouter initialEntries={[initialPath]}>
            <Navigation items={items} />
        </MemoryRouter>
    );

describe('Navigation', () => {
    it('renders all nav items', () => {
        renderNav();
        expect(screen.getByText('Generation Mix')).toBeInTheDocument();
        expect(screen.getByText('Optimal Window')).toBeInTheDocument();
    });

    it('marks the current path as active', () => {
        renderNav('/');
        expect(screen.getByText('Generation Mix').closest('a')).toHaveClass('active');
    });

    it('does not mark inactive links as active', () => {
        renderNav('/');
        expect(screen.getByText('Optimal Window').closest('a')).not.toHaveClass('active');
    });

    it('renders correct hrefs', () => {
        renderNav();
        expect(screen.getByText('Generation Mix').closest('a')).toHaveAttribute('href', '/');
        expect(screen.getByText('Optimal Window').closest('a')).toHaveAttribute('href', '/optimal-window');
    });
});
