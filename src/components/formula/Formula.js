import {ExcelComponent} from "@core/ExcelComponent";
import {$} from '@core/DOM'

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...options
        })
    }

    toHTML() {
        return `
        <div class="excel__formula-info">fx</div>
        <div class="excel__formula-input" id="input-formula" contenteditable="true" spellcheck="false"></div>
        `
    }

    init() {
        super.init()
        this.inputFormula = this.$root.find('#input-formula')
        this.$on('table_input', $cell => this.inputFormula.text($cell.text()))
        this.$on('table_select', $cell => this.inputFormula.text($cell.text()))
    }

    onInput(event) {
        this.$dispatch('formula_input', $(event.target).text())
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab']

        if(keys.includes(event.key)) {
            event.preventDefault()
            this.$dispatch('formula_done')
        }
    }
}