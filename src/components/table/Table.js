import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from '@/components/table/table.template'
import {getCurrentCoords, setCurrentCoords} from '@core/utils'
import {$} from '@core/DOM'

class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown']
        });
    }

    toHTML() {
        return createTable(5)
    }

    onMousedown(event) {
        if (event.target.dataset.resize) {
            const $resizer = $(event.target)
            const $parent = $resizer.closest('[data-type="resizable"]')
            const type = $resizer.data.resize
            const coords = $parent.coords

            type === 'col'
                ? $resizer.$el.classList.add('excel__table-col-resize_selected')
                : $resizer.$el.classList.add('excel__table-row-resize_selected')

            $resizer.css({opacity: 1})
            let value

            document.onmousemove = (ev) => {
                value = getCurrentCoords(ev, type, coords, $resizer)
            }

            document.onmouseup = () => {
                setCurrentCoords.call(this, type, $parent, value, $resizer)
                document.onmousemove = null
                document.onmouseup = null
            }
        }
    }
}

export {Table}