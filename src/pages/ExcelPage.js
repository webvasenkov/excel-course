import {Page} from '@core/Page'
import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {createStore} from '@core/store/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {storage, debounce} from '@core/utils'
import {initialState} from '@/redux/initialState'
import {ActiveRoute} from "@core/routes/ActiveRoute";

export class ExcelPage extends Page {
    getRoot() {
        const param = ActiveRoute.param
        const store = createStore(rootReducer, initialState(param))

        const debounceState = debounce(function stateListener(state) {
            storage(`excel:${param}`, state)
        }, 300)

        store.subscribe(debounceState)

        this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table], store
        })

        return this.excel.getRoot()
    }

    afterRender() {
        this.excel.init()
    }

    destroy() {
        this.excel.destroy()
    }
}