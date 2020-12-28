import {ExcelStateComponent} from "@core/ExcelStateComponent";
import {createToolbar} from './toolbar.template'
import {defaultStyles} from '@/constants'
import {changeStyles} from '@/redux/actions'
import {$} from '@core/DOM'

export class Toolbar extends ExcelStateComponent {
    static className = 'excel__toolbar'

    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
            subscribers: ['currentStyles'],
            ...options
        })
    }

    prepare() {
        const saveStyles = this.store.getState().stylesState['0:0']
        this.initState(saveStyles || defaultStyles)
    }

    init() {
        super.init()
    }

    get template() {
        return createToolbar(this.state)
    }

    toHTML() {
        return this.template
    }

    onClick(event) {
        const $target = $(event.target)
        if($target.data.type === 'button') {
            const value = JSON.parse($target.data.value)
            this.$emmit('toolbar_style', value)
            this.$dispatch(changeStyles(value))
        }
    }

    storeChanged({currentStyles: styles}) {
        this.setState(styles)
    }

}