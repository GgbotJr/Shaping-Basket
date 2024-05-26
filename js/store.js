const $ = document

let allProducts = [
    {id: 1, title: "Album 1", price: 11.80, src: "Images/Album 1.png", count: 1},
    {id: 2, title: "Album 2", price: 12.94, src: "Images/Album 2.png", count: 1},
    {id: 3, title: "Album 3", price: 20, src: "Images/Album 3.png", count: 1},
    {id: 4, title: "Album 4", price: 18, src: "Images/Album 4.png", count: 1},
    {id: 5, title: "Band Members", price: 9, src: "Images/Band Members.png", count: 1},
    {id: 6, title: "Cofee", price: 14.25, src: "Images/Cofee.png", count: 1},
    {id: 7, title: "Header Background", price: 12.60, src: "Images/Header Background.jpg", count: 1},
    {id: 8, title: "Shirt", price: 15, src: "Images/Shirt.png", count: 1},
]

let userBasket = []

const shopItemContainer = $.querySelector(".shop-items")
const basketProductsContainer = $.querySelector(".cart-items")
const removeAllProductBtn = $.getElementById("remove-all")
const totalPriceElem = $.querySelector(".cart-total-price")

allProducts.forEach(function (product) {

    let divShopContainer = $.createElement("div")
    divShopContainer.classList.add("shop-item")

    let titleSpanElem = $.createElement("span")
    titleSpanElem.classList.add("shop-item-title")
    titleSpanElem.innerHTML = product.title

    let imageElem = $.createElement("img")
    imageElem.classList.add("shop-item-image")
    imageElem.setAttribute("src", product.src)

    let divDetailsContainer = $.createElement("div")
    divDetailsContainer.classList.add("shop-item-details")

    let priceSpanElem = $.createElement("span")
    priceSpanElem.classList.add("shop-item-price")
    priceSpanElem.innerHTML = product.price

    let addToCartButton = $.createElement("button")
    addToCartButton.className = "btn btn-primary shop-item-button"
    addToCartButton.innerHTML = "ADD TO CART"
    addToCartButton.addEventListener("click", function () {
        addProductToBasket(product.id)
    })

    divDetailsContainer.append(priceSpanElem, addToCartButton)
    
    divShopContainer.append(titleSpanElem, imageElem, divDetailsContainer)

    shopItemContainer.append(divShopContainer)

})

function addProductToBasket (productId) {

    let mainProduct = allProducts.find(function (product) {
        return product.id === productId
    })

    userBasket.push(mainProduct)

    basketProductsGenerator(userBasket)

    calcTotalPrice(userBasket)

    console.log(userBasket);
}

function basketProductsGenerator (userBasketArray) {

    basketProductsContainer.innerHTML = ""

    userBasketArray.forEach(function (product) {
        let basketProductContainer = $.createElement("div")
        basketProductContainer.classList.add("cart-row")

        let basketProductDetailsContainer = $.createElement("div")
        basketProductDetailsContainer.className = "cart-item cart-column"

        let basketProductImage = $.createElement("img")
        basketProductImage.classList.add("cart-item-image")
        basketProductImage.setAttribute("src", product.src)

        let basketProductTitleSpan = $.createElement("span")
        basketProductTitleSpan.classList.add("cart-item-title")
        basketProductTitleSpan.innerHTML = product.title

        basketProductDetailsContainer.append(basketProductImage, basketProductTitleSpan)

        let basketProductPriceSpan = $.createElement("span")
        basketProductPriceSpan.className = "cart-price cart-column"
        basketProductPriceSpan.innerHTML = product.price

        let basketProductInputsContainer = $.createElement("div")
        basketProductInputsContainer.className = "cart-quantity cart-column"

        let basketProductInput = $.createElement("input")
        basketProductInput.classList.add("cart-quantity-input")
        basketProductInput.setAttribute("type", "number")
        basketProductInput.value = product.count
        basketProductInput.addEventListener("change", function () {
            updateProductCount(product.id, basketProductInput.value)
        })

        let basketProductButton = $.createElement("button")
        basketProductButton.className = "btn btn-danger"
        basketProductButton.innerHTML = "REMOVE"
        basketProductButton.setAttribute("type", "button")
        basketProductButton.addEventListener("click", function () {
            removeProductFromBasket(product.id)
        })

        basketProductInputsContainer.append(basketProductInput, basketProductButton)

        basketProductContainer.append(basketProductDetailsContainer, basketProductPriceSpan, basketProductInputsContainer)

        basketProductsContainer.append(basketProductContainer)
    })

}

function removeProductFromBasket(productId) {

    userBasket = userBasket.filter(function (product) {
        return product.id !== productId
    })

    basketProductsGenerator(userBasket)

    calcTotalPrice(userBasket)
}

function removeAllProduct () {

    userBasket = []

    totalPriceElem.innerHTML = "$0"

    basketProductsGenerator(userBasket)

}

function calcTotalPrice (userBasketArray) {

    let total = 0

    userBasketArray.forEach(function (product) {

        total += (product.price * product.count)

        totalPriceElem.innerHTML = total
    })

}

function updateProductCount (productId, newCount) {

    console.log("product ", productId, "newCount : ", newCount)

    userBasket.forEach(function (product) {
        if (product.id === productId) 
            product.count = newCount
    })

    calcTotalPrice(userBasket)

}

removeAllProductBtn.addEventListener("click", removeAllProduct)