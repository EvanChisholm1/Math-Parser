const text = "1 + 10 * 12 - 2 / 34";
type token = string | number;

const ops = {
    "*": 2,
    "/": 2,
    "-": 1,
    "+": 1,
};

function tokenize(text: string): Array<token> {
    return text.split(" ").map(x => {
        console.log(x);
        if (Object.keys(ops).includes(x)) return x;
        else return parseInt(x);
    });
}

console.log(tokenize(text));

const order = Object.entries(ops)
    .sort((a, b) => a[1] - b[1])
    .map(([x]) => x);
console.log(order);

type AST = {
    op: string;
    operands: Array<number | AST>;
};

function parse(tokens: Array<token>): AST | number {
    if (tokens.length === 1 && typeof tokens[0] === "number") return tokens[0];

    for (const op of order) {
        for (let i = tokens.length - 1; i >= 0; i--) {
            if (tokens[i] !== op) continue;

            const left = tokens.slice(0, i);
            const right = tokens.slice(i + 1);

            return {
                op,
                operands: [parse(left), parse(right)],
            };
        }
    }

    return 0;
}

console.log(parse(tokenize(text)));
