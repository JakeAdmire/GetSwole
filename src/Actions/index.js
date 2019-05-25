export const addUser = (name) => ({
  type: 'ADD_USER',
  name
})

export const setDate = (date) => ({
  type: 'SET_DATE',
  date
})

export const setSemanticDate = (date) => ({
  type: 'SET_SEMANTIC_DATE',
  date
})

export const addExercises = (exercises) => ({
  type: 'ADD_EXERCISES',
  exercises
})

export const isLoading = (boolean) => ({
  type: 'IS_LOADING',
  boolean
})

export const setRoutines = (routines) => ({
  type: 'SET_ROUTINES',
  routines
})