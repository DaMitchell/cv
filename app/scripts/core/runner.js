'use strict';

import Events from 'events';

export default function(api) {
    function execute(event, data) {
        if(data.command.length) {
            var command = _.find(api.commands, function(command) {
                if (typeof(command.getCommand) !== 'function') {
                    return false;
                }

                return command.getCommand() === $.trim(data.command);
            });

            if(!command || typeof(command.execute) !== 'function') {
                $(api).trigger(Events.COMMAND_NOT_FOUND, data);
            } else {
                command.execute(data.args);
            }
        }

        $(api).trigger(Events.COMMAND_COMPLETE);
    }

    $(api).off(Events.COMMAND_SUBMIT, execute).on(Events.COMMAND_SUBMIT, execute);

    return {
        execute: execute
    };
}
