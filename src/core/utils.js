export function capitalize(str) {
    if (typeof str !== 'string') {
        return ''
    }
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export function range(start, end) {
    if (end < start) {
        [end, start] = [start, end]
    }

    return new Array(end - start + 1)
        .fill('')
        .map((_, i) => start + i)
}