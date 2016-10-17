'use strict';

import Console from 'console';

class Hierarchy {
    /**
     * @param {Console} parent
     */
    constructor(parent) {
        if(parent !== undefined) {
            this.setParent(parent);
        }

        this._children = [];
    }

    /**
     * @param {Console} child
     * @returns {Hierarchy}
     */
    addChild(child) {
        this._children.push(child);
        return this;
    }

    /**
     * @param {Console} child
     * @returns {Hierarchy}
     */
    removeChild(child) {
        var index = this._children.indexOf(child);

        if (index > -1) {
            this._children.splice(index, 1);
        }

        return this;
    }

    /**
     * @returns {Array}
     */
    getChildren() {
        return this._children;
    }

    /**
     * @returns {boolean}
     */
    hasChildren() {
        return !!this._children.length;
    }

    /**
     * @param {Console} parent
     * @returns {Hierarchy}
     */
    setParent(parent) {
        //TODO this looks like bullshit
        if(!(parent instanceof Console.default)) {
            throw new Error('parent must be an instance of Console');
        }

        this._parent = parent;
        return this;
    }

    /**
     * @returns {undefined|Console}
     */
    getParent() {
        return this._parent;
    }

    /**
     * @returns {boolean}
     */
    hasParent() {
        return !!this._parent;
    }
}

export default Hierarchy;
