#!/usr/bin/env node
const fs = require('fs')

const readFile = file => new Promise(resolve => fs.readFile(file, { encoding: 'utf8' }, (_, data) => resolve(data)))

async function main() {
    const input = await readFile('./input.txt').then(result => result.split('\n'))
    for(let current_line_index = input.length - 1; current_line_index; --current_line_index) {
        const current_line = input[current_line_index]
        for(let compare_line_index = current_line_index - 1; compare_line_index > -1; --compare_line_index) {
            const compare_line = input[compare_line_index]
            const different = []
            for(let char_index = current_line.length - 1; char_index > -1; --char_index) {
                if(current_line[char_index] !== compare_line[char_index]) different.push(char_index)
                if(different.length > 1) break
            }
            if(different.length === 1) {
                return current_line.substring(0, different[0]) + current_line.substring(different[0] + 1)
            }
        }
    }
    return null
}

main().then(console.log)
