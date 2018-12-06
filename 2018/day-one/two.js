#!/usr/bin/env node
const fs = require('fs')

const readFile = file => new Promise(resolve => fs.readFile(file, { encoding: 'utf8' }, (_, data) => resolve(data)))

async function main() {
    const input = await readFile('./input.txt').then(result => result.split('\n'))
    const hash = new Set()
    let duplicate = null
    let accum = 0
    let index = -1
    while(duplicate === null) {
        const key = ++index % input.length
        if(typeof input[key] === "string") input[key] = parseInt(input[key])
        accum += input[key]
        if(hash.has(accum)) duplicate = accum
        else hash.add(accum)
    }
    return duplicate
}

main().then(console.log)
