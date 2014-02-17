/* global define */
define(['jquery', 'config', 'events'], function($, config, events)
{
    'use strict';

    return function(consoleApi)
    {
        /**
         * @type {jQuery}
         */
        var promptElement;

        /**
         * @param {number|string} number
         * @param {number} size
         * @returns {string}
         */
        function zeroFill(number, size)
        {
            number = number.toString();
            while (number.length < size) number = "0" + number;
            return number;
        }

        function updateTime()
        {
            var date = new Date();
            var time = zeroFill(date.getHours(), 2) + ':' + zeroFill(date.getMinutes(), 2) + ':' + zeroFill(date.getSeconds(), 2) ;

            promptElement.find('.time').text(time);
        }

        function getPromptText()
        {
            return promptElement.text();
        }

        (function()
        {
            promptElement = $(config.input).find('.prompt');

            $(consoleApi).on(events.COMMAND_SUBMIT, updateTime);
            $(consoleApi).on(events.READY, updateTime);
        })();

        return {
            getPromptText: getPromptText
        };
    };
});