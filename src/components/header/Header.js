import {ExcelComponent} from '@core/ExcelComponent'
import {changeName} from '@/redux/actions'
import {createHeader} from '@/components/header/header.template'
import {$} from '@core/DOM'

export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
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

    toHTML() {
        const state = this.store.getState()
        return createHeader(state)
    }
}