const url = 'http://localhost:9000/';
const email = 'user@example.com';
const password = 'password';

describe('Home Page', () => {
  it('has the correct title and heading', () => {
    cy.visit(url);
    cy.title().should('equal', 'Basic site example');
    cy.contains('h1', 'a basic frontend with vue for stiva');
  });

  it('change language', () => {
    cy.get('select').select('Italiano');
    cy.contains('h1', 'Un semplice frontend per stiva');
  });
});

describe('Registration', () => {
  it('go and register', () => {
    // add custom header to identify the site
    cy.server({
      onAnyRequest: function (route, proxy) {
        proxy.xhr.setRequestHeader('x-slsmu-site', 'localhost');
      }
    });
    cy.visit(url);
    cy.contains('Register').click();
    cy.contains('h2', 'Registration');

    // fill out a form field
    cy.get('input[name="email"]')
      .type(email)
      .get('input[name="password"]')
      .type(password);
    /** fill out more form fields **/

    // simulate clicking submit
    cy.get('.submit').contains('Register')
      .click();

    cy.get('.alert').contains('Registration successful');
  });
});

describe('Login', function () {
  it('login', function () {

    cy.visit(`${url}login`);

    cy.get('input[name=email]').type(email);

    // {enter} causes the form to submit
    cy.get('input[name=password]').type(`${password}{enter}`);

    // we should be redirected to /dash
    cy.url().should('include', '/dash');

    // UI should reflect this user being logged in
    cy.contains('Logged user dash');

  });
});
