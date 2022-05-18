import { put, takeEvery, call, all } from 'redux-saga/effects';
import { getPaginatedBeerList } from '../../../shared/services/BeerService';

function* storePages() {
  try {
    const paginatedList = yield call(getPaginatedBeerList);
    yield put({ type: 'BUILD_MENU_SUCCESS', payload: paginatedList.items });
  } catch (e) {
    yield put({ type: 'BUILD_MENU_FAILURE', error: e });
  }
}

function* allSagas() {
  yield all([
    takeEvery('BUILD_MENU_REQUEST', storePages),
  ]);
}

export default allSagas;
