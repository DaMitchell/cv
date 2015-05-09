'use strict';

import Events from 'events';

export default function(api) {
    /**
     * @type {jQuery}
     */
    var outputElement = $(api.config.output);

    /**
     * @type {jQuery}
     */
    var contentElement = $(api.config.container).find('.console-content');

    function addOutputLine(text, classes) {
        var lineClasses = ['line'];

        if (classes !== undefined && $.isArray(classes)) {
            lineClasses = lineClasses.concat(classes);
        }

        var line = $('<div>').addClass(lineClasses.join(' ')).html(linkify(text));

        outputElement.append(line);

        contentElement.scrollTop(contentElement[0].scrollHeight);
    }

    function onCommandSubmit(e, data) {
        addOutputLine(data.prompt + ' ' + data.command + ' ' + data.args.join(' '));
    }

    function onCommandNotFound(e, data) {
        addOutputLine('The command "' + data.command + '" could not be found.');
    }

    function onCommandError(e, message) {
        addOutputLine(message, ['red']);
    }

    function onOutput(e, data) {
        addOutputLine(data.content, data.classes);
    }

    function onOutputClear() {
        outputElement.find('.line').remove();
    }

    function linkify(string) {
        if (string === undefined) {
            return '';
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

    $(api).on(Events.COMMAND_NOT_FOUND, onCommandNotFound);
    $(api).on(Events.COMMAND_ERROR, onCommandError);
    $(api).on(Events.COMMAND_SUBMIT, onCommandSubmit);
    $(api).on(Events.OUTPUT_CLEAR, onOutputClear);
    $(api).on(Events.OUTPUT, onOutput);

    for (var i = 0, length = api.config.initOutput.length; i < length; i++) {
        addOutputLine(api.config.initOutput[i], ['fade-in']);
    }

    return {
        addOutputLine: addOutputLine
    };
}
