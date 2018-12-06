#!/usr/bin/env node
const fs = require('fs')

const readFile = file => new Promise(resolve => fs.readFile(file, { encoding: 'utf8' }, (_, data) => resolve(data)))

async function main() {
    const input = await readFile('./input.txt').then(result => result.split('\n'))
    const expression = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/
    const hash = {}
    const collisions = {}
    for(let line of input) {
        const [ match, id, left, top, width, height ] = line.match(expression)
        for(let y = +top, y_end = +top + +height; y < y_end; ++y) {
            for(let x = +left, x_end = +left + +width; x < x_end; ++x) {
                const key = `${ y }:${ x }`
                if(hash[key] === undefined) {
                    hash[key] = true
                } else if(collisions[key] === undefined) {
                    collisions[key] = true
                }
            }
        }
    }
    return Object.keys(collisions).length
}

main().then(console.log)
