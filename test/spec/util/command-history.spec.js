'use strict';

import CommandHistory from 'util/command-history';

describe('Command History', function() {
    var commandHistory;

    beforeEach(function() {
        commandHistory = new CommandHistory();
    });

    it('get previous command', function() {
        commandHistory.addHistory('command1');
        commandHistory.addHistory('command2');
        commandHistory.resetIndex();

        expect(commandHistory.getPreviousCommand()).to.equal(undefined);
    });

    it('get next command', function() {
        commandHistory.addHistory('command1');
        commandHistory.addHistory('command2');
        commandHistory.resetIndex();

        expect(commandHistory.getNextCommand()).to.equal('command2');
    });

    it('get next command twice', function() {
        commandHistory.addHistory('command1');
        commandHistory.addHistory('command2');
        commandHistory.resetIndex();

        expect(commandHistory.getNextCommand()).to.equal('command2');
        expect(commandHistory.getNextCommand()).to.equal('command1');
    });


    it('get next command 3 times', function() {
        commandHistory.addHistory('command1');
        commandHistory.addHistory('command2');
        commandHistory.resetIndex();

        expect(commandHistory.getNextCommand()).to.equal('command2');
        expect(commandHistory.getNextCommand()).to.equal('command1');
        expect(commandHistory.getNextCommand()).to.equal('command1');
    });

    it('get next command then previous command', function() {
        commandHistory.addHistory('command1');
        commandHistory.addHistory('command2');
        commandHistory.resetIndex();

        expect(commandHistory.getNextCommand()).to.equal('command2');
        expect(commandHistory.getPreviousCommand()).to.equal(undefined);
    });
});
