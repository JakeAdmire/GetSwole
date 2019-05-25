export const addUser = (name) => ({
  type: 'ADD_USER',
  name
})

export const addDateToStore = (date) => ({
  type: 'ADD_DATE_TO_STORE',
  date
})

export const addExercises = (exercises) => ({
  type: 'ADD_EXERCISES',
  exercises
})

// export const loadRoutines = (boolean) => ({
//   type: 'LOAD_ROUTINES',
//   boolean
// })

// export const unloadRoutines = (boolean) => ({
//   type: 'UNLOAD_ROUTINES',
//   boolean
// })

export const isLoading = (boolean) => ({
  type: 'IS_LOADING',
  isLoading: boolean
})

export const hasError = (message) => ({
  type: "HAS_ERROR",
  message
})

export const setRoutines = (routines) => ({
  type: 'SET_ROUTINES',
  routines
})

export const addPreMadeRoutine = (routine) => ({
  type: 'ADD_PREMADE_ROUTINE',
  routine
})
 
