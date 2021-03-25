const knex = require('knex')
const app = require('../src/app')

describe('App', () => {
  it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello, world!')
  })
})


describe('exercise Endpoints', function () {
  let db

  before('make knex instance', () => {
      console.log(process.env.TEST_DATABASE_URL)
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)

  })

  after('disconnect from db', () => db.destroy())

  before('clean the table', () => db.raw('TRUNCATE workout RESTART IDENTITY CASCADE'))

  afterEach('cleanup', () => db.raw('TRUNCATE workout RESTART IDENTITY CASCADE'))

  describe(`GET /api/workout`, () => {
    context(`Given no workouts`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/workout?email=test@tes.com')
          .expect(200, [])
      })
    })

  })




})