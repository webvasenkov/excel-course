import {
    TABLE_RESIZE,
    TABLE_DATA,
    CHANGE_STYLES,
    APPLY_STYLES,
    CHANGE_NAME,
    DATE_OPEN
} from './types'

export function tableResize(data) {
    return {type: TABLE_RESIZE, data}
}

export function tableData(data) {
    return {type: TABLE_DATA, data}
}

export function changeStyles(data) {
    return {type: CHANGE_STYLES, data}
}

export function applyStyle(data) {
    return {type: APPLY_STYLES, data}
}

export function changeName(data) {
    return {type: CHANGE_NAME, data}
}

export function dateOpen() {
    return {type: DATE_OPEN}
}