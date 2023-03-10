const menuEmail = document.getElementsByClassName("navbar-email")[0];
const desktopMenu = document.getElementsByClassName("desktop-menu")[0];

const hamMenu = document.getElementById("ham-Icon");
const mobileMenu = document.getElementsByClassName('mobile-menu')[0];

const menuCar = document.querySelector(".navbar-shopping-cart");
const aside = document.querySelectorAll('.product-detail')[0];
const asideProductDetail = document.querySelectorAll('.product-detail')[1];

const btnCloseProductDetail = document.querySelector('product-detail-close');

const btnCloseCarMenu = document.querySelector('close-car-menu');

const cardsContainer = document.querySelector(".cards-container");

const carContentContainer = document.querySelector(".orders");

const summarizedOrder = document.querySelector('.order');

const numberOfCartElements = document.getElementById('numberOfCartElements');

const modalIWP = document.querySelector('.modal-IWP');

menuEmail.addEventListener('click', toggleDesktopMenu);
hamMenu.addEventListener('click', toggleMobileMenu);
menuCar.addEventListener('click', toggleCarAside);

function toggleDesktopMenu() {
    aside.classList.add('inactive');
    asideProductDetail.classList.add('inactive');
    desktopMenu.classList.remove('inactive');
    desktopMenu.classList.toggle('hide-desktop-menu');
    desktopMenu.classList.toggle('show-desktop-menu');
}

function toggleMobileMenu() {
    aside.classList.add('inactive');
    mobileMenu.classList.remove('inactive');
    mobileMenu.classList.toggle('hide-mobile-menu');
    mobileMenu.classList.toggle('show-mobile-menu');
}

function toggleCarAside() {
    desktopMenu.classList.add('inactive');
    asideProductDetail.classList.add('inactive');
    mobileMenu.classList.add('inactive');
    aside.classList.remove('inactive');
    aside.classList.toggle('hide-product-detail');
    aside.classList.toggle('show-product-detail');
}

const products = [];
products.push({
    name: "Bike",
    price: 120,
    img: "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    description: "Esta bicicleta de tamaño medio de color rojo es la ideal para el entusiasta del aire libre. Cuenta con marco de aluminio ligero, cambiadores y desviadores Shimano de 21 velocidades, neumáticos de 26 pulgadas, frenos de V y sistema de suspensión doble. Es el compañero perfecto para un paseo relajante o enfrentar los senderos. Prepárate para rodar con estilo con esta bicicleta confiable y cómoda.",
    // inTheCar: false
});
products.push({
    name: "PC",
    price: 820,
    img: "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    description: 'Esta computadora de última generación es una herramienta ideal para quienes buscan el mejor rendimiento. Cuenta con un procesador de alto rendimiento, una tarjeta gráfica de última generación, gran memoria RAM y un almacenamiento rápido. Además, viene con un sistema operativo moderno y la última tecnología en conectividad. Una opción excelente para quienes buscan el mejor rendimiento.',
    // inTheCar: false
});
products.push({
    name: "Pantalla",
    price: 200,
    img: "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    description: 'Esta pantalla de última generación ofrece una calidad de imagen superior gracias a su resolución 4K, proporcionando una experiencia de visualización nítida y vívida. Sus ángulos de visión amplios permiten disfrutar de contenido desde cualquier ángulo. Además, su diseño delgado y ligero se adapta a cualquier entorno.',
    // inTheCar: false
});

// const carContent = products.filter(el => el.inTheCar === true);
const carContent = [];
const carContentNodes = [];

function addToCart(productName){
    const foundProduct = products.find(el => el.name === productName);
    carContent.push(foundProduct)
    renderCarContent(carContent);
}

function renderCarContent(carElements){
    let nodes = "";
    let i = -1;
    carElements.forEach((carEl) => {
        const inCarEl = `
            <div class="shopping-cart">
                <figure>
                    <img src="${carEl.img}" alt="${carEl.name}">
                </figure>
                <p>${carEl.name}</p>
                <p>$${carEl.price}</p>
                <img src="./icons/icon_close.png" alt="close" onclick="quitElement('${++i}CE')">
            </div>`;
        nodes += inCarEl;
    });
    carContentContainer.innerHTML = nodes;
    // Render the total of the orders
    const totalPrice = summarizedOrder.children[1];
    totalPrice.innerText = carElements.length !== 0
        ? `$${carElements.map(el => el.price).reduce((a,b)=>a+b)}`
        : 0;
    // render the number of products in the cart
    numberOfCartElements.innerText = carElements.length;

}

function quitElement(nIndex) {
    const index = parseInt(nIndex);
    carContent.splice(index, 1);
    renderCarContent(carContent);
}

function showProductDetails(elName) {
    const productName = elName.getAttribute("id");
    const product = products.find(el => el.name == productName);
    renderProductDetails(product)
}

function closeProductDetails(){
    asideProductDetail.classList.remove('show-product-detail');
    asideProductDetail.classList.add('hide-product-detail');
}

function renderProductDetails({
    name,
    price,
    img,
    description
}){
    if (asideProductDetail.classList.contains('inactive') || asideProductDetail.classList.contains('hide-product-detail')) {
        asideProductDetail.classList.remove('inactive');
        asideProductDetail.classList.remove('hide-product-detail');
        asideProductDetail.classList.add('show-product-detail')
    } 
    const detailName = document.getElementById('productDetailName');
    detailName.innerText = name;

    const detailPrice = document.getElementById('productDetailPrice');
    detailPrice.innerText = "$" + price;

    const detailDescription = document.getElementById('productDetailDescription');
    detailDescription.innerText = description

    const imgProduct = asideProductDetail.children[1];
    imgProduct.setAttribute('src', img);

    const buttonAddToCar = asideProductDetail.children[2].children[3];
    buttonAddToCar.setAttribute('onclick', `addToCart('${name}')`)
}


function renderProducts(productsList) {
    let nodes = "";
    for (const product of productsList) {
        const card = `
            <div class="product-card">
                <img src="${product.img}" onclick="showProductDetails(this)" id="${product.name}">
                <div class="product-info">
                    <div>
                        <p>$${product.price}</p>
                        <p>${product.name}</p>
                    </div>
                    <figure>
                        <img src="./icons/bt_add_to_cart.svg" alt="${product.name}" onclick="addToCart('${product.name}')">
                    </figure>
                </div>
            </div>`;
        nodes += card;
        }
    cardsContainer.innerHTML = nodes;
}

function closeIWPModal() {
    modalIWP.classList.toggle('inactive');
}


renderProducts(products);
renderCarContent(carContent);