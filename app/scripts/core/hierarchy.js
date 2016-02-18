'use strict';

class Hierarchy {

    /**
     * @param {Console} parent
     */
    constructor(parent) {
        this.parent = parent;
        this.children = [];
    }

    /**
     * @param {Console} child
     * @returns {Hierarchy}
     */
    addChild(child) {
        this.children.push(child);
        return this;
    }

    /**
     * @param {Console} child
     * @returns {Hierarchy}
     */
    removeChild(child) {
        var index = _.indexOf(this.children, child);

        if (index > -1) {
            this.children.splice(index, 1);
        }

        return this;
    }

    /**
     * @returns {Array}
     */
    getChildren() {
        return this.children;
    }

    /**
     * @returns {boolean}
     */
    hasChildren() {
        return !!this.children.length;
    }

    /**
     * @param {Console} parent
     * @returns {Hierarchy}
     */
    setParent(parent) {
        this.parent = parent;
        return this;
    }

    /**
     * @returns {null|Console}
     */
    getParent() {
        return this.parent;
    }

    /**
     * @returns {boolean}
     */
    hasParent() {
        return !!this.parent;
    }
}

export default Hierarchy;
