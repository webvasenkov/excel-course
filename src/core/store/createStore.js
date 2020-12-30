export function createStore(rootReducer, initialState = {}) {
    let state = rootReducer({...initialState}, {type: 'INIT'})
    let subscribers = []

    function subscribe(fn) {
        subscribers.push(fn)

        return {
            unsubscribe() {
                subscribers = subscribers.filter(sub => sub !== fn)
            }
        }
    }

    function dispatch(action) {
        state = rootReducer(state, action)
        subscribers.forEach(sub => sub(state))
    }

    function getState() {
        return JSON.parse(JSON.stringify(state))
    }

    return {
        subscribe,
        dispatch,
        getState
    }
}