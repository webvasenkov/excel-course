export function createHeader({tableName}) {
    return `
        <input class="excel__header-input" value="${tableName}" type="text"/>
        <div class="excel__header-nav">
            <div class="excel__header-btn">
                <span class="material-icons">delete_outline</span>
            </div>
            <div class="excel__header-btn">
                <span class="material-icons">exit_to_app</span>
            </div>
        `
}