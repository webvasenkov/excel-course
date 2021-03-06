export class TableSelection {
    static className = 'excel__table-cell_selected'

    constructor() {
        this.group = []
        this.current = null
    }

    select($el) {
        this.clear()
        this.group.push($el)
        $el.focus().addClass(TableSelection.className)
        this.current = $el
    }

    clear() {
        this.group.forEach($el => $el.removeClass(TableSelection.className))
        this.group = []
    }

    selectGroup($group = []) {
        this.clear()
        this.group = $group
        this.group.forEach($el => $el.addClass(TableSelection.className))
    }

    applyStyle(style) {
        this.group && this.group.forEach($el => $el.css(style))
    }

    ids() {
        return this.group.map($el => $el.id())
    }
}