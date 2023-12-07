/*
itt fogjuk importálni, mert lesz itt egy olyan metódusunk alul, hogy getProductByID
*/ 
import getUrlVariable from "./getUrlVariable.js";

class Products {
    productsHolder;
    productImg;
    productTable;

    constructor() {
        this.productsHolder = document.querySelector("#products-holder");
        this.productImg = document.querySelector("#product-img");
        this.productTable = document.querySelector("#product-table");
    }

    // metódusokkal fogjuk lehozni az adatokat 
    async getProducts() { // megszólítja a dummyjson megfelelő end pointját és mivel ez egy sima get nem kell más beállítás
        const response = await fetch("https://dummyjson.com/products")
        const json = await response.json(); //most nem kell hogy mennyi volt a limit stb. - csak a termék 
        this.createProductHtml(json.products);
    }

    createProductHtml(products) { 
        // azért akatunk egy ilyen függvényt, mert ha keresünk, akkor a keresés eredményét is ezzel tudjuk legenerálni és nem kell kódot másolni majd
        for (const product of products) {
            const div = document.createElement("div");
            div.classList.add("product-box");
    
            const titleH3 = document.createElement("h3");
            titleH3.innerText = product.title;
            const productBoxImg = document.createElement("div");
            productBoxImg.classList.add("product-box-img");
            const thumbnail = document.createElement("img");
            thumbnail.src = product.thumbnail;
            productBoxImg.appendChild(thumbnail);
    
            const grid2 = document.createElement("div");
            grid2.classList.add("grid-2");
            const gridBox1 = document.createElement("div");
            gridBox1.classList.add("grid-box");
            gridBox1.innerText = product.price + "$";
            const gridBox2 = document.createElement("div");
            gridBox2.classList.add("grid-box");
            const addToCartBtn = document.createElement("button");
            addToCartBtn.innerHTML = `<a href="product.html?id=${product.id}">megnyitás<\a>`; 
            /*
            átírtuk innerText-et InnerHTML-re és ha rákattintottunk mondjuk a 4-ik termékre akkor átvisz minket egy új oldalra ->127.0.0.1:8080/product?id=4
            ami jelen esetben üres, mert ott még nem csináltunk semmit 

            URL változók pl. ?id=4
            ezek információkat tartalmaznak az adott weboldalnak a beállításairól
            nekünk ez azért szükséges mert valahogy, hozzá szeretnénk férni ezekhez az id-khoz(az url-ben lévő információkhoz) és 
            ezt úgy tudjuk megtenni, hogy van nekünk egy olyan beépített objektumunk a JavaScriptben, hogy location
            ezt található a location-be (beírjuk a weboldalon a console-ba, hogy location és ezt adja ki:)

            Location {ancestorOrigins: DOMStringList, href: 'http://127.0.0.1:5500/products/index.html', origin: 'http://127.0.0.1:5500', protocol: 'http:', host: '127.0.0.1:5500', …}
            ancestorOrigins: DOMStringList {length: 0}
            assign: 
            ƒ assign()
            hash: ""
            host: "127.0.0.1:5500" ->:5500 az egy port és azt határozza meg, hogy milyen szolgáltatás veszünk vele igénybe az adott IP címen    
            hostname: "127.0.0.1" -> a számítógépünkenk az IP címe, egy lokális hálózatot lehet vele létrehozni a gépünkön, 
                amin a webserver tud müködni (live server)
            href: "http://127.0.0.1:5500/products/index.html"
            origin: "http://127.0.0.1:5500" -> http szolgáltatás, az általunk készített weboldalt fogjuk látni
            pathname: "/products/index.html" -> az url utáni rész 
            port: "5500" -> szolgátatás, amit igénybe veszünk 
            protocol: "http:"
            reload: ƒ reload()
            replace: ƒ replace()
            search: "" -> fontos nekünk, ha rámegyünk az egyik kiválasztott termékre akkor itt megjelenik az id-ja(search: "?id=1"), 
                innen tudjuk meg az url változóinkat
            toString: ƒ toString()
            valueOf: ƒ valueOf()
            Symbol(Symbol.toPrimitive): undefined
            [[Prototype]]: Location
            */
            gridBox2.appendChild(addToCartBtn);
    
            grid2.appendChild(gridBox1);
            grid2.appendChild(gridBox2);
    
            div.appendChild(titleH3);
            div.appendChild(productBoxImg);
            div.appendChild(grid2);
    
            this.productsHolder.appendChild(div);
        }
    }

    async getProductByID() {
        //le fogja nekünk szedni az ID-t az URL-ből és ez alapján lehozza nekünk az adatokat, csinálunk egy products.html-t neki
        const productID = getUrlVariable("id");
        // console.log(productID); 1 lesz konzolozva
        const response = await fetch(`https://dummyjson.com/products/${productID}`)
        const productData = await response.json();
        /*console.log(productData); megkapjuk a terméket az id:1 -es terméket 
        brand: "Apple"
        category: "smartphones"
        description: "An apple mobile which is nothing like apple"
        discountPercentage: 12.96
        id: 1
        images: túl hosszú, hogy leírjam 
        price: 549
        rating: 4.69
        stock: 94
        thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
        title: "iPhone 9"
        [[Protoytype]]: Object

        Ezeket az adatokat szeretnénk megjeleníteni a showProductData függvénnyel 
        */
       this.showProductData(productData);
    }

    showProductData(productData) {
        //ezekhez az adatok megjelenítéséhez a product.html-ben csinálunk egy grid-2-t
        this.productImg.src = productData.thumbnail;

        const tr = document.createElement("tr");
        const tdID = document.createElement("td");
        tdID.innerText = productData.id;

        const tdCategory = document.createElement("td");
        const select = document.createElement("select");
        tdCategory.appendChild(select); // ezt a select-et átadjuk a createCategorySelect-nek
        this.createCategorySelect(select, productData.category);
        

        const tdBrand = document.createElement("td");
        tdBrand.innerText = productData.brand;

        const tdTitle = document.createElement("td");
        tdTitle.innerText = productData.title;

        const tdPrice = document.createElement("td");
        tdPrice.innerText = productData.price + "$";

        tr.appendChild(tdID);
        tr.appendChild(tdCategory);
        tr.appendChild(tdBrand);
        tr.appendChild(tdTitle);
        tr.appendChild(tdPrice);

        this.productTable.appendChild(tr);

        //megjellenek csak rosszul nez ki ezért product.html-ben csinálunk neki tr-t és th-ket amiket majd css-vel formázunk
    }

    /*
    Csinálunk a category-nak egy legördűlő valamit, hogy lehessen közüllük válogatni, mint egy normális web-shopban pl.Amazon
    ne csak beírjunk egy random category-t inline-ba
    */ 

    async getCategories() { 
        const response = await fetch("https://dummyjson.com/products/categories")
        const categories = await response.json();
        return categories; // a return categories mivel egy async függvény egy promise-t fog visszaadni, ezért a categorySelect-ünknek is asyncnek kell lennie
    }
    async createCategorySelect(select, currentCategory = "") {
        const categories = await this.getCategories();
        

        for(const category of categories) {
            const option = document.createElement("option");
            option.innerText = category;

            select.appendChild(option);

            // azt csináljuk meg, hogy automatikusan az a category jelenjen meg, amibe tartozik az a termék
            if(currentCategory === category) {
                option.selected = true;
            }

        }
    }
}

export default Products;