describe('Login spec', () => {
  it('display alert when email or password is epty', () => {
    cy.visit('http://localhost:5173/login')

    cy.get('input[placeholder="email"]').should('be.visible')
    cy.get('input[placeholder="password"]').should('be.visible')
    cy.get('button')
      .contains(/^Login$/)
      .should('be.visible')
    cy.get('button').contains(/^Login$/).click()
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Email atau password tidak boleh kosong');
    });
  })
})
