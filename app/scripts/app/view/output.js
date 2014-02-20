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

            var line = $('<div>').addClass(lineClasses.join(' ')).html(linkify(text));

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

        function linkify(string)
        {
            if(string === undefined)
            {
                return "";
            }

            // http://, https://, ftp://
            var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;

            // www. sans http:// or https://
            var pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;

            // Email addresses
            var emailAddressPattern = /\w+@[a-zA-Z_]+?(?:\.[a-zA-Z]{2,6})+/gim;

            return string
                .replace(urlPattern, '<a href="$&" target="_blank">$&</a>')
                .replace(pseudoUrlPattern, '$1<a href="http://$2" target="_blank">$2</a>')
                .replace(emailAddressPattern, '<a href="mailto:$&">$&</a>');
        }

        (function()
        {
            outputElement = $(config.output);
            contentElement = $(config.container).find('.console-content');

            $(consoleApi).on(events.COMMAND_SUBMIT, onCommandSubmit);
            $(consoleApi).on(events.OUTPUT, onOutput)

            for(var i = 0, length = config.initOutput.length; i < length; i++)
            {
                addOutputLine(config.initOutput[i], ['fade-in']);
            }
        })();

        return {
            addOutputLine: addOutputLine
        };
    };
});