import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NumberInput } from '../components/numberInput';

describe('NumberInput', () => {
    it('renders with the given value', () => {
        render(<NumberInput value={3} onChange={() => {}} />);
        expect(screen.getByRole('spinbutton')).toHaveValue(3);
    });

    it('calls onChange with the new value', () => {
        const onChange = vi.fn();
        render(<NumberInput value={1} onChange={onChange} />);
        fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '4' } });
        expect(onChange).toHaveBeenCalledWith(4);
    });

    it('clamps value to 1 when below minimum', () => {
        const onChange = vi.fn();
        render(<NumberInput value={1} onChange={onChange} />);
        fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '0' } });
        expect(onChange).toHaveBeenCalledWith(1);
    });

    it('clamps value to 6 when above maximum', () => {
        const onChange = vi.fn();
        render(<NumberInput value={1} onChange={onChange} />);
        fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '9' } });
        expect(onChange).toHaveBeenCalledWith(6);
    });

    it('has min=1 and max=6 attributes', () => {
        render(<NumberInput value={1} onChange={() => {}} />);
        const input = screen.getByRole('spinbutton');
        expect(input).toHaveAttribute('min', '1');
        expect(input).toHaveAttribute('max', '6');
    });
});
