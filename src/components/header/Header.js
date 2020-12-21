import {ExcelComponent} from '@core/ExcelComponent'

export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            ...options
        })
    }

    init() {
        super.init();
    }

    toHTML() {
        return `
        <input class="excel__header-input" value="Название таблицы" type="text"/>
        <div class="excel__header-nav">
            <div class="excel__header-btn">
                <span class="material-icons">delete_outline</span>
            </div>
            <div class="excel__header-btn">
                <span class="material-icons">exit_to_app</span>
            </div>
        `
    }
}