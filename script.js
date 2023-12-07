import add, {division, substraction} from "./modul.js";

/*
ahhoz,hogy ezek a módulok müködjenek egy http szerverre van szükségünk -> live server
vagy go-live vagy a terminálba beírjuk, hogy live-server
nem elég, ha csak beírjuk a script tag-be ó, hogy type="module"
*/ 

console.log(add);
/*
ez lesz ha kikonzoljuk htlm-n
ƒ add(a, b) {
    return a + b
}
*/

const result = add(5, 10); // ezt a functiont meg is tudjuk itt hívni 
console.log("5 + 10 = " + result); //5 + 10 = 15

const result2 = division(5, 10);
