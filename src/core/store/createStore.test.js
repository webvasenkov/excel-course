import {createStore} from './createStore'

const initialState = {
    count: 0
}

function reducer(state = initialState, action) {
    if (action.type === 'ADD') {
        return {...state, count: ++state.count}
    }

    return state
}

describe('createStore', () => {
    let store
    let handler

    beforeEach(function () {
        store = createStore(reducer, initialState)
        handler = jest.fn()
    })

    test('should return store object', () => {
        expect(store).toBeDefined()
        expect(store.dispatch).toBeDefined()
        expect(store.subscribe).toBeDefined()
        expect(store.getState).toBeDefined()
    })

    test('should return object as a state', () => {
        const state = store.getState()
        expect(state).toBeInstanceOf(Object)
    })

    test('should return default state', () => {
        const state = store.getState()
        expect(state).toEqual(initialState)
    })

    test('should change state if dispatch action exists', () => {
        store.dispatch({type: 'ADD'})
        const state = store.getState()
        expect(state.count).toBe(1)
    })

    test('should NOT change state if dispatch action NOT exists', () => {
        store.dispatch({type: 'NOT_EXISTS'})
        const state = store.getState()
        expect(state.count).toBe(0)
    })

    test('should calling sub before dispatch', () => {
        store.subscribe(handler)
        store.dispatch({type: 'ADD'})
        expect(handler).toHaveBeenCalled()
        expect(handler).toHaveBeenCalledWith(store.getState())
    })

    test('should NOT calling sub before dispatch if sub unsubscribed', () => {
        const sub = store.subscribe(handler)
        sub.unsubscribe()
        store.dispatch({type: 'ADD'})
        expect(handler).not.toHaveBeenCalled()
    })

    test('should dispatch in async way', () => {
        return new Promise(resolve => {
            setTimeout(() => {
                store.dispatch({type: 'ADD'})
            }, 300)

            setTimeout(() => {
                const state = store.getState()
                expect(state.count).toBe(1)
                resolve()
            }, 500)
        })
    })
})
