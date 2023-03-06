const menuEmail = document.getElementsByClassName("navbar-email")[0];
const desktopMenu = document.getElementsByClassName("desktop-menu")[0];

const hamMenu = document.getElementById("ham-Icon");
const mobileMenu = document.getElementsByClassName('mobile-menu')[0];

const menuCar = document.querySelector(".navbar-shopping-cart");
const aside = document.querySelectorAll('.product-detail')[0];
const asideProductDetail = document.querySelectorAll('.product-detail')[1];

const cardsContainer = document.querySelector(".cards-container");


menuEmail.addEventListener('click', toggleDesktopMenu);
hamMenu.addEventListener('click', toggleMobileMenu);
menuCar.addEventListener('click', toggleCarAside);

function toggleDesktopMenu() {
    aside.classList.add('inactive');
    asideProductDetail.classList.add('inactive');
    desktopMenu.classList.toggle('inactive');
}

function toggleMobileMenu() {
    aside.classList.add('inactive');
    mobileMenu.classList.toggle('inactive');
}

function toggleCarAside() {
    desktopMenu.classList.add('inactive');
    asideProductDetail.classList.add('inactive');
    mobileMenu.classList.add('inactive');
    aside.classList.toggle('inactive');
}

const products = [];
const productsNodes = [];
products.push({
    name: "Bike",
    price: 120,
    img: "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    description: "Esta bicicleta de tamaño medio de color rojo es la ideal para el entusiasta del aire libre. Cuenta con marco de aluminio ligero, cambiadores y desviadores Shimano de 21 velocidades, neumáticos de 26 pulgadas, frenos de V y sistema de suspensión doble. Es el compañero perfecto para un paseo relajante o enfrentar los senderos. Prepárate para rodar con estilo con esta bicicleta confiable y cómoda."
});
products.push({
    name: "PC",
    price: 820,
    img: "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    description: 'Esta computadora de última generación es una herramienta ideal para quienes buscan el mejor rendimiento. Cuenta con un procesador de alto rendimiento, una tarjeta gráfica de última generación, gran memoria RAM y un almacenamiento rápido. Además, viene con un sistema operativo moderno y la última tecnología en conectividad. Una opción excelente para quienes buscan el mejor rendimiento.'
});
products.push({
    name: "Pantalla",
    price: 200,
    img: "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    description: 'Esta pantalla de última generación ofrece una calidad de imagen superior gracias a su resolución 4K, proporcionando una experiencia de visualización nítida y vívida. Sus ángulos de visión amplios permiten disfrutar de contenido desde cualquier ángulo. Además, su diseño delgado y ligero se adapta a cualquier entorno.'
});


function showProductDetails(elName) {
    const productName = elName.getAttribute("id");
    const product = products.find(el => el.name == productName);
    renderProductDetails(product)
}

function closeProductDetails(){
    asideProductDetail.classList.add('inactive');
}

function renderProductDetails({
    name,
    price,
    img,
    description
}){
    if (asideProductDetail.classList.contains('inactive')) {
        asideProductDetail.classList.toggle('inactive');
    }
    aside.classList.add('inactive');
    desktopMenu.classList.add('inactive');

    const detailName = document.getElementById('productDetailName');
    detailName.innerText = name;

    const detailPrice = document.getElementById('productDetailPrice');
    detailPrice.innerText = "$" + price;

    const detailDescription = document.getElementById('productDetailDescription');
    detailDescription.innerText = description

    const imgProduct = asideProductDetail.children[1];
    imgProduct.setAttribute('src', img);


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
                        <img src="./icons/bt_add_to_cart.svg" alt="">
                    </figure>
                </div>
            </div>`;
        nodes += card;
        }
    cardsContainer.innerHTML = nodes;
}


renderProducts(products);