'use strict';

/**
 * @param {jQuery} api
 */
export default function(promptElement) {
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
        return $.trim(promptElement.text());
    }

    return {
        updateTime: updateTime,
        getPromptText: getPromptText
    };
}
