
class EventDispatcher {
    /**
     * @param {Console} console
     */
    constructor(console) {
        this._console = $(console);
    }

    on(...args) {
        this._console.on(...args);
        return this;
    }

    off(...args) {
        this._console.off(...args);
        return this;
    }

    trigger(...args) {
        this._console.trigger(...args);
        return this;
    }
}

export default EventDispatcher;
