/*jshint camelcase: false */
'use strict';

import Events from 'events';
import Prompt from 'view/prompt';
import commandHistory from 'util/command-history';
//import transitionEvent from 'util/transition-event';

export default function(api) {

    var prompt = new Prompt(api);

    /**
     *
     * @type {jQuery}
     */
    var inputElement = $(api.config.input);

    /**
     * @type {jQuery}
     */
    var cursorElement = inputElement.find('.cursor');

    /**
     * @type {string}
     */
    var commandInput = '';//'test command';

    /**
     * @type {number}
     */
    var cursorPosition = commandInput.length;

    var listener = new window.keypress.Listener();

    /**
     * @type {{enter: number, up: number, down: number}}
     */
    var keys = {
        enter: 13,
        left: 37,
        up: 38,
        right: 39,
        down: 40
    };

    /**
     * Draw the input taking into account cursor position.
     */
    function drawInput() {
        var beforeElement = cursorElement.prev();
        var afterElement = cursorElement.next();

        if(cursorPosition === commandInput.length) {
            beforeElement.text(commandInput);
            cursorElement.html('&nbsp;');
            afterElement.text('');
        } else if(cursorPosition === 0) {
            beforeElement.text('');
            cursorElement.text(commandInput.slice(0, 1));
            afterElement.text(commandInput.slice(1));
        } else {
            beforeElement.text(commandInput.slice(0, cursorPosition));
            cursorElement.text(commandInput.slice(cursorPosition, cursorPosition + 1));

            if(cursorPosition === commandInput.length - 1) {
                afterElement.text('');
            } else {
                afterElement.text(commandInput.slice(cursorPosition + 1));
            }
        }
    }

    function updateCommand(string) {
        if (cursorPosition === commandInput.length) {
            commandInput += string;
        } else if (cursorPosition === 0) {
            commandInput = string + commandInput;
        } else {
            commandInput = commandInput.slice(0, cursorPosition) + string + commandInput.slice(cursorPosition);
        }

        cursorPosition += string.length;

        drawInput();
    }

    function fireCommand() {
        var inputArguments = commandInput.split(' ');
        var inputCommand = inputArguments.shift();

        $(api).trigger(Events.COMMAND_SUBMIT, {
            prompt: prompt.getPromptText(),
            command: inputCommand,
            args: inputArguments
        });

        if (commandInput.length) {
            commandHistory.addHistory(commandInput);
        }

        commandHistory.resetIndex();

        commandInput = '';
        cursorPosition = commandInput.length;

        drawInput();
    }

    function cursorMove(e) {
        var keyCode = e.which;

        if(keyCode === keys.left) {
            cursorPosition = (cursorPosition - 1) < 0 ? 0 : cursorPosition - 1;
        } else if(keyCode === keys.right) {
            cursorPosition = (cursorPosition + 1) > commandInput.length ? commandInput.length : cursorPosition + 1;
        }

        drawInput();
    }

    function backspace() {
        if (commandInput !== '' && cursorPosition > 0) {
            commandInput = commandInput.slice(0, cursorPosition - 1) + commandInput.slice(cursorPosition, commandInput.length);
            cursorPosition--;

            drawInput();
        }
    }

    function del() {
        if (commandInput !== '' && cursorPosition < commandInput.length) {
            commandInput = commandInput.slice(0, cursorPosition) + commandInput.slice(cursorPosition + 1, commandInput.length);

            drawInput();
        }
    }

    function paste() {
        var clipboard = inputElement.find('.clipboard-input');

        clipboard.focus();

        //wait until Browser insert text to textarea
        setTimeout(function() {
            updateCommand(clipboard.val());
            clipboard.blur().val('');
        }, 10);

        return true;
    }

    function start() {
        cursorPosition = 0;
        drawInput();
    }

    function end() {
        cursorPosition = commandInput.length;
        drawInput();
    }

    function onKeyPress(e) {
        if(!e.ctrlKey && !e.altKey && $.inArray(e.which, [91, 93]) < 0) {
            updateCommand(String.fromCharCode(e.which));
        }
    }

    function onReady() {
        inputElement.show().addClass('fade-in');
        enable();
        drawInput();
    }

    function enable() {
        cursorElement.addClass('enable');
        $(document).off('keypress', onKeyPress).on('keypress', onKeyPress);
        //$(document).off('keydown', onKeyDown).on('keydown', onKeyDown);
    }

    function disable() {
        //$(document).off('keydown', onKeyDown);
        $(document).off('keypress', onKeyPress);
        cursorElement.removeClass('enable');
    }

    listener.simple_combo('tab', function() {return false;});

    listener.simple_combo('enter', fireCommand);
    listener.simple_combo('left', cursorMove);
    listener.simple_combo('right', cursorMove);

    listener.simple_combo('backspace', backspace);
    listener.simple_combo('delete', del);

    listener.simple_combo('cmd v', paste);
    listener.simple_combo('ctrl v', paste);

    listener.simple_combo('cmd left', start);
    listener.simple_combo('ctrl left', start);

    listener.simple_combo('cmd right', end);
    listener.simple_combo('ctrl right', end);

    $(api).off(Events.READY, onReady).on(Events.READY, onReady);

    $(document).on('click.console', function(e) {
        if(!$(e.target).closest('#console').hasClass('console')) {
            disable();
        }
    });

    $(api.config.container).on('click', enable);
}
