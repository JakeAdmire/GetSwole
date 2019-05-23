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
  boolean
})

export const setRoutines = (routines) => ({
  type: 'SET_ROUTINES',
  routines
})