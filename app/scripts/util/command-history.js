'use strict';

class CommandHistory {
    constructor() {
        /**
         * @type {string[]}
         */
        this.historyArray = [];

        /**
         * @type {Number}
         */
        this.currentIndex = 0;
    }

    resetIndex() {
        this.currentIndex = this.historyArray.length;
    }

    addHistory(command) {
        this.historyArray.push(command);
    }

    getNextCommand() {
        if ((this.currentIndex - 1) < 0) {
            return this.historyArray[this.currentIndex];
        }

        this.currentIndex--;

        return this.historyArray[this.currentIndex];
    }

    getPreviousCommand() {
        this.currentIndex++;
        return this.historyArray[this.currentIndex];
    }
}

export default CommandHistory;
