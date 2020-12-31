export class Page {
    constructor(param) {
        this.param = param || Date.now()
    }

    getRoot() {
        throw new Error('Route is not defined')
    }

    afterRender() {

    }

    destroy() {

    }
}