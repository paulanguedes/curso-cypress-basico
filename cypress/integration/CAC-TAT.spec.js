/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

  it('should verify application title', () => {
    cy.visit('../../src/index.html')
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
})