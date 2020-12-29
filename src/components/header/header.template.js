export function createHeader({tableName}) {
    return `
        <input class="excel__header-input" value="${tableName}" type="text"/>
        <div class="excel__header-nav">
            <div class="excel__header-btn" data-button="delete">
                <span class="material-icons" data-button="delete">delete_outline</span>
            </div>
            <div class="excel__header-btn" data-button="exit">
                <span class="material-icons" data-button="exit">exit_to_app</span>
            </div>
        `
}