import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingScreen } from '../../components/LoadingScreen';

describe('LoadingScreen', () => {
  it('renders loading message', () => {
    render(<LoadingScreen />);
    expect(screen.getByText(/Loading Web3 Experience/i)).toBeInTheDocument();
  });

  it('renders loading spinner', () => {
    render(<LoadingScreen />);
    const spinner = screen.getByRole('img', { hidden: true });
    expect(spinner).toHaveClass('animate-spin');
  });
});