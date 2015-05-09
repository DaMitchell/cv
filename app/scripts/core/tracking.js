'use strict';

import Events from 'events';

export default function(api) {
    function onCommandSubmit(event, data) {
        if (typeof(ga) === 'function') {
            ga('send', 'event', 'command', data.command, data.args.join(' '));
        }
    }

    $(api).off(Events.COMMAND_SUBMIT, onCommandSubmit).on(Events.COMMAND_SUBMIT, onCommandSubmit);
}
