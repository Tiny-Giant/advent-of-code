#!/usr/bin/env node
const fs = require('fs')

const readFile = file => new Promise(resolve => fs.readFile(file, { encoding: 'utf8' }, (_, data) => resolve(data)))

async function main() {
    const input = await readFile('./input.txt').then(result => result.split('\n'))
    let accum = 0
    let index = -1
    while(++index < input.length) {
        accum += parseInt(input[index])
    }
    return accum
}

main().then(console.log)
