/* eslint-env node */
/* eslint id-length: ["error", { "exceptions": ["h"] }] */
/* eslint object-curly-newline: "off" */
/* eslint object-property-newline: "off" */

(function () {
    'use strict';

    var path = require('path');
    var fs = require('fs');
    var h = require('hyperscript');
    var argv = require('yargs')
        .usage('Usage: $0 <command> [options]')
        .alias('f', 'file')
        .describe('f', 'Load a file')
        .demand(['f'])
        .default('f', path.join(process.cwd(), '../../faces/'))
        .help('h')
        .alias('h', 'help')
        .epilog('copyright 2016')
        .argv;

    var files = fs.readdirSync(argv.file);

    // sortedFiles[partName][emotionName][frameIndex] = frameReference
    var sortedFiles = {};

    files.forEach(function (file) {
        var matches = file.match(/^([a-z]+)-([a-z]+)-([0-9]+)\.svg$/);
        if (matches === null) {
            return;
        }

        var part = matches[1],
            emotion = matches[2],
            frame = parseFloat(matches[3]);

        if (sortedFiles[part] === undefined) {
            sortedFiles[part] = {};
        }

        if (sortedFiles[part][emotion] === undefined) {
            sortedFiles[part][emotion] = [];
        }

        sortedFiles[part][emotion][frame] = 'faces/' + file;
    });

    var html = h('div', {attrs: {id: 'face'}}, Object.keys(sortedFiles).map(function (part) {
        return h('div', {attrs: {'data-part': part}}, Object.keys(sortedFiles[part]).map(function (emotion) {
            return h('div', {attrs: {'data-emotion': emotion}}, sortedFiles[part][emotion].map(function (file, frame) {
                return h('img', {attrs: {'src': file, 'data-frame': frame}});
            }));
        }));
    }));

    var beautify = require('js-beautify').html;

    var htmlBeautified = beautify(html.outerHTML, {
        indent_size: 0,
        unformatted: []
    });

    console.log(htmlBeautified);
}());
