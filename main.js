// Cambio de cantidad de articulos ingresado por el usuario.

let minusBtn = document.querySelector('.input__minus');
let plusBtn = document.querySelector('.input__plus');
let userInput = document.querySelector('.input__number');

let userInputNumber = 0;

plusBtn.addEventListener('click', ()=>{
    userInputNumber++;
    userInput.value = userInputNumber;
    console.log(userInputNumber);
});

minusBtn.addEventListener('click', ()=>{
    userInputNumber--;
    if(userInputNumber <= 0){
        userInputNumber = 0;
    }
    userInput.value = userInputNumber;
    console.log(userInputNumber);
});

// ADD TO CART
const addToCartBtn = document.querySelector('.details__button');
let cartNotification = document.querySelector('.header__cart--notification');
let lastValue = parseInt(cartNotification.innerText);

addToCartBtn.addEventListener('click', ()=> {
    lastValue = lastValue + userInputNumber;
    
    cartNotification.innerText = lastValue;
    cartNotification.style.display = 'block';
    drawProductInModal();
    priceModal.innerHTML = `$125 x${lastValue} <span>$${lastValue*125}.00</span>`
    saveLocal();
});

//MOSTRAR CART MODAL
const cartIconBtn = document.querySelector('.header__cart');
const cartModal = document.querySelector('.cart-modal');
let priceModal = document.querySelector('.cart-modal__details__price');
const productContainer = document.querySelector('.cart-modal__checkout-container');


cartIconBtn.addEventListener('click', ()=> {
    cartModal.classList.toggle('show');

    if(lastValue === 0){
        productContainer.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
    }else{
        drawProductInModal();
    }
});

//DELETE CART CONTENT
function deleteProduct(){
    const deleteProductBtn = document.querySelector('.cart-modal__delete');

    deleteProductBtn.addEventListener('click', ()=>{
        productContainer.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
        lastValue = 0;
        cartNotification.innerText = lastValue;
    });
}


// GALLERY IMG
const imageContainer = document.querySelector('.gallery__image-container');
const previousGalleryBtn = document.querySelector('.gallery__previous');
const nextGalleryBtn = document.querySelector('.gallery__next');
let imgIndex = 1;

const imagesUrls = [
    '../images/image-product-1.png',
    '../images/image-product-2.png',
    '../images/image-product-3.png',
    '../images/image-product-4.png'
]

nextGalleryBtn.addEventListener('click', ()=>{
    changeNextImage(imageContainer);
});

previousGalleryBtn.addEventListener('click', ()=>{
    changePreviousImage(imageContainer);
});

//CAMBIAR IMAGENES DEL THUMBNAILS
let thumbnails = document.querySelectorAll('.gallery__thumbnail');
thumbnails = [...thumbnails]
            
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', event=>{
        console.log(event.target.id);
        imageContainer.style.backgroundImage = `url('../images/image-product-${event.target.id}.png')`;
    });
});

// CAMBIAR IMAGENES DEL MODAL
let modalThumbnails = document.querySelectorAll('.modal-gallery__thumbnail');
const modalImageContainer = document.querySelector ('.modal-gallery__image-container')
modalThumbnails = [...modalThumbnails]

modalThumbnails.forEach(modalThumbnail => {
    modalThumbnail.addEventListener('click', event=>{
        console.log(event.target.id.slice(-1));
        modalImageContainer.style.backgroundImage = `url('../images/image-product-${event.target.id.slice(-1)}.png')`;
    });
});

// FLECHAS MODAL PRINCIPAL
const previousModalBtn = document.querySelector('.modal-gallery__previous');
const nextModalBtn = document.querySelector('.modal-gallery__next');

previousModalBtn.addEventListener('click', ()=>{
    changeNextImage(modalImageContainer);
});

nextModalBtn.addEventListener('click', ()=>{
    changePreviousImage(modalImageContainer);
});

// FUNCIONES
function drawProductInModal(){
    productContainer.innerHTML = `
        <div class="cart-modal__details-container">
            <img class="cart-modal__image" src="./images/image-product-1-thumbnail.png" alt="">
            <div>
            <p class="cart-modal__details__product">RockStar 2 Mid-Tower PC gaming case</p>
            <p class="cart-modal__details__price">$125 x3 <span>$375.00</span></p>
            </div>
            <img class="cart-modal__delete"  src="./images/icon-delete.svg" alt="delete">
        </div>
        <button class="cart-modal__checkout">Checkout</button>`
        deleteProduct();
        let priceModal = document.querySelector('.cart-modal__details__price');
        priceModal.innerHTML = `$125 x${lastValue} <span>$${lastValue*125}.00</span>`;
}


// SHOW IMG MODAL
const imagesModal = document.querySelector('.modal-gallery__background');
const closeModalBtn = document.querySelector('.modal-gallery__close');

imageContainer.addEventListener('click', ()=>{
    imagesModal.style.display = 'grid';
});

function changeNextImage(imgContainer){
    if(imgIndex === 4){
        imgIndex = 1;
    }else{
        imgIndex++;
    }
    imgContainer.style.backgroundImage = `url('../images/image-product-${imgIndex}.png')`;
};

function changePreviousImage(imgContainer){
    if(imgIndex === 1){
        imgIndex = 4;
    }else{
        imgIndex--;
    }
    imgContainer.style.backgroundImage = `url('../images/image-product-${imgIndex}.png')`;
}

closeModalBtn.addEventListener('click', ()=>{
    imagesModal.style.display = 'none';
});


// FETCH
function consultarProductosServer(){
    fetch("./content.json")
    .then((response) => response.json())
    .then((data)=> console.log(data))
    .catch((error)=> console.log(error)); 
}

consultarProductosServer();

// LOCAL STORAGE

// SET ITEM
    const saveLocal = () => {
        localStorage.setItem("AddToCart", JSON.stringify(lastValue));
    }
    






