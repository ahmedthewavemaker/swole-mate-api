const knex = require('knex')
const app = require('../src/app')
const { makeWorkoutArray } = require('./workout-fixture')

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
    context(`Given no exercises`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/workout?email=test@tes.com')
          .expect(200, [])
      })
    })

    context('Given there are exercises in the database', () => {
      const testWorkout = makeWorkoutArray();

      beforeEach('insert exercise', () => {
        return db
          .into('workout')
          .insert(testWorkout)
      })

      it('responds with 200 and all of the exercises', () => {
        return supertest(app)
          .get('/api/workout?email=testing@tests.com')
          .expect(200, testWorkout)
      })
    })
  })

  describe(`POST /api/workout`, () => {
    const testWorkout = makeWorkoutArray();
    beforeEach('insert worout', () => {
      return db
        .into('workout')
        .insert(testWorkout)
    })

    it(`creates an exercise, responding with 201 and the new exercise`, () => {
      const newExercise = {
        email: 'testing@tests.com',
        muscle: 'chest',
        exercise: 'pushups',
        sets: 1,
        reps: 20
      }
      return supertest(app)
        .post('/api/workout')
        .send(newExercise)
        .expect(201)
        .expect(res => {
          expect(res.body.id).to.eql(newExercise.id)
          expect(res.body.email).to.eql(newExercise.email)
          expect(res.body.muscle).to.eql(newExercise.muscle)
          expect(res.body.exercise).to.eql(newExercise.exercise)
          expect(res.body.sets).to.eql(newExercise.sets)
          expect(res.body.reps).to.eql(newExercise.reps)

        })
        .then(res =>
          supertest(app)
            .get(`/api/notes/workout`)
            .expect(res.body)
        )
    })
  })

  describe(`DELETE /api/workout_id`, () => {
    context('Given there are exercises in the database', () => {
      const testWorkout = makeWorkoutArray();

      beforeEach('insert workout', () => {
        return db
          .into('workout')
          .insert(testWorkout)
          .then(() => {
            return db
              .into('workout')
              .insert(testWorkout)
          })
      })

      it('responds with 204 and removes the exercise', () => {
        const idToRemove = 22
        const expectedWorkout = testWorkout.filter(exercise => exercise.id !== idToRemove)
        return supertest(app)
          .delete(`/api/workout_${idToRemove}`)
          .expect(204)
          .then(res =>
            supertest(app)
              .get(`/api/workout`)
              .expect(expectedWorkout)
          )
      })
    })
  })



})