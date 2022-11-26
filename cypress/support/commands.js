Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
  cy.get('#firstName').type('Paula')
  cy.get('#lastName').type('Guedes')
  cy.get('#email').type('paula@gmail.com')
  cy.get('#open-text-area').type('Amei esse hands on. Parabéns!')
  cy.contains('button', 'Enviar').click()
})
