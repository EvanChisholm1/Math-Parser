type token = string | number;

const ops = {
    "*": 2,
    "/": 2,
    "-": 1,
    "+": 1,
};

function tokenize(text: string): Array<token> {
    return text.split(" ").map(x => {
        if (Object.keys(ops).includes(x)) return x;
        else return parseFloat(x);
    });
}

const order = Object.entries(ops)
    .sort((a, b) => a[1] - b[1])
    .map(([x]) => x);

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

const operatorFuncs: {
    [key: string]: (a: number, b: number) => number;
} = {
    "*": (a: number, b: number) => a * b,
    "/": (a: number, b: number) => a / b,
    "+": (a: number, b: number) => a + b,
    "-": (a: number, b: number) => a - b,
};

function evaluate(ast: AST | number): number {
    if (typeof ast === "number") return ast;

    return operatorFuncs[ast.op](
        evaluate(ast.operands[0]),
        evaluate(ast.operands[1])
    );
}

while (true) {
    const inputText = prompt("Enter math expression:");
    console.log(evaluate(parse(tokenize(inputText!))));
}
