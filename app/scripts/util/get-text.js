'use strict';

import Events from '../events';

export default function getText(eventDispatcher, file) {
    return $.getJSON(file)
        .then((data) => {
            data.lines.push({content:" "});
            data.lines.forEach((line) => eventDispatcher.trigger(Events.OUTPUT, line));
        })
        .fail(() => eventDispatcher.trigger(Events.COMMAND_ERROR,
            'There was an error getting fetching the about information.'));
}
