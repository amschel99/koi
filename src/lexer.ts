
export enum TokenType{
    Identifier,
    Equals,
    Let,
    Number,
    OpenParanthesis, CloseParanthesis,
    BinaryOperator

}
export const KEYWORDS:Record<string, TokenType>={
    "let":TokenType.Let
}
export function isAlpha(src:string){
    return src.toUpperCase()!=src.toLowerCase()

}
export function isSkippable(str:string):boolean{
return str==" "|| str=="\n" || str=="\t"
}
export function isInt(src:string){
    //here we check the unicode value to tell whether its a number
    const c=src.charCodeAt(0);
    const bounds=['0'.charCodeAt(0), '9'.charCodeAt(0)];
    return (c>=bounds[0] && c<=bounds[1]);
}
export interface Token{
    value:string,
    type:TokenType
}
export function token(value="", type:TokenType):Token{
return {value, type};
}
export function tokenize(sourceCode:string):Token[]{
    
const tokens= new Array<Token>();
const src=sourceCode.split("");
while (src.length>0){
    if(src[0]=='('){
        tokens.push(token(src.shift(), TokenType.OpenParanthesis))
    }
    else if (src[0]==')'){
        tokens.push(token(src.shift(), TokenType.CloseParanthesis))

    }
    else if (src[0]=='+' || src[0]=='-' ){
        tokens.push(token(src.shift(), TokenType.BinaryOperator))
    }
    else if (src[0]=='*' || src[0]=='/' ){
        tokens.push(token(src.shift(), TokenType.BinaryOperator))
    }
    else if (src[0]=='='){
        tokens.push(token(src.shift(), TokenType.Equals))

    }
    else{
        /** handle multicharacter tokens */
        if(isInt(src[0])){
            let num="";
            while(src.length>0 && isInt(src[0])){
                num+=src.shift();
            }
            tokens.push(token(num,TokenType.Number))
        }else if (isAlpha(src[0])){
            let ident=""
            while(src.length>0 && isAlpha(src[0])){
                ident+=src.shift();
            }
            //check for reserved keywords
            const reserved=KEYWORDS[ident]
            if(reserved==undefined){
                tokens.push(token(ident,TokenType.Identifier))
            }else{
                tokens.push(token(ident,reserved))
            }
            
        }else if(isSkippable(src[0])){
            src.shift();
        }
        else{
            console.log("Unrecognized character", src[0]);
process.exit(1);
        }
    }
    
}
return tokens;
}