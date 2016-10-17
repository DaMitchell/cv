/* global $, describe, it, expect */
'use strict';

import Events from 'events';
import Output from 'view/output';
import runLoop from 'run-loop';

describe('Views - Output', function() {
    var parent, output;

    beforeEach(function() {
        parent = $('<div>');

        output = new Output();
        output.parent = parent;

        parent.append(output.element);
    });

    it('is accessible', function() {
        expect(Output).to.be.a('function');
    });

    describe('addOutputLine', function() {
        it('will add line with default class "line"', function() {
            var line = 'text line to be rendered';

            runLoop.run(() => output.addOutputLine(line));

            expect(parent.find('.line:eq(0)').text()).to.equal(line);
        });
    });

    describe('addOutputLine - allows multiple lines', function() {
        it('will add line with default class "line"', function() {
            var line = 'text line to be rendered';

            runLoop.run(() => {
                output.addOutputLine(line);
                output.addOutputLine(line);
            });

            expect(parent.find('.line').length).to.equal(2);
        });
    });

    describe('events', function() {
        beforeEach(function() {
            output.eventDispatcher = parent;
        });

        it('onCommandSubmit', function() {
            runLoop.run(() => parent.trigger(Events.COMMAND_SUBMIT, {
                prompt: 'prompt>',
                command: 'test',
                args: ['arg1', 'arg2']
            }));

            var expected = 'prompt> test arg1 arg2';

            expect(parent.find('.line:eq(0)').text()).to.equal(expected);
        });

        it('onCommandNotFound', function() {
            runLoop.run(() => parent.trigger(Events.COMMAND_NOT_FOUND, {command: 'test'}));

            var expected = 'The command "test" could not be found.';

            expect(parent.find('.line:eq(0)').text()).to.equal(expected);
        });

        it('onCommandError', function() {
            var errorMsg = 'test error msg';
            runLoop.run(() => parent.trigger(Events.COMMAND_ERROR, errorMsg));

            var line = parent.find('.line:eq(0)');

            expect(line.text()).to.equal(errorMsg);
            expect(line.hasClass('red')).to.equal(true);
            expect(line.hasClass('line')).to.equal(true);
        });

        it('onOutput', function() {
            var content = 'test content';
            runLoop.run(() => parent.trigger(Events.OUTPUT, {content: content}));

            expect(parent.find('.line:eq(0)').text()).to.equal(content);
        });

        it('onOutput - with classes', function() {
            var content = 'test content';
            runLoop.run(() => parent.trigger(Events.OUTPUT, {
                content: content,
                classes: ['blue', 'test']
            }));

            var line = parent.find('.line:eq(0)');

            expect(line.text()).to.equal(content);
            expect(line.hasClass('line')).to.equal(true);
            expect(line.hasClass('blue')).to.equal(true);
            expect(line.hasClass('test')).to.equal(true);
        });

        it('onOutputClear', function() {
            runLoop.run(() => output.addOutputLine('test line'));
            expect(parent.find('.line').length).to.equal(1);

            runLoop.run(() => parent.trigger(Events.OUTPUT_CLEAR));
            expect(parent.find('.line').length).to.equal(0);
        });
    });
});
