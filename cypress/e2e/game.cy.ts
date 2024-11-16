describe('Game Flow', () => {
  beforeEach(() => {
    cy.visit('/');
    // Wait for loading screen to disappear
    cy.contains('Loading Web3 Experience').should('exist');
    cy.contains('Web3 Arena', { timeout: 10000 }).should('exist');
  });

  it('allows hiring workers', () => {
    cy.contains('button', /HIRE EMSX MINER/i).click();
    cy.get('[data-testid="worker"]').should('have.length', 1);
  });

  it('shows correct initial balance', () => {
    cy.contains('EMSX').parent().contains('10');
  });

  it('updates mining rate when hiring workers', () => {
    const initialRate = cy.get('[data-testid="mining-rate-emsx"]').invoke('text');
    cy.contains('button', /HIRE EMSX MINER/i).click();
    cy.get('[data-testid="mining-rate-emsx"]')
      .invoke('text')
      .should('not.eq', initialRate);
  });
});