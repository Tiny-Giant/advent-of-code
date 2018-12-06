#!/usr/bin/env node
const fs = require('fs')

const readFile = file => new Promise(resolve => fs.readFile(file, { encoding: 'utf8' }, (_, data) => resolve(data)))

async function main() {
    const input = await readFile('./input.txt').then(result => result.split('\n'))
    let duplicates = 0
    let triplicates = 0
    for(let line of input) {
        const hash = Array.from(line)
                          .sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0))
                          .reduce((hash, char) => ((hash[char] = (hash[char] || 0) + 1), hash), Object.create(null))
        let duplicate = false,
            triplicate = false
        for(let key in hash) {
            if(hash[key] === 2) duplicate = true
            if(hash[key] === 3) triplicate = true
        }
        if(duplicate) ++duplicates
        if(triplicate) ++triplicates
    }
    return duplicates * triplicates
}

main().then(console.log)
