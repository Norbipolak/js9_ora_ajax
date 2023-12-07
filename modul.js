function add(a, b) {
    return a + b;
}

// alapértelmezett export módul 
export default add;
/*
Ezzel azt érjük el, hogy egy másik állományból, modjuk a script.js-ből be tudjuk hívni
az add-ből származó módulokat, ott meg importálni kell a modul.js-t
*/

function division(a, b) {
    return a/b;
}

function substraction(a, b) {
    return a - b;
}
// ilyen formában is lehet exportálni (nem csak a default-val):
//előnye, hogy egyszerre többet is tudunk exportálni 
export {division, substraction};




