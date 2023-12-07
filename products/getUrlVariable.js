/*
Megnéztük a location-t html konzolon kiírattuk -> ott van egy olyan, hogy search (products.js-en belül ki van másolva)
pl. search: "?id=2"

Ennek a search-nek a feldolgozására itt létrehozunk egx metódust, 
amivel a megadott elnevezésű url változót le tudnánk menteni és vissza tudnánk adni
*/

function getUrlVariable(name) {  // meghívjuk ezt a functiont a products-executerben
/* 
vár egy variable name-t, hogy pl.ID vagy productName stb. és ez alapján ki fogja nekünk szedni a változó értékét, 
hogyha létezik ez az url változó 

ugy fogjuk csinálni, hogy a location-on belül van nekünk egy search, melynek a szerkezete úgy müködik, hogyha 
az & jelek mentén szét szedjük a külön url változóknak az értékeit (split)
így néz ki search: "?id=1&productName=IphoneX"

Ezzel csak egy probléma van az URL változó mindig egy ?-jellel kezdődik, ezt le kell majd nekünk szedni (replace)
mindig egy ?-jel van, mert az jelzi az url változó elejét 
*/

    const urlVars = location.search.replace("?", "").split("&"); 
    //console.log(urlVars);
    /*
    ha beírjuk hogy webes html-be, hogy az IP címünket meg a host-ot és utána valami random valamit pl:?id=5&asdfg

        ez jön ki:
        0: id=5
        1: "asdfg"  "ésd" -> %C3%A9sd-t kapunk 

        ha viszont magyar betűket írunk akkor é-re ezt kapjuk: %C3%A9
        azért mert ez az url encoded formátuma azé betűnek 

        itt tudjuk encode-olni és decode-olni a spaciális karaktereket -> https://www.urlencoder.org/
        azért van, hogy az olyan speciális karakterek, amelyek nem minden karakterkódolásban jelennek meg, meg tudjanak jelenni mindenhol
        JavaScriptben vissza lehet ezeket kódolni a decodeURIComponent-vel
        decodeURIComponent(%C3%A9) -> 'é'
        visszafele ->
        encodeURIComponent("é") -> '%C3%A9'
    */
    /*végigmegyünk ezeken egy ciklussal*/
    for(const urlVar of UrlVars) {
    //értékpárok =-vel vannak szétválasztva -> id=5
    const keyValue = urlVar.split("=");
    //console.log(keyValue); 
    /*
        visszakaptunk két tömböt erre, hogy ?id=5&productName=számítógép
        1. tömb ['id', '5'] 
        0: "id" -> URL változó elnevezése 
        1: "5"  -> érték 
        2. tömb ['productName', 'számítógép'] splittel ->
        0: "productName"
        1: "sz%C3%A1m%C3%ADt%C3%B3g%C3%A9p" -> nem adhatjuk vissza ezt az URL kódolt formátumot -> decode-olni kell sima stringgé
    */

    if(keyValue[0] === name){ // ha keyvalue[0] az ugyanaz amit mi name-ként bekértünk akkor visszadjuk a keyvalue[1]-et
        return decodeURIComponent(keyValue[1]);
    }
    return null // egyébként return-öljön null-t, ha nem találta meg
    }
    //megnézzük, hogy mit fogunk visszakapni a products-executerbe 
}

export default getUrlVariable;