import Command from './command';
import Events from '../events';

class Skills extends Command {
    constructor() {
        super('skill');

        this._skills = {
            languages: [
                {content: '<span class="bold">PHP</span> - This would be the language I have spent most of my time using. Using a few frameworks, starting with Zend and then moving onto Symfony 2/3 and others based on it’s component’s such as Silex and Laravel.'},
                {},
                {content: '<span class="bold">Java</span> - The other goto language for mainly personal projects. Using such frameworks as Netty and Vert.x with a little bit of Spring Boot.'},
                {},
                {content: '<span class="bold">Javascript</span> - Have developed in raw javascript as well as JQuery. Over the past few years I have learnt other frameworks such as Ember, which I would prefer, and Angular.'},
                {},
                {content: '<span class="bold">C#</span> - Past work projects have required me to jump in work on .Net projects which were being developed on a CMS called Kentico.'},
                {},
                {content: 'Others would include HTML, CSS (including SASS/LESS), Ruby and Bash.'}
            ],
            databases: [

            ]
        };
    }

    getDescription() {
        return 'Information on what I can do.';
    }

    execute() {
        return $.getJSON('data/about.json')
            .then((data) => data.lines.forEach((line) => this._eventDispatcher.trigger(Events.OUTPUT, {
                content: line,
                classes: [
                    'white',
                    'fade-in'
                ]
            })))
            .fail(() => this._eventDispatcher.trigger(Events.COMMAND_ERROR,
                'There was an error getting fetching the about information.'));
    }
}

export default Skills;
