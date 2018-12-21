import getAPIUrl from '../apiConfig';
import axios from 'axios';
export const GRID_DATA = 'GRID_DATA'
export const GRID_DATA_ERROR = 'GRID_DATA_ERROR'
/**
 * @desc fetchStudentGridData, To fetch grid Data
 * @returns {object} payload data
*/
export function fetchStudentGridData() {
  const url = getAPIUrl('student');
  return (dispatch) => {
    axios.get(url)
      .then((response) => {
        dispatch({
          type: 'GRID_DATA',
          payload: response.data || response.message
        })
      }).catch((error) => {
        dispatch({
          type: 'GRID_DATA_ERROR',
          payload: error.data || error.message
        })
      })
  }
}