export const actionTypes = {
  FAILURE: 'FAILURE',
  FETCH_ISSUES: 'FETCH_ISSUES',
  FETCH_ISSUES_SUCCESS: 'FETCH_ISSUES_SUCCESS',
  FETCH_ISSUES_ERROR: 'FETCH_ISSUES_ERROR',

  FETCH_REPOS: 'FETCH_REPOS',
  FETCH_REPOS_SUCCESS: 'FETCH_REPOS_SUCCESS',
  FETCH_REPOS_ERROR: 'FETCH_REPOS_ERROR',

  UPDATE_USER: 'UPDATE_USER',
  UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
  UPDATE_USER_ERROR: 'UPDATE_USER_ERROR',

  PAGINATE: 'PAGINATE',
  PAGINATE_SUCCESS: 'PAGINATE_SUCCESS',
  PAGINATE_ERROR: 'PAGINATE_ERROR',

	NEXT_PAGE: 'NEXT_PAGE',
	PREV_PAGE: 'PREV_PAGE',

	SET_STATUS: 'SET_STATUS'
}

export const failure = (error) => ({
    type: actionTypes.FAILURE,
    error
});

export const nextpage = () => ({
		type: actionTypes.NEXT_PAGE
});		

export const prevpage = () => ({
		type: actionTypes.PREV_PAGE
});		

export const updateUser = (userData) => ({
   type: actionTypes.UPDATE_USER, 
   userData
});

export const fetchRepos = (data) => ({
    type: actionTypes.FETCH_REPOS, 
    data
});

export const fetchReposSuccess = (data) => ({
	 type: actionTypes.FETCH_REPOS_SUCCESS, 
	 data
});

export const fetchIssues = (data) => ({
    type: actionTypes.FETCH_ISSUES, 
    data
});

export const fetchIssuesSuccess = (data) => ({
	 type: actionTypes.FETCH_ISSUES_SUCCESS, 
	 data
});

export const paginate = (payload) => ({
	type: actionTypes.PAGINATE,
	payload
});

export const paginateSuccess = (data) => ({
	type: actionTypes.PAGINATE_SUCCESS,
	data
});

export const setStatus = (data) => ({
	type: actionTypes.SET_STATUS,
	data
});
