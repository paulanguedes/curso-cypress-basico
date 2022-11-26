/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

  beforeEach('should visit base URL', () => {
    cy.visit('../../src/index.html')
  })

  it('should verify application title', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('should fill out the mandatory fields and submit the form', () => {
    cy.get('#firstName').type('Paula')
    cy.get('#lastName').type('Guedes')
    cy.get('#email').type('paula@gmail.com')
    cy.get('#open-text-area').type('Amei esse hands on. Parabéns!', {delay: 50})
    cy.contains('.button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('should show error message when submit invalid email', () => {
    cy.get('#firstName').type('Paula')
    cy.get('#lastName').type('Guedes')
    cy.get('#email').type('paula@gmail,com')
    cy.get('#open-text-area').type('Amei esse hands on. Parabéns!')
    cy.contains('.button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('should only fill out the phone field with numbers', () => {
    cy.get('#phone')
      .type('paula')
        .should('be.empty')
        .should('have.value', '')
      .type('123456789')
        .should('have.value', '123456789')
        .should('not.be.NaN')
  })

  it('should show error message if phone is required but not filled on submit', () => {
    cy.get('#phone-checkbox').check()
    cy.get('.phone-label-span').should('be.visible')
    
    cy.get('#firstName').type('Paula')
    cy.get('#lastName').type('Guedes')
    cy.get('#email').type('paula@gmail.com')
    cy.get('#open-text-area').type('Amei esse hands on. Parabéns!')
    cy.contains('.button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('fills out and clears the fiels name, lasta name, email and phone', () => {
    cy.get('#firstName')
      .type('Paula')
      .should('have.value', 'Paula')
      .clear()
      .should('be.empty')

    cy.get('#lastName')
      .type('Guedes')
      .should('have.value', 'Guedes')
      .clear()
      .should('be.empty')

    cy.get('#email')
      .type('paula@gmail.com')
      .should('have.value', 'paula@gmail.com')
      .clear()
      .should('be.empty')

    cy.get('#phone')
      .type('123456789')
      .should('have.value', '123456789')
      .clear()
      .should('be.empty')
  })

  it('should show error message if required fields are not filled out', () => {
    cy.contains('.button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  });

  it('should send out form with custom commands', () => {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  });
  
})