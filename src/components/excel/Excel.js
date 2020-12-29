import {$} from '@core/DOM'
import {Observer} from '@core/Observer'
import {StoreSubscriber} from '@core/StoreSubscriber'
import {dateOpen} from '@/redux/actions'
import {preventDefault} from '@core/utils'

export class Excel {
    constructor(options) {
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

    init() {
        this.components.forEach(component => component.init())
        this.subscriber.storeSubscribe(this.components)
        this.store.dispatch(dateOpen())
        if (MODE_ON === 'production') {
            document.addEventListener('contextmenu', preventDefault)
        }
    }

    destroy() {
        this.components.forEach(component => component.destroy())
        this.subscriber.storeUnsubscribe()
        document.removeEventListener('contextmenu', preventDefault)
    }
}