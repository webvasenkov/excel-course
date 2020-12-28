import {storage} from '@core/utils'
import {defaultStyles, defaultName} from '@/constants'

const defaultState = {
    colState: {},
    rowState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    tableName: defaultName,
    currentStyles: defaultStyles
}


export const initialState = storage('excel-state')
    ? storage('excel-state')
    : defaultState