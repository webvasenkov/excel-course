import {$} from "@core/DOM"

export function resizeHandler(event, $root) {
    return new Promise(resolve => {
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
            setCurrentCoords(type, $parent, value, $resizer, $root)

            resolve({
                is: type,
                id: $parent.data[type],
                value
            })

            document.onmousemove = null
            document.onmouseup = null
        }
    })
}

function getCurrentCoords(ev, type, coords, $resizer) {
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

function setCurrentCoords(type, $parent, value, $resizer, $root) {
    let side
    if (type === 'col') {
        $parent.css({width: value + 'px'})
        $root.findAll(`[data-col="${$parent.data.col}"]`)
            .forEach(col => $(col).css({width: value + 'px'}))
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