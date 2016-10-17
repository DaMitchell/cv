'use strict';

import EventDispatcher from 'event-dispatcher';
import Events from 'events';
import Tracking from 'core/tracking';

describe('Tracking', function() {
    var eventDispatcher, tracking;

    function ga(send, event, command, commandName, commandArgs) {
        expect(send).to.equal('send');
        expect(event).to.equal('event');
        expect(command).to.equal('command');
        expect(commandName).to.equal('test');
        expect(commandArgs).to.equal('arg1 arg2');
    }

    beforeEach(function() {
        eventDispatcher = new EventDispatcher($('<div>'));
        tracking = new Tracking(eventDispatcher);
    });

    it('ga is called when a command is submitted', function() {
        eventDispatcher.trigger(Events.COMMAND_SUBMIT, {
            command: 'test',
            args: ['arg1', 'arg2']
        });
    })
});
