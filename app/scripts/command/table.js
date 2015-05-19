'use strict';

import Events from 'events';

export default function() {
    var api;

    function init(consoleApi) {
        api = consoleApi;
    }

    function getCommand() {
        return 'table';
    }

    function getDescription() {
        return 'A test for table';
    }

    function execute() {
        var lines = [
            '+--------------------------------+-------------------------------------+-------------------+',
            '| Name                           | Path                                | Requirements      |',
            '+--------------------------------+-------------------------------------+-------------------+',
            '| auth.login                     | /auth/login                         | _method => POST   |',
            '| auth.logout                    | /auth/logout                        | _method => GET    |',
            '| akuma.index                    | /akuma/                             | _method => GET    |',
            '| akuma.magazines.create         | /akuma/magazines                    | _method => POST   |',
            '| akuma.magazines.update         | /akuma/magazines/{magazine}         | _method => PUT    |',
            '| akuma.magazines.delete         | /akuma/magazines/{magazine}         | _method => DELETE |',
            '| akuma.magazines.get            | /akuma/magazines/{magazine}         | _method => GET    |',
            '| akuma.magazines.issues         | /akuma/magazines/{magazine}/issues  | _method => GET    |',
            '| akuma.issues.create            | /akuma/issues                       | _method => POST   |',
            '| akuma.issues.update            | /akuma/issues/{issue}               | _method => PUT    |',
            '| akuma.issues.delete            | /akuma/issues/{issue}               | _method => DELETE |',
            '| akuma.issues.get               | /akuma/issues/{issue}               | _method => GET    |',
            '| akuma.issues.articles.add      | /akuma/issues/{issue}/articles      | _method => POST   |',
            '| akuma.issues.articles.remove   | /akuma/issues/{issue}/articles      | _method => DELETE |',
            '| akuma.users.create             | /akuma/users                        | _method => POST   |',
            '| akuma.users.articles.index     | /akuma/users/{user}/articles        | _method => GET    |',
            '+--------------------------------+-------------------------------------+-------------------+'
        ];

        lines.map(function(line){
            $(api).trigger(Events.OUTPUT, {content: line, classes: ['table']});
        });
    }

    return {
        init: init,
        getCommand: getCommand,
        getDescription: getDescription,
        execute: execute
    };
}
