import {DOMListener} from '@core/DOMListener'

export class ExcelComponent extends DOMListener{
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.observer = options.observer
        this.store = options.store
        this.subscribers = options.subscribers || []
        this.unsubscribers = []
        this.prepare()
    }

    // settings component after init
    prepare() {}

    // returned template component
    toHTML() {
        return ''
    }

    // methods for Observer
    $emmit(name, ...data) {
        this.observer.dispatch(name, ...data)
    }

    $on(name, fn) {
        const unsub = this.observer.subscribe(name, fn)
        this.unsubscribers.push(unsub)
    }

    // methods for Store
    $dispatch(action) {
        this.store.dispatch(action)
    }

    // object changes state
    storeChanged() {}

    watchingProperty(prop) {
        return this.subscribers.includes(prop)
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