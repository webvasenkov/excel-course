class DOM {
    constructor(selector) {
        this.$el = typeof selector === 'string' ?
            document.querySelector(selector) :
            selector
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html
            return this
        }
        return this.$el.outerHTML.trim()
    }

    text(text) {
        if (typeof text !== 'undefined') {
            this.$el.textContent = text
            return this
        }
        if (this.$el.tagName.toLowerCase() === 'input') {
            return this.$el.value.trim()
        }
        return this.$el.textContent.trim()
    }

    setAttr(name, value) {
        return this.$el.setAttribute(name, value)
    }

    getAttr(name) {
        return this.$el.getAttribute(name) || ''
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

    hasChild() {
        return this.$el.hasChildNodes
    }

    children(node) {
        if(node) {
            return $(this.children()[0])
        }

        return Array.from(this.$el.childNodes)
    }

    remove(child) {
        debugger
        if(child instanceof DOM) {
           child = child.$el
        }

        return this.$el.removeChild(child)
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

    getStyles(styles) {
        return styles.reduce((res, key) => {
            res[key] = this.$el.style[key]
            return res
        }, {})
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector)
    }

    find(selector) {
        return $(this.$el.querySelector(selector))
    }

    get coords() {
        return this.$el.getBoundingClientRect()
    }

    get data() {
        return this.$el.dataset
    }

    addClass(className) {
        this.$el.classList.add(className)
        return this
    }

    removeClass(className) {
        this.$el.classList.remove(className)
        return this
    }

    id(parse) {
        if (parse) {
            const parse = this.id().split(":")
            return {
                row: +parse[0],
                col: +parse[1],
            }
        }
        return this.$el.dataset.id
    }

    focus() {
        this.$el.focus()
        return this
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