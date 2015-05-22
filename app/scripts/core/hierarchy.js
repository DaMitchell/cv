'use strict';

/**
 * @constructor
 */
var Hierarchy = function() {
    this.parent = null;
    this.children = [];
};

Hierarchy.prototype = {
    parent: null,

    /**
     * @type {Array}
     */
    children: [],

    /**
     * @param child
     * @returns {Hierarchy}
     */
    addChild: function(child) {
        this.children.push(child);
        return this;
    },

    /**
     * @param child
     * @returns {Hierarchy}
     */
    removeChild: function(child) {
        var index = _.indexOf(this.children, child);

        if(index > -1) {
            this.children.splice(index, 1);
        }

        return this;
    },

    /**
     * @returns {Array}
     */
    getChildren: function() {
        return this.children;
    },

    /**
     * @returns {boolean}
     */
    hasChildren: function() {
        return !!this.children.length;
    },

    /**
     * @param parent
     * @returns {Hierarchy}
     */
    setParent: function(parent) {
        this.parent = parent;
        return this;
    },

    /**
     * @returns {null|*}
     */
    getParent: function() {
        return this.parent;
    },

    /**
     * @returns {boolean}
     */
    hasParent: function() {
        return !!this.parent;
    }
};

export default Hierarchy;
