/* global fetch */

import {delay} from 'redux-saga'
import {all, call, put, take, takeLatest, takeEvery , select} from 'redux-saga/effects'
import es6promise from 'es6-promise'
import 'isomorphic-unfetch'

import {actionTypes, failure, fetchReposSuccess, fetchIssuesSuccess} from './actions'
import Constants from './static/constants'
import * as selectors from './selectors'

es6promise.polyfill()

function * fetchReposSaga () {
  try {
    const response = yield take(actionTypes.FETCH_REPOS)
    const url = Constants.API_ROOT + 'users/' + response.data.userName + '/repos' + '?per_page=9999';
    const res = yield fetch(url)
    const data = yield res.json()
    yield put(fetchReposSuccess(data))
  } catch (err) {
    yield put(failure(err))
  }
}


function* fetchIssuesSaga () {
	try{
	  const user = yield select(selectors.user);
		const pagination = yield select(selectors.pagination);
		const currPageIndex = yield select(selectors.currPageIndex);
		const status = yield select(selectors.status);

		const url = Constants.API_ROOT + 'repos/' + user.userName + '/' + user.repoName + '/issues?page=' + currPageIndex + '&per_page=' + pagination.perPage ;
	  const filtered_url = (status.trim() === '') ? url : url + '&state=' + status;
		console.log('url , status, filtered_url', url , status, filtered_url);
		const res = yield fetch(filtered_url)
		const data = yield res.json()
		yield put(fetchIssuesSuccess(data))
	} catch (err) {
		yield put(failure(err))
	}
}
    

function * rootSaga () {
  yield all([
    takeEvery(actionTypes.FETCH_REPOS, fetchReposSaga),
		takeEvery(actionTypes.FETCH_ISSUES, fetchIssuesSaga),
		takeEvery(actionTypes.NEXT_PAGE,fetchIssuesSaga),
		takeEvery(actionTypes.PREV_PAGE,fetchIssuesSaga)
  ])
}

export default rootSaga
