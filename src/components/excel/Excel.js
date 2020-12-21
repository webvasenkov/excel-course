import {$} from '@core/DOM'
import {Observer} from '@core/Observer'

export class Excel {
    constructor(selector, components) {
        this.$el = $(selector)
        this.components = components || []
        this.observer = new Observer()
    }

    getRoot() {
        const $root = $.create('div', 'excel')
        const optionsObserver = {observer: this.observer}

        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className)
            const component = new Component($el, optionsObserver)
            $el.html(component.toHTML())
            $root.append($el)
            return component
        })

        return $root
    }

    render() {
        this.$el.append(this.getRoot())
        this.components.forEach(component => component.init())
    }

    destroy() {
        this.components.forEach(component => component.destroy())
    }
}