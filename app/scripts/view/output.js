'use strict';

import Events from 'events';
import linkify from 'util/linkify';

export default function(api) {
    /**
     * @type {jQuery}
     */
    var outputElement = $(api.config.container).find(api.config.outputSelector);

    /**
     * @type {jQuery}
     */
    var contentElement = $(api.config.container).find('.console-content');

    var nanoConfig = {
        paneClass : 'console-pane',
        sliderClass : 'console-slider',
        contentClass : 'console-content'
    };

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

    function updateNanoScroller() {
        $(api.config.container).nanoScroller(nanoConfig);
    }

    function onOutput(e, data) {
        addOutputLine(data.content, data.classes);
    }

    function onOutputClear() {
        outputElement.find('.line').remove();
    }

    $(api).on(Events.COMMAND_NOT_FOUND, onCommandNotFound);
    $(api).on(Events.COMMAND_ERROR, onCommandError);
    $(api).on(Events.COMMAND_SUBMIT, onCommandSubmit);
    $(api).on(Events.COMMAND_COMPLETE, updateNanoScroller);
    $(api).on(Events.OUTPUT_CLEAR, onOutputClear);
    $(api).on(Events.OUTPUT, onOutput);

    $(api).on(Events.READY, updateNanoScroller);

    for (var i = 0, length = api.config.initOutput.length; i < length; i++) {
        addOutputLine(api.config.initOutput[i], ['fade-in']);
    }

    //$(api.container).nanoScroller(nanoConfig);

    return {
        addOutputLine: addOutputLine
    };
}
