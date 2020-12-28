import {defaultStyles} from '@/constants'
import {toInlineStyles} from '@core/utils'
import {parse} from '@core/parse'

const CODES = {
    A: 65,
    Z: 90
}

const DEFAULT_WIDTH = 100
const DEFAULT_HEIGHT = 26

function getWidth(state, index) {
    return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
    return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function createRow(info, data, state = {}) {
    const resizer = info ? `<span class="excel__table-row-resize" data-resize="row"></span>` : ''
    const dataRow = info ? `data-row=${info - 1}` : ''
    const height = getHeight(state, info - 1)
    return `
    <div class="excel__table-row" data-type="resizable" ${dataRow} style="height: ${height}">
         <div class="excel__table-row-info">
            ${info}
            ${resizer}
         </div>
         <div class="excel__table-row-data">${data}</div>
    </div>
     `
}

function toCol(state) {
    return function col(col, index) {
        const width = getWidth(state, index)
        return `
        <div class="excel__table-col"
             data-type="resizable"
             data-col="${index}"
             style="width: ${width}">
                ${col}
            <span class="excel__table-col-resize" data-resize="col"></span>
        </div>
        `
    }
}

function toCell(indexRow, {colState, dataState, stylesState}) {
    return function cell(_, indexCol) {
        const id = `${indexRow}:${indexCol}`
        const width = getWidth(colState, indexCol)
        const styles = stylesState[id] ? toInlineStyles(stylesState[id]) : toInlineStyles(defaultStyles)
        const data = dataState[id]

        return `<div 
                     class="excel__table-cell"
                     contenteditable
                     spellcheck="false"
                     data-col=${indexCol}
                     data-id=${id}
                     data-value="${data || ''}"
                     style="width: ${width}; ${styles};"
                >${parse(data) || ''}</div>`
    }
}

function toChar(_, code) {
    return String.fromCharCode(CODES.A + code)
}

export function createTable(rowsCount = 5, state = {}) {
    const colsCount = CODES.Z - CODES.A + 1
    const states = state()
    const colState = states.colState
    const rowState = states.rowState

    const rows = []
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toCol(colState))
        .join('')

    rows.push(createRow('', cols))

    for (let i = 0; i < rowsCount; i++) {
        const cell = new Array(colsCount)
            .fill('')
            .map(toCell(i, states))
            .join('')

        rows.push(createRow(i + 1, cell, rowState))
    }

    return rows.join('')
}