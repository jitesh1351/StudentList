import {
  GRID_DATA, GRID_DATA_ERROR
} from '../actions/studentDetailsAction';
const initialState = {
  studentData: []
};
/**
   * @desc studentDetailsReducer, This function will take oldstate and payload as parameter and return new state value
   * @param {object} state old state value
   * @param {object} action holds the payload
   * @return {object} new state value
   */
export default function studentDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case GRID_DATA: {
      return {
        ...state, studentData: action.payload
      };
    }
    case GRID_DATA_ERROR: {
      return {
        ...state, studentData: action.payload
      };
    }
    default: {
      return state;
    }
  }
}