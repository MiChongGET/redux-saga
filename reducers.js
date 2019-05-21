export default function counter(state = 0, action) {
    switch (action.type) {

        case 'INCREMENT':
            return state + 1
        case 'INCREMENT_IF_ODD':
            return (state % 2 !== 0) ? state + 1 : state
        case 'DECREMENT':
            return state - 1
        case 'FETCH_SUCCESS':
            console.log('网络请求成功')
            return state
        case 'FETCH_FAILED':
            return state
        default:
            return state
    }
}
