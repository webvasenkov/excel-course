import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from '@/components/table/table.template'
import {shouldResize, isCell, matrix, targetSelector} from '@/components/table/table.functions'
import {resizeHandler} from '@/components/table/table.resize'
import {TableSelection} from '@/components/table/TableSelection'
import {tableResize, tableData, changeStyles, applyStyle} from '@/redux/actions'
import {defaultStyles} from '@/constants'
import {parse} from '@core/parse'
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
        return createTable(15, this.store.getState)
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()
        this.selectCell(this.$root.find('[data-id="0:0"]'))

        this.$on('formula_done', () => {
            this.selection.current.focus()
        })

        this.$on('formula_input', value => {
            this.updateTextInStore(value)
            this.selection.current.setAttr('data-value', value)
            const currentText = this.selection.current.getAttr('data-value')
            this.selection.current.text(parse(currentText))
        })

        this.$on('toolbar_style', style => {
            this.selection.applyStyle(style)
            this.$dispatch(applyStyle({
                ids: this.selection.ids(),
                value: style
            }))
        })
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(event, this.$root)
                .then(data => this.$dispatch(tableResize(data)))
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

    onInput(event) {
        const $target = $(event.target)
        this.updateTextInStore($target.text())
        $target.setAttr('data-value', $target.text())
    }

    selectCell($cell) {
        const prevCell = this.selection.current || $cell
        const currentText = prevCell.getAttr('data-value')
        prevCell.text(parse(currentText))
        this.selection.select($cell)
        $cell.text($cell.data.value)
        this.$emmit('cell_select', $cell)
        this.updateStyles($cell)
    }

    updateStyles($cell) {
        const styles = $cell.getStyles(Object.keys(defaultStyles))
        this.$dispatch(changeStyles(styles))
    }

    updateTextInStore(value) {
        return this.$dispatch(tableData({
            id: this.selection.current.id(),
            value
        }))
    }
}

export {Table}