import {delay} from "redux-saga";
import {put, takeEvery, all, call,takeLatest} from "redux-saga/effects";

export function* helloSaga() {
    console.log('Hello Saga!')
}

export function* fetchData(action) {
    try {
        const data = yield call(delay, 1000)
        yield put({type: 'FETCH_SUCCESS', data})
    } catch (error) {
        yield put({type: 'FETCH_FAILED', error})
    }
}

export function* watchFetchData() {
    //监控
    //yield takeEvery('FETCH_REQUESTED',fetchData)
    //如果有多个fetchData数据，则会获取最新的数据
    yield takeLatest('FETCH_REQUESTED',fetchData)
}

export function* incrementAsync() {
    // yield delay(1000)

    yield call(delay, 1000)
    console.log('网络请求')
    yield put({type: 'INCREMENT'})
}

export function* watchIncrementAsync() {
    //takeEvery用于监听所有名为的 INCREMENT_ASYNC的 action
    yield takeEvery("INCREMENT_ASYNC", incrementAsync)
}

//将所有的saga都启动起来
export default function* rootSaga() {
    yield all([
        helloSaga(),
        watchIncrementAsync(),
        watchFetchData()
    ])
}