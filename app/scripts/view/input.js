'use strict';

import Events from 'events';
import Prompt from 'view/prompt';
import commandHistory from 'util/command-history';

/**
 * @param {Object} api
 */
export default function(api) {
    /**
     * @type {jQuery}
     */
    var inputElement = $(api.config.input).find('input');

    /**
     * @type {{enter: number, up: number, down: number}}
     */
    var keys = {
        enter: 13,
        up: 38,
        down: 40
    };

    var prompt = new Prompt(api);

    function onInputShow() {
        $(api.config.input).show().addClass('fade-in');
        inputElement.focus();
    }

    function onInputHide() {
        $(api.config.input).hide();
    }

    function onConsoleKeyDown(e) {
        var pastCommand;

        if (e.keyCode === keys.enter) {
            var inputValue = inputElement.val();
            var inputArguments = inputValue.split(' ');
            var inputCommand = inputArguments.shift();

            $(api).trigger(Events.COMMAND_SUBMIT, {
                prompt: prompt.getPromptText(),
                command: inputCommand,
                args: inputArguments
            });

            if (inputValue.length) {
                commandHistory.addHistory(inputValue);
            }

            commandHistory.resetIndex();

            inputElement.val('');
        }
        else if (e.keyCode === keys.up) {
            pastCommand = commandHistory.getNextCommand();
            inputElement.val(pastCommand === undefined ? '' : pastCommand);
        }
        else if (e.keyCode === keys.down) {
            pastCommand = commandHistory.getPreviousCommand();
            inputElement.val(pastCommand === undefined ? '' : pastCommand);
        }
    }

    function onConsoleKeyUp() {
        inputElement[0].selectionStart = inputElement[0].selectionEnd = inputElement[0].value.length;
    }

    $(api).off(Events.READY, onInputShow).on(Events.READY, onInputShow);

    $(api).off(Events.INPUT_SHOW, onInputShow).on(Events.INPUT_SHOW, onInputShow);
    $(api).off(Events.INPUT_HIDE, onInputHide).on(Events.INPUT_HIDE, onInputHide);

    inputElement.off('keydown', onConsoleKeyDown).on('keydown', onConsoleKeyDown);
    inputElement.off('keyup', onConsoleKeyUp).on('keyup', onConsoleKeyUp);

    $(api.config.container).click(function() {
        inputElement.focus();
    });

    return {};
}
