import {DOMListener} from '@core/DOMListener'

export class ExcelComponent extends DOMListener{
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.prepare()
        this.observer = options.observer
        this.unsubscribers = []
    }

    // settings component after init
    prepare() {}

    // returned template component
    toHTML() {
        return ''
    }

    $dispatch(name, ...data) {
        this.observer.dispatch(name, ...data)
    }

    $on(name, fn) {
        const unsub = this.observer.subscribe(name, fn)
        this.unsubscribers.push(unsub)
    }

    // initialization component
    // add DOM listeners
    init() {
        this.initDOMListeners()
    }

    // remove component
    // remove DOM listeners
    // unsubscribe listeners
    destroy() {
        this.removeDOMListeners()
        this.unsubscribers.forEach(unsub => unsub())
    }
}