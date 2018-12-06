#!/usr/bin/env node
const fs = require('fs')

const readFile = file => new Promise(resolve => fs.readFile(file, { encoding: 'utf8' }, (_, data) => resolve(data)))

async function main() {
    const input = await readFile('./input.txt').then(result => result.split('\n'))
    const expression = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/
    const hash = {}
    const ids = []
    for(let line of input) {
        const [ match, id, left, top, width, height ] = line.match(expression)
        ids.push(id)
        for(let y = +top, y_end = +top + +height; y < y_end; ++y) {
            for(let x = +left, x_end = +left + +width; x < x_end; ++x) {
                const key = `${ y }:${ x }`
                if(hash[key] === undefined) {
                    hash[key] = []
                }
                hash[key].push(id)
            }
        }
    }
    const collisions = Object.values(hash).filter(ids => ids.length > 1).reduce((accum, ids) => {
        for(let id of ids) if(!accum.has(id)) accum.add(id)
        return accum
    }, new Set())

    return ids.filter(id => !collisions.has(id))[0]
}

main().then(console.log)
