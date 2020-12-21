import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from '@/components/table/table.template'
import {shouldResize, isCell, matrix, targetSelector} from '@/components/table/table.functions'
import {resizeHandler} from '@/components/table/table.resize'
import {TableSelection} from '@/components/table/TableSelection'
import {$} from '@core/DOM'

class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        });
    }

    toHTML() {
        return createTable(5)
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()
        const $cell = this.$root.find('[data-id="0:0"]')
        this.selectCell($cell)
        this.$on('formula_input', text => this.selection.current.text(text))
        this.$on('formula_done', () => this.selection.current.focus())
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler.call(this, event)
        } else if (isCell(event)) {
            const $target = $(event.target)
            if (event.shiftKey) {
                const $cells = matrix(this.selection.current, $target)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                this.selectCell($target)
            }
        }
    }

    onKeydown(event) {
        const keys = [
            'Enter',
            'Tab',
            'ArrowRight',
            'ArrowLeft',
            'ArrowUp',
            'ArrowDown'
        ]

        if (keys.includes(event.key) && !event.shiftKey) {
            event.preventDefault()
            const id = this.selection.current.id(true)
            const $target = this.$root.find(targetSelector(event.key, id))
            this.selectCell($target)
        }
    }

    onInput() {
        this.$dispatch('table_input', this.selection.current)
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$dispatch('table_select', this.selection.current)
    }
}

export {Table}