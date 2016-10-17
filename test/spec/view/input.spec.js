/* global $, describe, it, expect */
'use strict';

import Events from 'events';
import Input from 'view/input';
import runLoop from 'run-loop';

describe('Views - Input', function() {
    var parent, input;

    function testCursorContent(beforeCursor, cursor, afterCursor) {
        expect(input.element.find('.before-cursor').text()).to.equal(beforeCursor || '');
        expect(input.element.find('.cursor').html()).to.equal(cursor || '&nbsp;');
        expect(input.element.find('.after-cursor').text()).to.equal(afterCursor || '');
    }

    beforeEach(function() {
        parent = $('<div>');

        input = new Input();
        input.parent = parent;

        parent.append(input.element);
    });

    it('is accessible', function() {
        expect(Input).to.be.a('function');
    });

    describe('updateCommand', function() {
        it('calling updateCommand will add in the character', function() {
            runLoop.run(() => input.updateCommand('a'));
            expect(input.element.find('.before-cursor').text()).to.equal('a');
        });

        it('calling multiple times will add correctly', function() {
            var string = 'hello';

            runLoop.run(() => string.split('').map((item) => input.updateCommand(item)));

            expect(input.element.find('.before-cursor').text()).to.equal(string);
        });
    });

    describe('commandHistory', function() {
        beforeEach(function() {
            input.eventDispatcher = parent;

            runLoop.run(() => {
                'first'.split('').map((item) => input.updateCommand(item));
                input.fireCommand();
                'second'.split('').map((item) => input.updateCommand(item));
                input.fireCommand()
            });
        });

        it('calling up will display correct command', function() {
            testCursorContent();
            runLoop.run(() => input.commandHistory({which: 38}));
            testCursorContent('second');
            runLoop.run(() => input.commandHistory({which: 38}));
            testCursorContent('first');
        });

        it('calling down will display correct command', function() {
            testCursorContent();
            runLoop.run(() => {
                input.commandHistory({which: 38});
                input.commandHistory({which: 38});
            });
            testCursorContent('first');
            runLoop.run(() => input.commandHistory({which: 40}));
            testCursorContent('second');
            runLoop.run(() => input.commandHistory({which: 40}));
            testCursorContent();
        });
    });

    describe('moveCursor', function() {
        it('moving cursor position renders correctly', function() {
            runLoop.run(() => 'hello'.split('').map((item) => input.updateCommand(item)));

            testCursorContent('hello', '&nbsp;', '');
            runLoop.run(() => input.moveCursor({which: 37}));
            testCursorContent('hell', 'o', '');
            runLoop.run(() => input.moveCursor({which: 37}));
            testCursorContent('hel', 'l', 'o');
            runLoop.run(() => input.moveCursor({which: 37}));
            testCursorContent('he', 'l', 'lo');
            runLoop.run(() => input.moveCursor({which: 39}));
            testCursorContent('hel', 'l', 'o');
            runLoop.run(() => input.moveCursor({which: 39}));
            testCursorContent('hell', 'o', '');
            runLoop.run(() => input.moveCursor({which: 39}));
            testCursorContent('hello', '&nbsp;', '');
        });

        it('cursor will only be move with either left or right button', function() {
            runLoop.run(() => 'hello'.split('').map((item) => input.updateCommand(item)));

            testCursorContent('hello');
            runLoop.run(() => input.moveCursor({which: 38})); //up
            testCursorContent('hello');
            runLoop.run(() => input.moveCursor({which: 40})); //down
            testCursorContent('hello');
            runLoop.run(() => input.moveCursor({which: 64})); //'a'
            testCursorContent('hello');
        });
    });

    describe('backspace', function() {
        it('calling backspace will remove the correct character, from the end of command', function() {
            runLoop.run(() => 'hello'.split('').map((item) => input.updateCommand(item)));

            testCursorContent('hello');
            runLoop.run(() => input.backspace());
            testCursorContent('hell');
            runLoop.run(() => input.backspace());
            testCursorContent('hel');
        });

        it('calling backspace will remove the correct character, after moving cursor left', function() {
            runLoop.run(() => 'hello'.split('').map((item) => input.updateCommand(item)));

            testCursorContent('hello');
            runLoop.run(() => {
                input.moveCursor({which: 37});
                input.moveCursor({which: 37});
                input.backspace();
            });
            testCursorContent('he', 'l', 'o');
            runLoop.run(() => input.backspace());
            testCursorContent('h', 'l', 'o');
        });
    });

    describe('del', function() {
        it('calling del will remove the correct character, from the beginning of command', function() {
            var commandArray = 'hello'.split('');

            runLoop.run(() => {
                commandArray.forEach((item) => input.updateCommand(item));
                commandArray.forEach((item) => input.moveCursor({which: 37}));
            });

            testCursorContent('', 'h', 'ello');
            runLoop.run(() => input.del());
            testCursorContent('', 'e', 'llo');
            runLoop.run(() => input.del());
            testCursorContent('', 'l', 'lo');
        });
    });

    describe('start', function() {
        it('will move to the start of the command', function() {
            runLoop.run(() => {
                'hello'.split('').map((item) => input.updateCommand(item));
                input.start();
            });

            testCursorContent('', 'h', 'ello');
        });

        it('will move to the start after calling left/right', function() {
            runLoop.run(() => {
                'hello'.split('').map((item) => input.updateCommand(item));

                input.moveCursor({which: 37});
                input.moveCursor({which: 37});
                input.start();
            });

            testCursorContent('', 'h', 'ello');

            runLoop.run(() => {
                input.moveCursor({which: 39});
                input.moveCursor({which: 39});
            });

            testCursorContent('he', 'l', 'lo');
            runLoop.run(() => input.start());
            testCursorContent('', 'h', 'ello');
        });
    });

    describe('end', function() {
        it('will move to the end of the command', function() {
            var commandArray = 'hello'.split('');

            runLoop.run(() => {
                commandArray.forEach((item) => input.updateCommand(item));
                commandArray.forEach(() => input.moveCursor({which: 37}));
            });

            testCursorContent('', 'h', 'ello');

            runLoop.run(() => input.end());

            testCursorContent('hello');
        });
    });

    describe('fireCommand', function() {
        it('firing command passes correct data on event', function() {
            input.eventDispatcher = parent;

            parent.on(Events.COMMAND_SUBMIT, (e, data) => {
                expect(data.prompt).to.equal($.trim(input.element.find('.prompt').text()));
                expect(data.command).to.equal('hello');
            });

            'hello'.split('').map((item) => input.updateCommand(item));

            input.fireCommand();
        });
    });

    describe('Keypress events', function() {
        it('adds letter "a"', function() {
            runLoop.run(() => {
                input.onReady(null, {});
                $(document).trigger($.Event('keypress', {which: 'a'.charCodeAt(0)}));
            });

            expect(input.element.find('.before-cursor').text()).to.equal('a');
        });
    });
});
