const url = 'http://localhost:9000/';
const email = 'user@example.com';
const password = 'password';



describe('User', () => {

  before(function () {

    // add custom header to identify the site
    cy.server({
      onAnyRequest: function (route, proxy) {
        proxy.xhr.setRequestHeader('x-slsmu-site', 'localhost');
      }
    });
    cy.visit(`${url}login`);

    cy.get('input[name=email]').type(email);

    // {enter} causes the form to submit
    cy.get('input[name=password]').type(`${password}{enter}`);

    // we should be redirected to /dash
    cy.url().should('include', '/dash');

    // UI should reflect this user being logged in
    cy.contains('Logged user dash');

  });

  it('update- add fullname', () => {
    cy.visit(url);
    cy.contains('.user-update-button').click();

    // fill out a form field
    cy.get('input[name="fullname"]')
      .type('test fullname');
    /** fill out more form fields **/

    // simulate clicking submit
    cy.get('.submit-user-update').contains('Register')
      .click();
    cy.get('.alert').contains('Registration successful');
  });
});
