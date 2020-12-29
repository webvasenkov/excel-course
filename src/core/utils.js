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

export function storage(key, data = null) {
    if (!data) {
       return JSON.parse(localStorage.getItem(key))
    }

    localStorage.setItem(key, JSON.stringify(data))
}

export function isEqual(val1, val2) {
    if (typeof val1 === 'object' || typeof val2 === 'object') {
        return JSON.stringify(val1) === JSON.stringify(val2)
    }

    return val1 === val2
}

export function camelCaseToDash(str) {
    return str.replace(/[A-Z]/g, `-$&`).toLowerCase()
}

export function toInlineStyles(styles) {
    return Object
        .keys(styles)
        .map(key => `${camelCaseToDash(key)}: ${styles[key]}`)
        .join('; ')
}

export function debounce(fn, wait) {
    let timeout
    return function (...args) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            clearTimeout(timeout)
            fn(...args)
        }, wait)
    }
}

export function preventDefault(e) {
    e.preventDefault()
}