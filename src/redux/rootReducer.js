import {
    TABLE_RESIZE,
    TABLE_DATA,
    CHANGE_STYLES,
    APPLY_STYLES,
    CHANGE_NAME,
    DATE_OPEN
} from './types'

import {defaultStyles} from '@/constants'

export function rootReducer(state, action) {
    switch (action.type) {
        case TABLE_RESIZE: {
            const field = action.data.is === 'col' ? 'colState' : 'rowState'
            return {...state, [field]: tableValue(field, state, action)}
        }
        case TABLE_DATA: {
            const field = 'dataState'
            return {...state, [field]: tableValue(field, state, action), currentText: action.data.value}
        }
        case CHANGE_STYLES: {
            return {...state, currentStyles: {...state.currentStyles, ...action.data}}
        }
        case APPLY_STYLES: {
            const field = 'stylesState'
            const prevState = {...state[field]} || {}
            action.data.ids.forEach(id => {
                prevState[id] = {...defaultStyles, ...prevState[id], ...action.data.value}
            })
            return {...state, [field]: {...state[field], ...prevState}}
        }
        case CHANGE_NAME: {
            return {...state, tableName: action.data}
        }
        case DATE_OPEN: {
            return {...state, dateOpen: new Date().toJSON()}
        }
        default:
            return state
    }
}

function tableValue(field, state, action) {
    const value = {...state[field]} || {}
    value[action.data.id] = action.data.value
    return value
}