
import fs from 'fs';
import { exit } from 'process';
import { lex, LexError, okayProve, parse, ParseError, visualizeProof } from 'okay-prove';

export function main(filename: string, options: any) {
    // Open file and read contents
    let contents;

    try {
        contents = fs.readFileSync(filename, "utf-8");
    } catch (err) {
        console.error("Failed to open file '" + filename + "'");
        exit(1);
    }

    // Lex file contents
    let tokens = lex(contents);

    if (tokens instanceof LexError) {
        console.error(tokens.name + ': ' + tokens.message);
        exit(1);
    }

    // Parse file contents
    let ast = parse(tokens);

    if (ast instanceof ParseError) {
        console.error(ast.name + ': ' + ast.message);
        exit(1);
    }

    // Generate proof
    let result = okayProve(ast, options.trace);

    if (result == null) {
        console.error("Could not prove ;(");
    } else {
        console.log(visualizeProof(result, options.format));
    }
}
