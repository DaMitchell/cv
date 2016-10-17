'use strict';

import Command from './command';
import Events from '../events';

class About extends Command {
    constructor() {
        super('about');
    }

    getDescription() {
        return 'Information on what this is all about.';
    }

    execute() {
        $.getJSON('data/about.json')
            .done((data) => {
                data.lines.forEach((line) => {
                    this._eventDispatcher.trigger(Events.OUTPUT, {
                        content: line,
                        classes: [
                            'white',
                            'fade-in'
                        ]
                    });
                });
            })
            .fail(() => this._eventDispatcher.trigger(Events.COMMAND_ERROR,
                'There was an error getting fetching the about information.'));
    }
}

export default About;
