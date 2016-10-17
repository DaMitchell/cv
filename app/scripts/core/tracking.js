/* global ga */
'use strict';

import Events from '../events';

class Tracking {
    constructor(eventDispatcher) {
        eventDispatcher
            .off(Events.COMMAND_SUBMIT, this.onCommandSubmit)
            .on(Events.COMMAND_SUBMIT, this.onCommandSubmit);
    }

    onCommandSubmit(event, data) {
        if (typeof(ga) === 'function') {
            ga('send', 'event', 'command', data.command, data.args.join(' '));
        }
    }
}

export default Tracking;
