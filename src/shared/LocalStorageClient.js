import {storage, storageKey} from "@core/utils";

export class LocalStorageClient {
    constructor(param) {
        this.param = param
        this.key = storageKey(this.param)
    }

    save(state) {
        storage(this.key, state)
        return Promise.resolve()
    }

    get() {
        return storage(this.key)
    }
}