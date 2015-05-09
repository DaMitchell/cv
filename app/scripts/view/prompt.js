'use strict';

import Events from 'events';

/**
 * @param {Object} api
 */
export default function(api) {
    /**
     * @type {jQuery}
     */
    var promptElement = $(api.config.input).find('.prompt');

    /**
     * @param {number|string} number
     * @param {number} size
     * @returns {string}
     */
    function zeroFill(number, size) {
        number = number.toString();

        while (number.length < size) {
            number = '0' + number;
        }

        return number;
    }

    function updateTime() {
        var date = new Date();
        var time = zeroFill(date.getHours(), 2) + ':' + zeroFill(date.getMinutes(), 2) + ':' + zeroFill(date.getSeconds(), 2);

        promptElement.find('.time').text(time);
    }

    /**
     * @returns {string}
     */
    function getPromptText() {
        return promptElement.text();
    }

    $(api).on(Events.COMMAND_SUBMIT, updateTime);
    $(api).on(Events.READY, updateTime);

    return {
        getPromptText: getPromptText
    };
}
