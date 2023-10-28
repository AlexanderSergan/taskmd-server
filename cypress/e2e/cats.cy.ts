describe('Cats scope', () => {
  it('Can create a cat', () => {
    cy.request('http://localhost:3000')
      .its('body')
      .should('include', 'Hello World!');
  });
});
