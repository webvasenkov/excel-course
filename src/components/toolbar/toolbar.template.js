function button(button) {
    const value = JSON.stringify(button.value)
    const meta =
        `data-type="button"
         data-value='${value}'
        `
    return `
        <div class="excel__toolbar-btn ${button.active ? 'excel__toolbar-btn_active' : ''}" ${meta}>
            <span class="material-icons" ${meta}>
                ${button.icon}
            </span>
        </div>
    `
}

export function createToolbar(state) {
    const buttons = [
        {
            icon: 'format_align_left',
            active: state['textAlign'] === 'left',
            value: {textAlign: 'left'}
        },
        {
            icon: 'format_align_center',
            active: state['textAlign'] === 'center',
            value: {textAlign: 'center'}
        },
        {
            icon: 'format_align_right',
            active: state['textAlign'] === 'right',
            value: {textAlign: 'right'}
        },
        {
            icon: 'format_bold',
            active: state['fontWeight'] === 'bold',
            value: {fontWeight: state['fontWeight'] === 'normal' ? 'bold' : 'normal'}
        },
        {
            icon: 'format_italic',
            active: state['fontStyle'] === 'italic',
            value: {fontStyle: state['fontStyle'] === 'normal' ? 'italic' : 'normal'}
        },
        {
            icon: 'format_underline',
            active: state['textDecoration'] === 'underline',
            value: {textDecoration: state['textDecoration'] === 'none' ? 'underline' : 'none'}
        }
    ]
    return buttons.map(button).join('')
}