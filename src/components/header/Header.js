import {ExcelComponent} from '@core/ExcelComponent'

export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor($root) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click']
        })
    }

    toHTML() {
        return `
        <input class="excel__header-input" value="Новая таблица" type="text"/>
        <div class="excel__header-nav">
            <div class="excel__header-btn">
                <span class="material-icons">delete_outline</span>
            </div>
            <div class="excel__header-btn">
                <span class="material-icons">exit_to_app</span>
            </div>
        `
    }

    onInput(event) {
        console.log('Header input: ', event.target.value)
        console.log(this.$root);
    }

    onClick(event) {
        console.log(event)
    }
}