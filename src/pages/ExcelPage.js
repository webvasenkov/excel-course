import {Page} from '@core/page/Page'
import {StateProcessor} from '@core/page/StateProcessor'
import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {createStore} from '@core/store/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {initialState} from '@/redux/initialState'
import {LocalStorageClient} from '@/shared/LocalStorageClient'

export class ExcelPage extends Page {
    constructor(param) {
        super(param)
        this.processor = new StateProcessor(
            new LocalStorageClient(this.param)
        )
        this.storeSub = null
    }

    async getRoot() {
        const state = await this.processor.get()
        const store = createStore(rootReducer, initialState(state))
        this.storeSub = store.subscribe(this.processor.listen)

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
        this.storeSub.unsubscribe()
    }
}