import {capitalize} from "@core/utils";

export class DOMListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error('$root no provided to DOMListener')
        }
        this.$root = $root
        this.listeners = listeners
    }

    initDOMListeners() {
        this.listeners.forEach(listener => {
                const method = getMethodName(listener)
                if (this[method]) {
                    this[method] = this[method].bind(this)
                    this.$root.on(listener, this[method])
                } else {
                    throw new Error(`Method ${method} not implemented in ${this.name} Component`)
                }
            }
        )
    }

    removeDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            this.$root.off(listener, this[method])
        })
    }
}

// click => onClick
const getMethodName = (listener) => 'on' + capitalize(listener)