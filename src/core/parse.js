export function parse(value = '') {
    if(typeof value === 'string' && value.startsWith('=')) {
        try {
           return eval(value.slice(1))
        } catch(e) {
            console.warn('Formula incorrect')
            return value
        }
    }

    return value
}