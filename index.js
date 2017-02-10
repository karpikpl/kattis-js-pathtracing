/*jshint esversion: 6, node: true*/
'use strict';

// put your solution in this method
function solution(toPrint, toRead) {

    const moves = [];

    const borders = {
        'up': 0,
        'down': 0,
        'left': 0,
        'right': 0
    }

    const position = {
        x: 0,
        y: 0
    };

    let input;
    while (input = readline()) {
        moves.push(input);

        switch (input) {
            case 'up':
                position.y++;
                borders[input] = Math.max(borders[input], position.y);
                break;
            case 'down':
                position.y--;
                borders[input] = Math.min(borders[input], position.y);
                break;
            case 'left':
                position.x--;
                borders[input] = Math.min(borders[input], position.x);
                break;
            case 'right':
                position.x++;
                borders[input] = Math.max(borders[input], position.x);
                break;
        }
    }

    log(`Parsed input: ${moves}`);
    log(`position: ${JSON.stringify(position)}`);
    log(`borders: ${JSON.stringify(borders)}`);

    // build map
    const map = [];

    // start row
    // const startRow = [];
    // for (let i = 0; i < Math.abs(borders.left); i++) {
    //   startRow.push(' ');
    // }
    // startRow.push('S');
    // for (let i = 0; i < borders.right; i++) {
    //   startRow.push(' ');
    // }
    // log(startRow);

    const emptyRow = [];
    for (var i = 0; i < Math.abs(borders.left) + borders.right + 1; i++) {
        emptyRow.push(' ');
    }

    position.y = 0;
    position.x = Math.abs(borders.left);
    map.push(emptyRow.slice());
    map[position.y][position.x] = 'S';

    for (var i = 0; i < borders.up; i++) {
        position.y++;
        map.unshift(emptyRow.slice());
    }
    for (var i = 0; i < Math.abs(borders.down); i++) {
        map.push(emptyRow.slice());
    }

    log(`is S on position: ${JSON.stringify(position)}? ${map[position.y][position.x] === 'S'}`);

    moves.forEach(m => {
        switch (m) {
            case 'up':
                position.y--;
                break;
            case 'down':
                position.y++;
                break;
            case 'left':
                position.x--;
                break;
            case 'right':
                position.x++;
                break;
        }

        map[position.y][position.x] = '*';
    });
    map[position.y][position.x] = 'E';

    const border = emptyRow.slice();
    border.forEach((c,i) => border[i] = '#');
    border.push('#');
    border.push('#');

    map.forEach(row => {row.unshift('#'); row.push('#')});
    map.unshift(border);
    map.push(border);

    log(map);

    map.forEach(row => print(row.join('')));
}

// run solution without any params for kattis
if (typeof process === 'undefined' || process.release.name !== 'node') {

    solution();
}

// node js internals below -----------------------------------------------------

function init(toPrint, toRead) {

    // replace global functions with ones for node or tests
    // kattis is using 'print' and 'readline' for standard I/O
    if (typeof global !== 'undefined') {
        global.print = toPrint;
        global.readline = toRead;
    }
}

// interactive mode - input from command line
if (typeof process !== 'undefined' && process.argv[2] === 'i') {

    const Readline = require('readline');
    const input = [];

    const inputProcessor = Readline.createInterface({input: process.stdin, output: process.stdout});

    inputProcessor.on('line', (line) => {

        input.push(line);

        if (!line) {
            inputProcessor.close();
        }
    });

    inputProcessor.on('close', () => {

        init(console.log, () => input.shift());

        solution();
    });
}

// input from process params
if (typeof process !== 'undefined' && process.argv[2] && process.argv[2] !== 'i') {

    const input = process.argv[2].split('\n');
    init(console.log, () => input.shift());

    solution();
}

function log() {

    if (typeof process !== 'undefined' && process.release.name === 'node') {
        console.log.call(this, ...arguments);
    }
}

if (typeof module !== 'undefined') {
    module.exports.solution = solution;
    module.exports.init = init;
}
