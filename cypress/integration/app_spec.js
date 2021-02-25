describe('My App Test', () => {
  it('Visits the Contacts Form', () => {
    cy.visit('http://localhost:57239/')
    cy.get('app-contacts').contains('Contacts Form')
  })

  it('Insert Contact', () => {
    cy.get('form input').each(($el) => {
      cy.wrap($el).type('new contact')
    })
    cy.get('form > button').click()
    cy.get('table tr').should('have.length', 2)
  })

  it('Delete Contact', () => {
    cy.get('table tr:nth-child(2) button.btn.btn-secondary')
      .should('contain', 'Delete')
      .click()
  })

  it('Update Contact', () => {
    cy.get('table tr:first-child button.btn.btn-primary')
      .should('contain', 'Edit')
      .click()

    cy.get('form input#name')
      .clear()
      .type('PIPPO')

    cy.get('form > button').click()
    cy.contains('PIPPO')
  })
})
