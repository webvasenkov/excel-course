class DOM {
    constructor(selector) {
        this.$el = typeof selector === 'string' ?
            document.querySelector(selector) :
            selector
    }

    html(html) {
        if(typeof html === 'string') {
            this.$el.innerHTML = html
            return this
        }
        return this.$el.outerHTML.trim()

    }

    clear() {
        this.html('')
        return this
    }

    append(node) {
        if (node instanceof DOM) {
            node = node.$el
        }

        if (Element.prototype.append) {
            this.$el.append(node)
        } else {
            this.$el.appendChild(node)
        }

        return this
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback)
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback)
    }

    closest(selector) {
        return $(this.$el.closest(selector))
    }

    css(styles) {
        if (Object.keys(styles).length) {
            Object
                .keys(styles)
                .forEach(key => this.$el.style[key] = styles[key])
        }
        return this
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector)
    }

    get coords() {
        return this.$el.getBoundingClientRect()
    }

    get data() {
        return this.$el.dataset
    }
}

export function $(selector) {
    return new DOM(selector)
}

$.create = (tagName, className = '') => {
    const el = document.createElement(tagName)
    if (className) {
        el.classList.add(className)
    }

    return $(el)
}

