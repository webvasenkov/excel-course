const CODES = {
    A: 65,
    Z: 90
}

function createRow(info, data) {
    const resizer = info ? `<span class="excel__table-row-resize" data-resize="row"></span>` : ''
    return `
    <div class="excel__table-row" data-type="resizable">
         <div class="excel__table-row-info">
            ${info}
            ${resizer}
         </div>
         <div class="excel__table-row-data">${data}</div>
    </div>
     `
}

function toColl(col, index) {
    return `
    <div class="excel__table-col" data-type="resizable" data-col="${index}">
        ${col}
        <span class="excel__table-col-resize" data-resize="col"></span>
    </div>
    `
}

function toCell(indexRow) {
    return function col(_, indexCol) {
        return `<div class="excel__table-cell" contenteditable spellcheck="false" data-col=${indexCol} data-id=${indexRow}:${indexCol}></div>`
    }
}

function toChar(_, code) {
    return String.fromCharCode(CODES.A + code)
}

export function createTable(rowsCount = 5) {
    const colsCount = CODES.Z - CODES.A + 1
    console.log(colsCount)

    const rows = []
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColl)
        .join('')

    rows.push(createRow('', cols))

    for (let i = 0; i < rowsCount; i++) {
        const cell = new Array(colsCount)
            .fill('')
            .map(toCell(i))
            .join('')

        rows.push(createRow(i + 1, cell))
    }

    return rows.join('')
}