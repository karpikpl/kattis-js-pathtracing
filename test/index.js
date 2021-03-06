/*jshint esversion: 6, node: true*/
'use strict';

const Index = require('../index');
const assert = require('assert');

function testSolution(input) {

    const result = [];

    Index.init((ans) => result.push(ans), () => input.shift());
    Index.solution();

    return result.length == 1 && result[0] || result;
}

describe('Solution', function() {

    describe('program', function() {

        [
            {
                input: [
                    'down',
                    'down',
                    'left',
                    'left',
                    'up',
                    'up',
                    'up',
                    'left',
                    'left'
                ],
                result: [
                    '#######',
                    '#E**  #',
                    '#  * S#',
                    '#  * *#',
                    '#  ***#',
                    '#######'
                ]
            },
            {
                input: [
                    'down',
                    'down',
                    'left',
                    'left',
                    'up',
                    'up',
                    'left',
                    'left',
                    'up',
                    'right',
                    'right',
                    'right',
                    'down',
                    'down'
                ],
                result: [
                    '#######',
                    '#**** #',
                    '#****S#',
                    '#  *E*#',
                    '#  ***#',
                    '#######'
                ]
            },
            {
                input: ['up'],
                result: [
                    '###',
                    '#E#',
                    '#S#',
                    '###'
                ]
            },
            {
                input: ['down'],
                result: [
                    '###',
                    '#S#',
                    '#E#',
                    '###'
                ]
            },
            {
                input: ['left'],
                result: [
                    '####',
                    '#ES#',
                    '####'
                ]
            },
            {
                input: ['right'],
                result: [
                    '####',
                    '#SE#',
                    '####'
                ]
            },
            {
                input: ['left', 'left', 'left'],
                result: [
                    '######',
                    '#E**S#',
                    '######'
                ]
            }

        ].forEach((testCase) => {

            it('should solve for ' + testCase.input, function() {

                // Arrange
                const input = testCase.input;

                // Act
                const result = testSolution(input);

                // Assert
                assert.deepEqual(result, testCase.result);
            });

        })
    });
});
