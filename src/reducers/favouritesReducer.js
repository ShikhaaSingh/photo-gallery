
function favouritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE': {
      const isFavourite = state.includes(action.photoId)

      if (isFavourite) {
        return state.filter((id) => id !== action.photoId)
      }

      return [...state, action.photoId]
    }

    default:
      return state
  }
}

export default favouritesReducer
