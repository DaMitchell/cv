'use strict';

import Events from 'events';

export default function(api) {
    function execute(event, data) {
        var result;

        if (data.command.length) {
            var command = _.find(api.commands, function(command) {
                if (typeof(command.getCommand) !== 'function') {
                    return false;
                }

                return command.getCommand() === $.trim(data.command);
            });

            if (!command || typeof(command.execute) !== 'function') {
                $(api).trigger(Events.COMMAND_NOT_FOUND, data);
            } else {
                result = command.execute(data.args);
            }
        }

        var done = function() {
            $(api).trigger(Events.COMMAND_COMPLETE);
        };

        if (result && result.done) {
            result.done(done);
        } else {
            done();
        }
    }

    $(api).off(Events.COMMAND_SUBMIT, execute).on(Events.COMMAND_SUBMIT, execute);

    return {
        execute: execute
    };
}
