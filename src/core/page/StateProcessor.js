import {debounce} from "@core/utils";

export class StateProcessor {
    constructor(client, wait = 300) {
        this.client = client
        this.wait = wait
        this.listen = debounce(this.listen.bind(this), this.wait)
    }

    listen(state) {
        this.client.save(state)
    }

    get() {
        const state = this.client.get()
        return new Promise(resolve => {
            setTimeout(() => resolve(state), 2500)
        })
    }
}