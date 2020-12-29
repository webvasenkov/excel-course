import {ActiveRoute} from './ActiveRoute'
import {$} from '@core/DOM'

export class Router {
    constructor(selector, routes) {
        if (!selector) throw new Error('Router not find provider')
        this.$placeholder = $(selector)
        this.routes = routes
        this.page = null
        this.changePageHandler = this.changePageHandler.bind(this)
        this.init()
    }

    init() {
        this.changePageHandler()
        window.addEventListener('hashchange', this.changePageHandler)

    }

    changePageHandler() {
        if (this.page) {
            this.page.destroy()
        }


        this.$placeholder.clear()
        const Page = ActiveRoute.path.includes('excel')
            ? this.routes.excel
            : this.routes.dashboard

        this.page = new Page()

        this.$placeholder.append(this.page.getRoot())
        this.page.afterRender()
    }

    destroy() {
        window.removeEventListener('hashchange', this.changePageHandler)
    }
}