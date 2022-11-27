describe('Central de Atendimento ao Cliente TAT - Política de privacidade', () => {

  beforeEach('should visit Privacy page', () => {
    cy.visit('../../src/privacy.html')
  })
  it.only('should test the Privacy Page', () => {
    cy.get('title')
      .should('have.text', 'Central de Atendimento ao Cliente TAT - Política de privacidade')

    cy.get('#title')
      .should('be.visible')
      .should('have.text', 'CAC TAT - Política de privacidade')

    cy.get('#white-background')
      .should('be.visible')
      .should('have.attr', 'class', 'privacy')

    cy.get('p')
      .should('have.length', 4)
  });
})