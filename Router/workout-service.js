const WorkoutService = {
    getAllWorkout(knex) {
      return knex.select('*').from('workout')
    },
  
    insertWorkout(knex, newWorkout) {
      return knex
        .insert(newWorkout)
        .into('workout')
        .returning('*')
        .then(rows => {
          return rows[0]
        })
    },
  
    getByEmail(knex, email) {
      return knex
        .from('workout')
        .select('*')
        .where('email', email)
      
    },
  
    deleteWorkout(knex, id) {
      return knex('workout')
        .where({ id })
        .delete()
    },
  
    updateWorkout(knex, id, newWorkoutsField) {
      return knex('workout')
        .where({ id })
        .update(newWorkoutsField)
    },
  }
  
  module.exports = WorkoutService