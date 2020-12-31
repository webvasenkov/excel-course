import {storage} from '@core/utils'

function toHTML(key) {
    const model = storage(key)
    const path = key.replace(/:/, '/')
    const date = new Date(model.dateOpen).toLocaleDateString()

    return `
        <li class="dashboard__list-item">
            <a class="dashboard__list-link" href="#${path}">
                <h4 class="dashboard__list-title">${model.tableName}</h4>
                <span class="dashboard__list-date">${date}</span>
            </a>
        </li>
    `
}

function getAllKeys() {
    const keys = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (!key.includes('excel')) {
            continue;
        }
        keys.push(key)
    }

    return keys
}

export function createDashboardTables() {
    const keys = getAllKeys()

    if (!keys.length) {
        return `
            <span class="dashboard__table-empty">Create your first table</span>
        `
    }

    return `
    <div class="dashboard__table">
        <div class="dashboard__view">
            <div class="dashboard__table-header">
                <h4 class="dashboard__table-title">Name</h4>
                <span class="dashboard__table-date">Created</span>
            </div>
            <ul class="dashboard__list">
                ${keys.map(toHTML).join('')}
            </ul>
        </div>
    </div>
    `
}