import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from '@/components/table/table.template'
import {shouldResize} from '@/components/table/table.utils'
import {resizeHandler} from '@/components/table/table.resize'


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
        if (shouldResize(event)) {
            resizeHandler.call(this, event)
        }
    }
}

export {Table}