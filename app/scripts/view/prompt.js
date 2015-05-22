'use strict';

/**
 * @param {jQuery} element
 * @constructor
 */
var Prompt = function(element) {
    this.element = element;
};

Prompt.prototype = {
    /**
     * @type {jQuery}
     */
    element: null,

    /**
     * @param {number|string} number
     * @param {number} size
     *
     * @returns {string}
     */
    zeroFill: function(number, size) {
        number = number.toString();

        while (number.length < size) {
            number = '0' + number;
        }

        return number;
    },

    updateTime: function() {
        var date = new Date();
        var time = this.zeroFill(date.getHours(), 2) + ':' + this.zeroFill(date.getMinutes(), 2) + ':' + this.zeroFill(date.getSeconds(), 2);

        this.element.find('.time').text(time);
    },

    /**
     * @returns {string}
     */
    getPromptText: function() {
        return $.trim(this.element.text());
    }
};

export default Prompt;
