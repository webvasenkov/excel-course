import {Page} from '@core/page/Page'
import {createDashboardTables} from '@/shared/dashboard.function'
import {$} from '@core/DOM'

export class DashboardPage extends Page {
    constructor(param) {
        super(param)
    }

    getRoot() {
    return $.create('div', 'dashboard').html(`
    <div class="dashboard__header">
        <h1 class="dashboard__header-title">Pure JS <span>&</span> Excel</h1>
    </div>

    <div class="dashboard__new">
        <div class="dashboard__view">
            <a class="dashboard__create" href="#excel/${this.param}">New table
                <span class="material-icons">post_add</span>
            </a>
        </div>
    </div>
    
    ${createDashboardTables()}
    `
    )}
}