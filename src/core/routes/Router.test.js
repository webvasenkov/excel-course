import {Router} from './Router.js'
import {Page} from '../page/Page.js'

class ExcelPage extends Page {
    getRoot() {
        const $root = document.createElement('h1')
        $root.innerHTML = 'excel'
        return $root
    }
}

class DashboardPage extends Page {
    getRoot() {
        const $root = document.createElement('h1')
        $root.innerHTML = 'dashboard'
        return $root
    }
}


describe('Router', () => {
    let router
    let $app

    beforeEach(() => {
        $app = document.createElement('div')
        router = new Router($app, {
            excel: ExcelPage,
            dashboard: DashboardPage,
        })
    })

    test('should be defined', () => {
        expect(router).toBeDefined()
    })

    test('should be default dashboard', () => {
        router.init()
        expect($app.innerHTML).toBe('<h1>dashboard</h1>')
    })

    test('should be excel if hash is equal excel', () => {
        window.location.hash = '#excel'
        router.changePageHandler()
        expect($app.innerHTML).toBe('<h1>excel</h1>')
    })
})