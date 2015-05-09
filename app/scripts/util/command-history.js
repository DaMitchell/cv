'use strict';

/**
 * @type {string[]}
 */
var histtoryArray = [];

/**
 * @type {Number}
 */
var currentIndex = 0;

function resetIndex() {
    currentIndex = histtoryArray.length;
}

function addHistory(command) {
    histtoryArray.push(command);
}

function getNextCommand() {
    if ((currentIndex - 1) < 0) {
        return histtoryArray[currentIndex];
    }

    currentIndex--;
    return histtoryArray[currentIndex];
}

function getPreviousCommand() {
    currentIndex++;
    return histtoryArray[currentIndex];
}

export default {
    resetIndex: resetIndex,
    addHistory: addHistory,
    getNextCommand: getNextCommand,
    getPreviousCommand: getPreviousCommand
};
