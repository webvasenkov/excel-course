import {$} from '@core/DOM'
import {Observer} from '@core/Observer'
import {StoreSubscriber} from '@core/StoreSubscriber'

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector)
        this.components = options.components || []
        this.store = options.store
        this.observer = new Observer()
        this.subscriber = new StoreSubscriber(this.store)
    }

    getRoot() {
        const $root = $.create('div', 'excel')
        const componentOptions = {
            observer: this.observer,
            store: this.store
        }

        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className)
            const component = new Component($el, componentOptions)
            $el.html(component.toHTML())
            $root.append($el)
            return component
        })

        return $root
    }

    render() {
        this.$el.append(this.getRoot())
        this.components.forEach(component => component.init())
        this.subscriber.storeSubscribe(this.components)
    }

    destroy() {
        this.components.forEach(component => component.destroy())
        this.subscriber.storeUnsubscribe()
    }
}