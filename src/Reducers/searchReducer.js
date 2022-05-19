import { FILTER_RESULTS } from '../Constants/generalConstants'

export default function searchReducer (state = {}, action) {
  switch (action.type) {
    case FILTER_RESULTS: {
      return {
        ...state,
        filterBy: action.filterBy
      }
    }
    default:
      return state
  }
}
