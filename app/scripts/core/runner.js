'use strict';

import Events from 'events';

export default function(api) {
    function execute(event, data) {
        var i, length, command;

        for (i = 0, length = api.commands.length; length > i; i++) {
            command = api.commands[i];

            if (typeof(command.getCommand) !== 'function' && typeof(command.execute) !== 'function') {
                continue;
            }

            if (command.getCommand() === $.trim(data.command)) {
                command.execute(data.args, api.views.output);
                return;
            }
        }

        if (data.command.length) {
            $(api).trigger(Events.COMMAND_NOT_FOUND, data);
        }
    }

    $(api).off(Events.COMMAND_SUBMIT, execute).on(Events.COMMAND_SUBMIT, execute);

    return {
        execute: execute
    };
}
