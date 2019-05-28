export const addUser = (user) => ({
  type: 'ADD_USER',
  user
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
 
export const setSelectedRoutine = (routine) => ({
  type: 'SET_SELECTED_ROUTINE',
  routine
})