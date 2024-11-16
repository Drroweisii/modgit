import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GameStatement } from '../../components/game/GameStatement';

describe('GameStatement', () => {
  const mockGameState = {
    balances: {
      emsx: 100,
      usdt: 50,
      btc: 1
    },
    miningRates: {
      emsx: 0.1,
      usdt: 0.05,
      btc: 0.001
    },
    workers: [],
    gridState: [],
    unlockedSlots: 5
  };

  it('renders currency balances', () => {
    render(<GameStatement gameState={mockGameState} />);
    expect(screen.getByText('EMSX')).toBeInTheDocument();
    expect(screen.getByText('USDT')).toBeInTheDocument();
    expect(screen.getByText('BTC')).toBeInTheDocument();
  });

  it('shows mining rates', () => {
    render(<GameStatement gameState={mockGameState} />);
    expect(screen.getByText('+0.1/s')).toBeInTheDocument();
    expect(screen.getByText('+0.05/s')).toBeInTheDocument();
    expect(screen.getByText('+0.001/s')).toBeInTheDocument();
  });
});