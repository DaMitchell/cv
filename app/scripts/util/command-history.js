'use strict';

var CommandHistory = function() {
    /**
     * @type {string[]}
     */
    this.historyArray = [];

    /**
     * @type {Number}
     */
    this.currentIndex = 0;
};

CommandHistory.prototype = {
    resetIndex: function() {
        this.currentIndex = this.historyArray.length;
    },

    addHistory: function(command) {
        this.historyArray.push(command);
    },

    getNextCommand: function() {
        if ((this.currentIndex - 1) < 0) {
            return this.historyArray[this.currentIndex];
        }

        this.currentIndex--;

        return this.historyArray[this.currentIndex];
    },

    getPreviousCommand: function() {
        this.currentIndex++;
        return this.historyArray[this.currentIndex];
    }
};

export default CommandHistory;
