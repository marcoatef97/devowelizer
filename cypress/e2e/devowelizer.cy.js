describe('Devowelizer Service Tests', () => {
  beforeEach(() => {
    // Ensure the Devowelizer Service Docker container is running as the Prerequisite
    cy.exec('docker run -p 8080:8080 -d casumo/devowelizer:latest');
  });

  afterEach(() => {
    // Stop and remove the Devowelizer Service Docker container after each test case execution
    cy.exec('docker stop $(docker ps -q --filter ancestor=casumo/devowelizer:latest)');
  });

  it('Shall devowelize the string correctly', () => {
    cy.request('GET', 'http://localhost:8080/Hello,%20Testing!')
      .its('body')
      .should('equal', 'Hll, tstng')
  });

  it('Shall handle empty strings properly', () => {
    cy.request('GET', 'http://localhost:8080/')
      .its('body')
      .should('equal', '')
  });

  it('Shall handle strings without vowels properly', () => {
    cy.request('GET', 'http://localhost:8080/Grvty')
      .its('body')
      .should('equal', 'Grvty')
  });
});