import {$} from "@core/DOM";

export function capitalize(str) {
    if (typeof str !== 'string') {
        return ''
    }
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export function getCurrentCoords(ev, type, coords, $resizer) {
    if (type === 'col') {
        const delta = ev.pageX - coords.right
        $resizer.css({right: -delta + 'px'})
        return coords.width + delta
    } else {
        const delta = ev.pageY - coords.bottom
        $resizer.css({bottom: -delta + 'px'})
        return coords.height + delta
    }
}

export function setCurrentCoords (type, $parent, value, $resizer) {
    let side
    if (type === 'col') {
        $parent.css({width: value + 'px'})
        this.$root.findAll(`[data-cell="${$parent.data.col}"]`)
            .forEach(cell => $(cell).css({width: value + 'px'}))
        side = 'right'
    } else {
        $parent.css({height: value + 'px'})
        side = 'bottom'
    }

    $resizer.css({
        opacity: 0,
        [side]: '-2px'
    })
}