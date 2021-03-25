const express = require('express')
const xss = require('xss')
const WorkoutService = require('./workout-service')
const workoutRouter = express.Router()
const jsonParser = express.json()



const serializeWorkout = workout=> ({
    id: workout.id,
    email: workout.email,
    muscle: workout.muscle,
    exercise: workout.exercise,
    sets: workout.sets,
    reps: workout.reps,
})


workoutRouter
.route('/')
.get((req, res, next) =>{
    const knexInstance = req.app.get('db')
    WorkoutService.getByEmail(knexInstance, req.query.email)
        .then(workouts =>{
            res.json(workouts.map(serializeWorkout))
        })
        .catch(next)
})
.post(jsonParser, (req, res, next) =>{
    const {email, muscle, exercise, sets, reps} = req.body;
    const newWorkout = {email, muscle, exercise, sets, reps}

    if(!email){ 
        return res
                .status(400)
                .json({message: "Missing 'email' in request body"})
    }


    if(!muscle){
        return res  
            .status(400)
            .json({message: "Missing 'muscle' in request body"})
    }

    if(!exercise){
        return res  
            .status(400)
            .json({message: "Missing 'exercise' in request body"})
    }

    if(!sets){
        return res  
            .status(400)
            .json({message: "Missing 'sets' in request body"})
    }

    if(!reps){
        return res  
            .status(400)
            .json({message: "Missing 'reps' in request body"})
    }
    WorkoutService.insertWorkout(
        req.app.get('db'), newWorkout
    )
        .then(workout =>{
            res 
                .status(201)
                .json(serializeWorkout(workout))
        })
        .catch(next)

})

workoutRouter
.route('/:workout_id')
.delete((req, res, next) => {
    WorkoutService.deleteWorkout(
      req.app.get('db'),
      req.params.workout_id
    )
    
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
    })

module.exports = workoutRouter