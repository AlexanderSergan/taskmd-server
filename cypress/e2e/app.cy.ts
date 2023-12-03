/* eslint-disable arrow-parens */

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
      children: [],
    })
      .should(res => {
        expect(res.status).to.eq(201)
      })
      .then(res => Cypress.env('createdCatId', res.body._id))
  })

  it('Can create a cat with parent', () => {
    cy.request('POST', 'http://localhost:3000/cats', {
      name: 'test-Mittens-' + Math.random(),
      age: 5,
      breed: 'Tabby',
      parent: Cypress.env('createdCatId'),
      children: [],
    })
      .should(res => {
        expect(res.status).to.eq(201)
      })
      .then(res => Cypress.env('createdChildCatId', res.body._id))
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

      expect(res.body.children.length).to.eq(1)

      expect(res.body.children[0]._id).to.eq(Cypress.env('createdChildCatId'))
    })
  })

  it('Can delete a cat', () => {
    cy.request(
      'DELETE',
      'http://localhost:3000/cats/' + Cypress.env('createdCatId'),
    ).should(res => {
      expect(res.status).to.eq(200)
    })

    cy.request(
      'DELETE',
      'http://localhost:3000/cats/' + Cypress.env('createdChildCatId'),
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
  const testUser = {
    username: 'test-user-' + Math.random(),
    password: 'pwd-' + Math.random(),
  }

  Cypress.env('testUserName', testUser.username)
  Cypress.env('testUserPassword', testUser.password)

  it('Can create new user', () => {
    cy.request('POST', 'http://localhost:3000/auth/sign-up', {
      username: Cypress.env('testUserName'),
      password: Cypress.env('testUserPassword'),
    }).should(res => {
      expect(res.status).to.eq(201)
      Cypress.env('createdUserId', res.body._id)
    })
  })

  it('Can get access token', () => {
    cy.request('POST', 'http://localhost:3000/auth/sign-in', {
      username: Cypress.env('testUserName'),
      password: Cypress.env('testUserPassword'),
    }).should(res => {
      expect(res.status).to.eq(201)
      expect(res.body.access_token).to.have.length.greaterThan(0)
      Cypress.env('accessToken', res.body.access_token)
    })
  })

  it('Can get whoami', () => {
    cy.setCookie('token', Cypress.env('accessToken'))
    cy.request({
      method: 'GET',
      url: 'http://localhost:3000/auth/whoami',
    }).should(res => {
      expect(res.status).to.eq(200)
      expect(res.body).to.eq('I am ' + Cypress.env('testUserName'))
    })
  })

  it('Can delete all test users', () => {
    cy.request('DELETE', 'http://localhost:3000/users').should(res => {
      expect(res.status).to.eq(200)
    })
  })

  it('Can get all folders by auth token', () => {
    cy.setCookie('token', Cypress.env('accessToken'))
    cy.request({
      method: 'GET',
      url: 'http://localhost:3000/folders',
    }).should(res => {
      expect(res.status).to.eq(200)
      expect(res.body.length).to.eq(0)
    })
  })

  it('Can create a new folder', () => {
    cy.setCookie('token', Cypress.env('accessToken'))
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/folders',
      body: {
        name: 'test-folder-' + Math.random(),
        // TODO: why we need userId if we can get it from token?
        userId: Cypress.env('createdUserId'),
        parent: 'root',
        notesCount: 0,
        path: 'root',
        subfolders: [],
        notes: [],
        editable: true,
      },
    }).should(res => {
      expect(res.status).to.eq(201)
      Cypress.env('createdFolderId', res.body._id)
    })
  })

  it('Can create a child folder', () => {
    cy.setCookie('token', Cypress.env('accessToken'))
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/folders',
      body: {
        name: 'test-folder-' + Math.random(),
        notesCount: 0,
        // TODO: why we need userId if we can get it from token?
        userId: Cypress.env('createdUserId'),
        path: 'root',
        subfolders: [],
        notes: [],
        editable: true,
        parent: Cypress.env('createdFolderId'),
      },
    }).should(res => {
      expect(res.status).to.eq(201)
      Cypress.env('createdChildFolderId', res.body._id)
    })
  })

  it('Can get folder by id and verify child folder', () => {
    cy.setCookie('token', Cypress.env('accessToken'))
    cy.request({
      method: 'GET',
      url:
        'http://localhost:3000/folders/find/' + Cypress.env('createdFolderId'),
    }).should(res => {
      expect(res.status).to.eq(200)
      expect(res.body._id).to.eq(Cypress.env('createdFolderId'))
      expect(res.body.subfolders.length).to.eq(1)
      expect(res.body.subfolders[0]._id).to.eq(
        Cypress.env('createdChildFolderId'),
      )
    })
  })

  it('Can delete a folder', () => {
    cy.setCookie('token', Cypress.env('accessToken'))
    cy.request({
      method: 'DELETE',
      url: 'http://localhost:3000/folders/' + Cypress.env('createdFolderId'),
    }).should(res => {
      expect(res.status).to.eq(200)
    })
  })

  it('Can delete all test folders', () => {
    cy.request('DELETE', 'http://localhost:3000/folders/test').should(res => {
      expect(res.status).to.eq(200)
    })
  })
})
