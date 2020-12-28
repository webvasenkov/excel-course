import {ExcelComponent} from "@core/ExcelComponent";
import {$} from '@core/DOM'

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            subscribers: ['currentText'],
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
        this.$formula = this.$root.find('#input-formula')
        this.$on('cell_select', $cell => {
                this.$formula.text($cell.data.value)
        })
    }

    onInput(event) {
        const text = $(event.target).text()
        this.$emmit('formula_input', text)
    }

    storeChanged({currentText}) {
        this.$formula.text(currentText)
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab']

        if(keys.includes(event.key)) {
            event.preventDefault()
            this.$emmit('formula_done')
        }
    }
}