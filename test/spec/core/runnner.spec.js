/* global $, describe, it, expect */
'use strict';

import EventDispatcher from 'event-dispatcher';
import Events from 'events';
import Runner from 'core/runner';

describe('Runner', function() {
        var commands, eventDispatcher, runner;

    beforeEach(function() {
        commands = [];
        eventDispatcher = new EventDispatcher($('<div>'));
        runner = new Runner(commands, eventDispatcher);
    });

    it('calling execute with no command only triggers command complete', function() {
        var completeCalled = false;
        eventDispatcher.on(Events.COMMAND_COMPLETE, () => completeCalled = true);

        runner.execute();

        expect(completeCalled).to.equal(true);
    });

    it('calling execute with empty command only triggers command complete', function() {
        var completeCalled = false;
        eventDispatcher.on(Events.COMMAND_COMPLETE, () => completeCalled = true);

        runner.execute({}, {command: ''});

        expect(completeCalled).to.equal(true);
    });

    it('triggering command complete with no command only triggers command complete', function() {
        var completeCalled = false;

        eventDispatcher.on(Events.COMMAND_COMPLETE, () => completeCalled = true);
        eventDispatcher.trigger(Events.COMMAND_SUBMIT);

        expect(completeCalled).to.equal(true);
    });

    it('triggering command complete with empty command only triggers command complete', function() {
        var completeCalled = false;
        var notFoundCalled = false;

        eventDispatcher.on(Events.COMMAND_COMPLETE, () => completeCalled = true);
        eventDispatcher.on(Events.COMMAND_NOT_FOUND, () => notFoundCalled = true);
        eventDispatcher.trigger(Events.COMMAND_SUBMIT, {command: ''});

        expect(completeCalled).to.equal(true);
        expect(notFoundCalled).to.equal(false);
    });

    it('pass unknown command will trigger command not found', function() {
        var completeCalled = false;
        var notFoundCalled = false;

        eventDispatcher.on(Events.COMMAND_COMPLETE, () => completeCalled = true);
        eventDispatcher.on(Events.COMMAND_NOT_FOUND, () => notFoundCalled = true);

        eventDispatcher.trigger(Events.COMMAND_SUBMIT, {command: 'random'});

        expect(completeCalled).to.equal(true);
        expect(notFoundCalled).to.equal(true);
    });

    it('a known command is called, no arguments', function() {
        var executeCalled = false;
        var completeCalled = false;
        var notFoundCalled = false;

        var TestCommand = function() {
            return {
                getCommand: () => 'test',
                execute: () => executeCalled = true
            };
        };

        commands.push(new TestCommand());

        eventDispatcher.on(Events.COMMAND_COMPLETE, () => completeCalled = true);
        eventDispatcher.on(Events.COMMAND_NOT_FOUND, () => notFoundCalled = true);

        eventDispatcher.trigger(Events.COMMAND_SUBMIT, {command: 'test'});

        expect(completeCalled).to.equal(true);
        expect(notFoundCalled).to.equal(false);
        expect(executeCalled).to.equal(true);
    });

    it('a known command is called with arguments', function() {
        var executeCalled = false;
        var completeCalled = false;
        var notFoundCalled = false;
        var calledArgs = [];

        var args = ['test', 'hello'];

        var TestCommand = function() {
            return {
                getCommand: () => 'test',
                execute: (args) => {
                    executeCalled = true;
                    calledArgs = args;
                }
            };
        };

        commands.push(new TestCommand());

        eventDispatcher.on(Events.COMMAND_COMPLETE, () => completeCalled = true);
        eventDispatcher.on(Events.COMMAND_NOT_FOUND, () => notFoundCalled = true);

        eventDispatcher.trigger(Events.COMMAND_SUBMIT, {command: 'test', args: args});

        expect(completeCalled).to.equal(true);
        expect(notFoundCalled).to.equal(false);
        expect(executeCalled).to.equal(true);
        expect(calledArgs).to.equal(args);
    });

    it('a known command returning a promise will trigger command complete', function() {
        var executeCalled = false;
        var completeCalled = false;
        var notFoundCalled = false;

        var TestCommand = function() {
            return {
                getCommand: () => 'test',
                execute: () => {
                    var deferred = $.Deferred();

                    executeCalled = true;
                    deferred.resolve();

                    return deferred.promise();
                }
            };
        };

        commands.push(new TestCommand());

        eventDispatcher.on(Events.COMMAND_COMPLETE, () => completeCalled = true);
        eventDispatcher.on(Events.COMMAND_NOT_FOUND, () => notFoundCalled = true);

        eventDispatcher.trigger(Events.COMMAND_SUBMIT, {command: 'test'});

        expect(completeCalled).to.equal(true);
        expect(notFoundCalled).to.equal(false);
        expect(executeCalled).to.equal(true);
    });
});
