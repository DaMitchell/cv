/* global define */
define(['jquery'], function($)
{
    /**
     * @type {Array}
     */
    var history = [];

    /**
     * @type {Number}
     */
    var currentIndex = 0;

    function resetIndex()
    {
        //currentIndex = -1;
        currentIndex = history.length;
        return this;
    }

    function addHistory(command)
    {
        history.push(command);
        return this;
    }

    function getNextCommand()
    {
        if((currentIndex - 1) < 0)
        {
            return history[currentIndex];
        }

        currentIndex--;
        return history[currentIndex];
    }

    function getPreviousCommand()
    {
        currentIndex++;
        return history[currentIndex];
    }

    return {
        resetIndex: resetIndex,
        addHistory: addHistory,
        getNextCommand: getNextCommand,
        getPreviousCommand: getPreviousCommand
    };
});