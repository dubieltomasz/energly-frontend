import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../components/button';

describe('Button', () => {
    it('renders with the given label', () => {
        render(<Button label='Click me' onClick={() => {}} />);
        expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
    });

    it('calls onClick when clicked', () => {
        const onClick = vi.fn();
        render(<Button label='Click me' onClick={onClick} />);
        fireEvent.click(screen.getByRole('button'));
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('has btn-primary class', () => {
        render(<Button label='Test' onClick={() => {}} />);
        expect(screen.getByRole('button')).toHaveClass('btn-primary');
    });
});
