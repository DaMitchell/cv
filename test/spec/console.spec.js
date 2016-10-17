/* global $, describe, it, expect */
'use strict';

import Console from 'console';
import Views from 'views';
import EventDispatcher from 'event-dispatcher';
import Hierarchy from 'core/hierarchy';
import Input from 'view/input';

describe('Console', () => {
    it('is accessible', () => {
        Console.should.be.a('function');
    });

    it('has the api', () => {
        var console = new Console();

        expect(console.addCommands).to.be.a('function');
        expect(console.addCommand).to.be.a('function');
        expect(console.start).to.be.a('function');

        expect(Console.create).to.be.a('function');
    });

    it('keeps reference of container', () => {
        var container = $('console');
        var console = new Console(container);

        expect(console.container).to.equal(container);
    });

    it('merges passed options', () => {
        var options = {test: 'hello'};
        var console = new Console($('.console'), options);

        expect(console.options.test).to.equal('hello');
    });

    it('has properties set', () => {
        var console = new Console();

        expect(console.commands).to.be.a('array');
        expect(console.views).to.be.an.instanceof(Views);
        expect(console.eventDispatcher).to.be.an.instanceof(EventDispatcher);
        expect(console.hierarchy).to.be.an.instanceof(Hierarchy);
    });

    describe('Commands', () => {
        class TestCommand {
            constructor(name) {
                this.name = name || 'test';
            }

            execute() {

            }
        }

        it('can add multiple commands', () => {
            var commands = [
                new TestCommand('test1'),
                new TestCommand('test2')
            ];
            var con = new Console();

            con.addCommands(commands);

            expect(con.commands.length).to.equal(2);
        });

        it('can add a command', () => {
            var console = new Console();
            console.addCommand(new TestCommand());

            expect(console.commands.length).to.equal(1);
        });
    });

    describe('Views', () => {
        it('passed in views are included', () => {
            var views = [ new Input() ];
            var con = new Console($('.console'), {views: views});

            con.views.forEach((view) => expect(views.indexOf(view) >= 0).to.be.true);
        });
    });

    describe('Hierarchy', () => {
        it('parent is passed to hierarchy', () => {
            var parent = new Console();
            var console = new Console($('.console'), {}, parent);

            expect(console.hierarchy.getParent()).to.equal(parent);
        });
    });
});
