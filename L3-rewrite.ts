import { filter, map, reduce, zip } from "ramda";
import { first, isArray, isBoolean, isEmpty, isNumber, isString, rest, second, isLetStarExp, makeLetExp, makeLetStarExp, LetStarExp, LetExp, makeProgram, makeDefineExp, isVarDecl, makeBinding, isBinding, isAtomicExp, Binding } from "./L3-ast";
import { AppExp, AtomicExp, BoolExp, CompoundExp, CExp, DefineExp, Exp, IfExp, LitExp, NumExp,
         Parsed, PrimOp, ProcExp, Program, StrExp, VarDecl, VarRef } from "./L3-ast";
import { allT, getErrorMessages, hasNoError, isError }  from "./L3-ast";
import { isAppExp, isBoolExp, isCExp, isDefineExp, isExp, isIfExp, isLetExp, isLitExp, isNumExp,
             isPrimOp, isProcExp, isProgram, isStrExp, isVarRef } from "./L3-ast";
import { makeAppExp, makeBoolExp, makeIfExp, makeLitExp, makeNumExp, makeProcExp, makeStrExp,
         makeVarDecl, makeVarRef } from "./L3-ast";
import { parseL3 } from "./L3-ast";
import { isClosure, isCompoundSExp, isEmptySExp, isSymbolSExp, isSExp,
         makeClosure, makeCompoundSExp, makeEmptySExp, makeSymbolSExp,
         Closure, CompoundSExp, SExp, Value } from "./value";


export const LetStarHelper = (cexp: LetStarExp, index: number) : LetExp  => 
{
    let temp: Binding[] = [cexp.bindings[index]];

    if (index < cexp.bindings.length - 1)
        return makeLetExp(temp, [LetStarHelper(cexp, index+1)]);

    return makeLetExp(temp, cexp.body);
}


export const rewriteLetStar = (cexp: Parsed | Error) : LetExp  | Error => 
{
    if(isLetStarExp(cexp))
        return LetStarHelper(cexp, 0);

	return Error("not expected expression" + cexp);
}


export const rewriteAllLetStar = (cexp: Parsed | Binding | Error) : Parsed | Binding | Error =>
{
    return  isAtomicExp(cexp) ? cexp:
        isLitExp(cexp) ? cexp:
        isError(cexp) ? cexp:
        isProgram(cexp) ? makeProgram(map(rewriteAllLetStar,cexp.exps)):
        isAppExp(cexp) ? makeAppExp(<CExp>(rewriteAllLetStar(cexp.rator)), map(rewriteAllLetStar, cexp.rands)):
        isDefineExp(cexp) ? makeDefineExp(cexp.var, <CExp>(rewriteAllLetStar(cexp.val))):
        isIfExp(cexp) ? makeIfExp(<CExp>(rewriteAllLetStar(cexp.test)) ,(<CExp>(rewriteAllLetStar(cexp.then))), (<CExp>(rewriteAllLetStar(cexp.alt)))):
        isLetExp(cexp) ? makeLetExp(map (rewriteAllLetStar, cexp.bindings), map(rewriteLetStar, cexp.body)):
        isProcExp(cexp) ? makeProcExp(cexp.args, map(rewriteAllLetStar,cexp.body)):
        isBinding(cexp) ? makeBinding(cexp.var, <CExp>(rewriteAllLetStar(cexp.val))):
        isLetStarExp(cexp) ? rewriteLetStar (makeLetStarExp (map (rewriteAllLetStar,cexp.bindings), map(rewriteAllLetStar, cexp.body))):
        Error("not expected expression" + cexp);
}


//console.log("TEST 1: JSON.stringify(parseL3(let* ((x 3) (y x)) x y)), null, 4) ");
//console.log(JSON.stringify(parseL3("(let* ((x 3) (y x)) x y)"), null, 4));

//console.log("TEST 2: JSON.stringify(rewriteLetStar(parseL3((let* ((x 5) (y x) (z y)) (+ 1 2)))),null,4)");
//console.log(JSON.stringify(rewriteLetStar(parseL3("(let* ((x 5) (y x) (z y)) (+ 1 2))")),null,4));

//console.log("TEST 3: JSON.stringify(rewriteAllLetStar(parseL3((let* ((x (let* ((y 5)) y)) (z 7)) (+ x (let* ((t 12)) t))))),null,4)");
//console.log(JSON.stringify(rewriteAllLetStar(parseL3("(let* ((x (let* ((y 5)) y)) (z 7)) (+ x (let* ((t 12)) t)))")),null,4));
