/*
    Az összes feladatot amit a products-nak el kell végeznie azért fogja elvégezni, mert meghívjuk
    itt a products-executerben.js, amihez az szükséges, hogy a módulokat importáljuk
    és mivel ez egy módul, úgy fogunk a script-re hivatkozni html-ben:
    <script type="module" src="products-executer.js"></script>
*/

import getUrlVariable from "./getUrlVariable.js";
import Products from "./products.js";

/*
    Kétrehozunk egy products példányt és products példányból a get.Product-at meghívjuk 
*/

const p = new Products();
p.getProducts();

/* ezt fogjuk visszakapni
const id = getUrlVariable("id"); //ha az id helyet productName-et írunk, akkor meg azt kapjuk vissza, hogy számítógép
console.log(id); //azt fogjuk visszakapni, hogy -> 5
*/

/*
itt hajtjuk végre a dolgokat a p.getProducts()-ot is be fogjuk hívni 
de ezzel az a probléma, hogy a products.html-en nincs olyan hogy <div idproducts-holder><\div> mert ott nem szükséges 
kapni fogunk egy hibaüzenetet can not read properties of null (reading:appendChild)
mutatja is hogy a products.js-ben this.productHolder.appendChild(div);

ezért van nekünk egy location.athname ami -> /product.html lesz, azon,vagyunk -> console.log(product.pathname)
ha csak annyit ít,hogy /-jel, akkor a főoldalon vagyunk 
*/

if(location.pathname === "/" || location.pathname === "/index.html") {
    p.getProducts(); // akkor fogjuk csak meghívni
} else if(location.pathname === "/product.html") {
    p.getProductByID();
}

