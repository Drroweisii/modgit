import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GameBoard } from '../../components/game/GameBoard';
import { GRID_SIZE } from '../../utils/constants';

describe('GameBoard', () => {
  const mockGridState = Array.from(
    { length: GRID_SIZE.TOTAL_CELLS },
    (_, i) => ({
      position: i,
      workerId: null,
      isOccupied: false,
      isLocked: i >= GRID_SIZE.INITIAL_SLOTS
    })
  );

  const mockWorkers = [
    {
      id: 'worker1',
      type: 'emsx',
      level: 1,
      position: 0,
      miningRate: 0.1,
      stats: {
        baseRate: 1,
        speedMultiplier: 1,
        powerMultiplier: 1,
        comboBonus: 0,
        luckChance: 0.01
      }
    }
  ];

  const defaultProps = {
    gridState: mockGridState,
    workers: mockWorkers,
    onCellClick: vi.fn(),
    onRemoveWorker: vi.fn(),
    onUnlockSlot: vi.fn(),
    balance: 100,
    selectedWorkerId: null,
    canMergeWorkers: vi.fn(),
    unlockedSlots: GRID_SIZE.INITIAL_SLOTS
  };

  it('renders the game board', () => {
    render(<GameBoard {...defaultProps} />);
    expect(screen.getByText('Active Miners')).toBeInTheDocument();
    expect(screen.getByText(`${GRID_SIZE.INITIAL_SLOTS} slots available`)).toBeInTheDocument();
  });

  it('shows worker count', () => {
    render(<GameBoard {...defaultProps} />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('handles cell clicks', () => {
    render(<GameBoard {...defaultProps} />);
    const cells = screen.getAllByRole('button');
    fireEvent.click(cells[0]);
    expect(defaultProps.onCellClick).toHaveBeenCalledWith(0);
  });

  it('shows remove button when worker is selected', () => {
    render(<GameBoard {...defaultProps} selectedWorkerId="worker1" />);
    expect(screen.getByText(/remove/i)).toBeInTheDocument();
  });
});