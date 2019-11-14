

function paren(parentheses,index){
    const stack = [];
    const hash = {}
    for (let i = 0; i < parentheses.length; i++) {
        const curr = parentheses[i];
        if(curr === "("){
            stack.push(i);       
        }else if(curr === ")"){
            const closingIndex = i;
            if(stack.length === 0) throw new Error(`Input Error: Parens not balenced. Too many closing at index:${i}`)
            const openingIndex = stack.pop();
            hash[openingIndex] = closingIndex;
        }else{
            throw new Error(`Input Error: expected only '(' or ')' Recieved:'${curr}'`)
        }        
    }
    if(stack.length !== 0) throw new Error("Input Error: Parens not equal, too many opening parens")

    if(hash[index]){
        return hash[index]
    } else{
        return -1
    }
}


let input = "()()"
let index = 2


let out = paren(input,index)
console.log(out);