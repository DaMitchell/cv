/* global define */
define(['../events'], function(events)
{
    'use strict';

    return function(consoleApi)
    {
        function onCommandSubmit(event, data)
        {
            if(typeof(ga) === 'function')
            {
                ga('send', 'event', 'command', data.command, data.args.join(' '));
            }
        }

        (function()
        {
            $(consoleApi).off(events.COMMAND_SUBMIT, onCommandSubmit).on(events.COMMAND_SUBMIT, onCommandSubmit);
        })();
    };
});