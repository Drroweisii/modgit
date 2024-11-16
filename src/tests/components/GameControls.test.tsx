import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GameControls } from '../../components/game/GameControls';

describe('GameControls', () => {
  const mockGameState = {
    balances: {
      emsx: 100,
      usdt: 0,
      btc: 0
    },
    workers: [],
    miningRates: {
      emsx: 0,
      usdt: 0,
      btc: 0
    },
    gridState: [],
    unlockedSlots: 5
  };

  const defaultProps = {
    gameState: mockGameState,
    onHire: vi.fn(),
    canHireWorker: vi.fn(() => true)
  };

  it('renders worker type buttons', () => {
    render(<GameControls {...defaultProps} />);
    expect(screen.getByText('EMSX')).toBeInTheDocument();
    expect(screen.getByText('USDT')).toBeInTheDocument();
    expect(screen.getByText('BTC')).toBeInTheDocument();
  });

  it('handles worker hiring', () => {
    render(<GameControls {...defaultProps} />);
    const hireButton = screen.getByText(/HIRE EMSX MINER/i);
    fireEvent.click(hireButton);
    expect(defaultProps.onHire).toHaveBeenCalled();
  });

  it('disables hire button when cannot afford', () => {
    render(<GameControls {...defaultProps} canHireWorker={() => false} />);
    const hireButton = screen.getByText(/HIRE EMSX MINER/i);
    expect(hireButton).toBeDisabled();
  });
});