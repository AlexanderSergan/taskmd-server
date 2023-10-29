describe('Cats scope', () => {
  it('Can get all cats', () => {
    cy.request('http://localhost:3000/cats').should(res => {
      expect(res.body.length).to.be.greaterThan(0)
      Cypress.env('allCatsLength', res.body.length)
    })
  })

  it('Can create a cat', () => {
    cy.request('POST', 'http://localhost:3000/cats', {
      name: 'test-Mittens-' + Math.random(),
      age: 5,
      breed: 'Tabby',
    })
      .should(res => {
        expect(res.status).to.eq(201)
      })
      .then(res => Cypress.env('createdCatId', res.body._id))
  })

  it('Can not create invalid cat', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/cats',
      failOnStatusCode: false,
      body: {
        name: 'test-Mittens-' + Math.random(),
        age: -5,
        breed: 'Tabby',
      },
    }).should(res => {
      expect(res.status).to.eq(500)
    })
  })

  it('Can update a cat', () => {
    cy.request(
      'PUT',
      'http://localhost:3000/cats/' + Cypress.env('createdCatId'),
      {
        name: 'test-Mittens-' + Math.random(),
        age: 2,
        breed: 'Tabby',
      },
    ).should(res => {
      expect(res.status).to.eq(200)
    })
  })

  it('Can get a cat by id', () => {
    cy.request(
      'http://localhost:3000/cats/' + Cypress.env('createdCatId'),
    ).should(res => {
      expect(res.status).to.eq(200)
      expect(res.body._id).to.eq(Cypress.env('createdCatId'))
      expect(res.body.age).to.eq(2)
    })
  })

  it('Can delete a cat', () => {
    cy.request(
      'DELETE',
      'http://localhost:3000/cats/' + Cypress.env('createdCatId'),
    ).should(res => {
      expect(res.status).to.eq(200)
    })
  })

  it('Verify cat was deleted', () => {
    cy.request('http://localhost:3000/cats/').should(res => {
      expect(res.body.length).to.be.eq(Cypress.env('allCatsLength'))
    })
  })
})

describe('Auth scope', () => {
  it('Can create new user', () => {
    cy.request('POST', 'http://localhost:3000/auth/sign-up', {
      username: 'test-user-' + Math.random(),
      password: 'pwd' + Math.random(),
    }).should(res => {
      expect(res.status).to.eq(201)
      Cypress.env('createdUserId', res.body._id)
    })
  })

  it('Can delete all test users', () => {
    cy.request('DELETE', 'http://localhost:3000/users').should(res => {
      expect(res.status).to.eq(200)
    })
  })
})
