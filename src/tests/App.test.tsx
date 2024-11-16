import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders loading screen initially', () => {
    render(<App />);
    expect(screen.getByText(/Loading Web3 Experience/i)).toBeInTheDocument();
  });

  it('renders main app after loading', async () => {
    render(<App />);
    const navbar = await screen.findByText(/Web3 Arena/i, {}, { timeout: 2000 });
    expect(navbar).toBeInTheDocument();
  });
});