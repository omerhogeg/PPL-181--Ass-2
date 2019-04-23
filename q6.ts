import { CExp, Exp, PrimOp, Program, DefineExp } from "./L1-ast";
import { hasError, isAppExp, isBoolExp, isCExp, isDefineExp, isError, isNumExp, isPrimOp,
         isProgram, isVarRef, isVarDecl } from "./L1-ast";
import { parseL1 } from "./L1-ast";
import { first, isEmpty, rest } from "./L1-ast";
import * as assert from "assert";
import { filter, map, reduce } from "ramda";

//Question 6:
export const unparse = (x: Program | DefineExp | CExp) : string | Error => 
    
    isDefineExp(x) ? "(define " + x.var.var +" "+ unparse(x.val) + ")":
    isBoolExp(x)? (x.val)? '#t':'#f':
    isProgram(x) ? map(unparse, x.exps).reduce((a: string, b: string) => a + b, "(L1 ") + ")":
    isAppExp(x) ? "(" + unparse(x.rator) + map(unparse, x.rands).reduce((a: string, b: string) => a +" " + b, "") + ")":
    isNumExp(x) ? "" + x.val:
    isPrimOp(x) ? "" + x.op:
    
    isVarDecl(x) ? "" + x.var:
    isVarRef(x) ? "" + x.var:
    Error ("bad input");   
  

//console.log("TEST 1:");
//console.log(unparse(parseL1("1")));

//console.log("TEST 2:");
//console.log(unparse(parseL1("#t")));

//console.log("TEST 3:");
//console.log(unparse(parseL1("#f")));

//console.log("TEST 4:");
//console.log(unparse(parseL1("(+ x 5)")));

//console.log("TEST 5:");
//console.log(unparse(parseL1("(L1 (define x 5)(+ x 5)(+ (+ (- x y) 3) 4)(and #t x))")));
