import {range} from '@core/utils'

export function shouldResize(event) {
    return event.target.dataset.resize
}

export function isCell(event) {
    return event.target.dataset.id
}

export function matrix($current, $target) {
    const current = $current.id(true)
    const target = $target.id(true)

    const cells = range(current.col, target.col)
    const rows = range(current.row, target.row)

    return cells.reduce((matrix, cell) => {
        rows.forEach(row => matrix.push(`${row}:${cell}`))
        return matrix
    }, [])
}

export function targetSelector(key, {row, col}) {
    const MIN_VALUE = 0

    switch (key) {
        case 'Tab':
        case 'ArrowRight':
            col++
            break
        case 'Enter':
        case 'ArrowDown':
            row++
            break
        case 'ArrowLeft':
            col = col > MIN_VALUE ? --col : MIN_VALUE
            break
        case 'ArrowUp':
            row = row > MIN_VALUE ? --row : MIN_VALUE
            break
    }

    return `[data-id="${row}:${col}"]`
}




