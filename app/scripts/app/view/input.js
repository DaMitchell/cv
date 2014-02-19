/* global define */
define([
    'jquery',
    'config',
    'events',
    'util/command-history',
    'view/prompt'
], function($, config, events, commandHistory, ConsolePrompt)
{
    'use strict';

    return function(consoleApi)
    {
        /**
         * @type {jQuery}
         */
        var inputElement;

        /**
         * @type {{enter: number, up: number, down: number}}
         */
        var keys = {
            enter: 13,
            up: 38,
            down: 40
        };

        var prompt = new ConsolePrompt(consoleApi);

        function onInputShow()
        {
            $(config.input).show().addClass('fade-in');
            inputElement.focus();

            /*inputElement.parent().css({
                paddingLeft: (inputElement.parent().find('#console-prompt').outerWidth() + 7) + 'px'
            });*/
        }

        function onInputHide()
        {
            $(config.input).hide();
        }

        function onConsoleInput(e)
        {
            var pastCommand;

            if (e.keyCode == keys.enter)
            {
                var inputValue = inputElement.val();
                var inputArguments = inputValue.split(' ');
                var inputCommand = inputArguments.shift();

                $(consoleApi).trigger(events.COMMAND_SUBMIT, {
                    prompt: prompt.getPromptText(),
                    command: inputCommand,
                    args: inputArguments
                });

                if(inputValue.length)
                {
                    commandHistory.addHistory(inputValue);
                }

                commandHistory.resetIndex();

                inputElement.val('');
            }
            else if(e.keyCode == keys.up)
            {
                pastCommand = commandHistory.getNextCommand();
                inputElement.val(pastCommand === undefined ? '' : pastCommand);
            }
            else if(e.keyCode == keys.down)
            {
                pastCommand = commandHistory.getPreviousCommand();
                inputElement.val(pastCommand === undefined ? '' : pastCommand);
            }
        }

        (function()
        {
            $(consoleApi).off(events.READY, onInputShow).on(events.READY, onInputShow);

            $(consoleApi).off(events.INPUT_SHOW, onInputShow).on(events.INPUT_SHOW, onInputShow);
            $(consoleApi).off(events.INPUT_HIDE, onInputHide).on(events.INPUT_HIDE, onInputHide);

            inputElement = $(config.input).find('input');
            inputElement.off('keydown', onConsoleInput).on('keydown', onConsoleInput);

            $(config.container).click(function()
            {
                inputElement.focus();
            });
        })();

        return {

        };
    };
});