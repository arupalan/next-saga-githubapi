import {actionTypes} from './actions'

export const InitialState = {
  error: false,
  user: {userName: '', repoName: ''},
  repos: [],
  selectedRepo: {},
  issues: [],
  pagination: { currPage: 1, perPage: 10, disabled: true },
	currPageIndex: 1,
	status: ''
}

function reducer (state = InitialState, action) {
  switch (action.type) {
    case actionTypes.FAILURE:
      return {
        ...state,
        ...{error: action.error}
      }

     case actionTypes.UPDATE_USER:
      return {
        ...state,
        ...{user: action.userData}
     }

		 case actionTypes.NEXT_PAGE:
		 	return {
				...state,
				...{currPageIndex: state.currPageIndex + 1}
		 }

		 case actionTypes.PREV_PAGE:
		 	return {
				...state,
				...{currPageIndex: (state.currPageIndex > 1) ? state.currPageIndex - 1 : state.currPageIndex}
		 }

    case actionTypes.FETCH_REPOS_SUCCESS:
      return {
        ...state,
        ...{repos: action.data}
       }

    case actionTypes.FETCH_ISSUES_SUCCESS:
      return {
        ...state,
        ...{issues: action.data}
       }

    case actionTypes.PAGINATE_SUCCESS:
      return {
        ...state,
        ...{issues: action.data}
       }

    case actionTypes.SET_STATUS:
      return {
        ...state,
        ...{status: action.data}
       }

    default:
      return state
  }
}

export default reducer
