export class Observer {
    constructor() {
        this.subscribes = {}
    }

    dispatch(name, ...data) {
        if (!Array.isArray(this.subscribes[name])) {
           return false
        }

        this.subscribes[name].forEach(sub => sub(...data))
    }

    subscribe(name, fn) {
        this.subscribes[name] = this.subscribes[name] || []
        this.subscribes[name].push(fn)

        return () => {
            this.subscribes[name] = this.subscribes[name].filter(sub => sub !== fn)
        }
    }
}

