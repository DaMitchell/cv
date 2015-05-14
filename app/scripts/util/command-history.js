'use strict';

/**
 * @type {string[]}
 */
var historyArray = [];

/**
 * @type {Number}
 */
var currentIndex = 0;

function resetIndex() {
    currentIndex = historyArray.length;
}

function addHistory(command) {
    historyArray.push(command);
}

function getNextCommand() {
    if ((currentIndex - 1) < 0) {
        return historyArray[currentIndex];
    }

    currentIndex--;
    return historyArray[currentIndex];
}

function getPreviousCommand() {
    currentIndex++;
    return historyArray[currentIndex];
}

export default {
    resetIndex: resetIndex,
    addHistory: addHistory,
    getNextCommand: getNextCommand,
    getPreviousCommand: getPreviousCommand
};
