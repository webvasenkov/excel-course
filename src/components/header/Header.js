import {ExcelComponent} from '@core/ExcelComponent'
import {changeName} from '@/redux/actions'
import {createHeader} from '@/components/header/header.template'
import {ActiveRoute} from '@core/routes/ActiveRoute'
import {$} from '@core/DOM'

export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
            ...options
        })
    }

    init() {
        super.init();
    }

    onInput(event) {
        const $target = $(event.target)
        const name = $target.text()
        this.$dispatch(changeName(name))
    }

    onClick(event) {
        const $target = $(event.target)
        if ($target.data.button === 'delete') {
            const sure = confirm('Are you sure you want to delete the table?')
            if (sure) {
                localStorage.removeItem(`excel:${ActiveRoute.param}`)
                ActiveRoute.navigate('#dashboard')
            }
        } else if ($target.data.button === 'exit') {
            ActiveRoute.navigate('#dashboard')
        }
    }

    toHTML() {
        const state = this.store.getState()
        return createHeader(state)
    }
}