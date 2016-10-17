'use strict';

class BaseView {
    constructor() {
        this._parent = null;
    }

    set parent(parent) {
        this._parent = parent;
    }

    get parent() {
        return this._parent;
    }

    set eventDispatcher(eventDispatcher) {
        throw new Error('Extending views needs to override this to listen to events');
    }
}

export default BaseView;
