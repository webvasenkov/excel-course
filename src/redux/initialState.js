import {storage} from '@core/utils'
import {defaultStyles, defaultName} from '@/constants'

const defaultState = {
    colState: {},
    rowState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    tableName: defaultName,
    currentStyles: defaultStyles,
    dateOpen: new Date().toJSON()
}

export const initialState = param => storage(`excel:${param}`)
    ? storage(`excel:${param}`)
    : defaultState