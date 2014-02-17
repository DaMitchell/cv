/* global define */
define(['jquery', 'config', 'events'], function($, config, events)
{
    'use strict';

    return function(consoleApi)
    {
        /**
         * @type {jQuery}
         */
        var outputElement;

        /**
         * @type {jQuery}
         */
        var contentElement;

        function addOutputLine(text, classes)
        {
            var lineClasses = ['line'];

            if(classes !== undefined && $.isArray(classes))
            {
                lineClasses = lineClasses.concat(classes);
            }

            var line = $('<div>').addClass(lineClasses.join(' ')).html(text);
            outputElement.append(line);

            contentElement.scrollTop(contentElement[0].scrollHeight);
        }

        function onCommandSubmit(e, data)
        {
            addOutputLine(data.prompt + ' ' + data.command + ' ' + data.args.join(' '));
        }

        function onOutput(e, data)
        {
            addOutputLine(data.content, data.classes);
        }

        (function()
        {
            outputElement = $(config.output);
            contentElement = $(config.container).find('.console-content');

            $(consoleApi).on(events.COMMAND_SUBMIT, onCommandSubmit);
            $(consoleApi).on(events.OUTPUT, onOutput)
        })();

        return {
            addOutputLine: addOutputLine
        };
    };
});