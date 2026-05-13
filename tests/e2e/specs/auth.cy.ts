describe('Authentication Flow', () => {
  const testEmail = `test${Date.now()}@example.com`;
  const testPassword = 'TestPassword@123';

  it('should allow user to register', () => {
    cy.visit('http://localhost:5173/register');

    cy.get('ion-input').eq(0).within(() => {
      cy.get('input').type('Test User');
    });

    cy.get('ion-input').eq(1).within(() => {
      cy.get('input').type(testEmail);
    });

    cy.get('ion-input').eq(2).within(() => {
      cy.get('input').type(testPassword);
    });

    cy.get('ion-input').eq(3).within(() => {
      cy.get('input').type(testPassword);
    });

    cy.contains('ion-button', 'Register').click();

    cy.url().should('include', '/user');
  });

  it('should allow user to login', () => {
    cy.visit('http://localhost:5173/login');

    cy.get('ion-input').eq(0).within(() => {
      cy.get('input').type(testEmail);
    });

    cy.get('ion-input').eq(1).within(() => {
      cy.get('input').type(testPassword);
    });

    cy.contains('ion-button', 'Login').click();

    cy.url().should('include', '/user');
  });

  it('should show home page with media', () => {
    cy.visit('http://localhost:5173/home');

    cy.get('ion-card').should('exist');
    cy.contains('Welcome to Ionic Videos App').should('exist');
  });
});

