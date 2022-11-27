/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

  beforeEach('should visit base URL', () => {
    cy.visit('../../src/index.html')
  })

  it('should verify application title', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('should fill out the mandatory fields and submit the form', () => {
    cy.clock()

    cy.get('#firstName').type('Paula')
    cy.get('#lastName').type('Guedes')
    cy.get('#email').type('paula@gmail.com')
    cy.get('#open-text-area').type('Amei esse hands on. Parabéns!', {delay: 50})
    cy.contains('.button', 'Enviar').click()

    cy.get('.success').should('be.visible')
    cy.tick(3000)
    cy.get('.success').should('not.be.visible')
  })

  Cypress._.times(5, () => {
    it('should show error message when submit invalid email', () => {
      cy.clock()
      
      cy.get('#firstName').type('Paula')
      cy.get('#lastName').type('Guedes')
      cy.get('#email').type('paula@gmail,com')
      cy.get('#open-text-area').type('Amei esse hands on. Parabéns!')
      cy.contains('.button', 'Enviar').click()
  
      cy.get('.error').should('be.visible')
      cy.tick(3000)
      cy.get('.error').should('not.be.visible')
    })
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
    cy.clock()

    cy.get('#phone-checkbox').check()
    cy.get('.phone-label-span').should('be.visible')
    
    cy.get('#firstName').type('Paula')
    cy.get('#lastName').type('Guedes')
    cy.get('#email').type('paula@gmail.com')
    cy.get('#open-text-area').type('Amei esse hands on. Parabéns!')
    cy.contains('.button', 'Enviar').click()
    
    cy.get('.error').should('be.visible')
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
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
    cy.clock()
    
    cy.contains('.button', 'Enviar').click()
    
    cy.get('.error').should('be.visible')
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
  });

  it('should send out form with custom commands', () => {
    cy.clock()

    cy.fillMandatoryFieldsAndSubmit()
    
    cy.get('.success').should('be.visible')
    cy.tick(3000)
    cy.get('.success').should('not.be.visible')
  });

  it('should select product Youtube by text', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  });

  it('should select Mentoria option by its value', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  });

  it('should select Blog by its index', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  });

  it('should check the type Feedback in the type of attendance field', () => {
    cy.get('input[type="radio"]')
      .check('feedback')
      .should('have.value', 'feedback')
  });

  it('should check every type of attendance in this field', () => {
    /* MINHA RESOLUÇÃO DO EXERCÍCIO
    cy.get('input[type="radio"]')
      .check('elogio')
      .should('be.checked')
    
    cy.get('input[type="radio"]')
      .check('feedback')
      .should('be.checked')
    
    cy.get('input[type="radio"]')
      .check('ajuda')
      .should('be.checked')
      */

      cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(($radioButton) => {
          cy.wrap($radioButton).check()
          cy.wrap($radioButton).should('be.checked')
        })
  });

  it('should mark both checkboxes and then unmark the second one', () => {
    cy.get('input[type="checkbox"]')
    .should('have.length', 2)
    .check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('not.be.checked')
  });

  it('should select a file from fixture folder', () => {
    cy.get('#file-upload')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json')
      .should('have.length', 1)
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  });

  it('should upload a file with drag and drop', () => {
    cy.get('#file-upload')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
      .should('have.length', 1)
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  });

  it('should select a file using an alias of a fixture', () => {
    cy.fixture('example.json').as('alias')
    cy.get('#file-upload')
      .selectFile('@alias')
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  });

  it('should verify the link without the necessity of a click', () => {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  });

  it('should access the link removing the target attribute', () => {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('CAC TAT - Política de privacidade').should('be.visible')
  });

  it.only('should show and hide the error and success messages', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  });
})