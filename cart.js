//getting cart items
function getCartItem(){
    //live snapshot of items
    db.collection("cart-items").onSnapshot((snapshot) => {
        //cart variable
        let cartItems = [];
        //loop through
        snapshot.docs.forEach((doc) => {
            cartItems.push({
                id: doc.id,
                ...doc.data()
                /*image: doc.data().image,
                name: doc.data().name,
                description: doc.data().description,
                price: doc.data().price,
                quantity: doc.data().quantity*/
            })
        })
        generateCartItems(cartItems);
        getTotalCost(cartItems);
        
    })
}

//generating cart items
function generateCartItems(cartItems){
    let itemsHTML ="";
    cartItems.forEach((item) => {
        itemsHTML += `
        <div class="cart-item flex items-center pb-4 border-b">
            <div class="cart-item-image w-40 h-24 p-4 rounded-lg">
                <img class="w-full h-full object-contain" src="${item.image}">
            </div>
            <div class="cart-item-details flex-grow ">
                <div class="cart-item-title font-bold text-sm">
                    ${item.name}
                </div>               
            </div>
            <div class="cart-item-counter w-48 flex items-center">
                <div data-id="${item.id}"  class="cart-item-decrease cursor-pointer bg-gray-200 rounded flex justify-center items-center hover:bg-gray-500 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </div>
                <h4 class="">x${item.quantity}</h4>
                <div data-id="${item.id}" class="cart-item-increase cursor-pointer bg-gray-200 rounded flex justify-center items-center hover:bg-gray-500 ml-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
            <div class="cart-item-total-cost w-48">
                $${numeral(item.price * item.quantity).format('$0,0.00')}               
            </div>
            <div data-id="${item.id}" class="cart-item-delete w-10 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
        </div>
        `
    })
    document.querySelector(".cart-items").innerHTML = itemsHTML;
    creatEventListeners();
}

//creating event listen
function creatEventListeners(){
    //increase button
    let decreaseButton = document.querySelectorAll(".cart-item-decrease");
    //decrease button
    let increaseButton = document.querySelectorAll(".cart-item-increase");
    //delete button
    let deleteButton = document.querySelectorAll(".cart-item-delete");

    //loop through for decrease
    decreaseButton.forEach((button) => {
        //event listeners for update
        button.addEventListener("click", function(){
            decreaseCount(button.dataset.id);
        })
    })
    //loop through for increase
    increaseButton.forEach((button) => {
        //event listeners for update
        button.addEventListener("click", function(){
            increaseCount(button.dataset.id);
        })
    })
    //loop through for delete
    deleteButton.forEach((button) => {
        //event listener for delete
        button.addEventListener("click", function(){
            deleteItem(button.dataset.id);
        })
    })
}

//decrease count
function decreaseCount(itemId){
    //get from database
    let cartItem = db.collection("cart-items").doc(itemId);
    //update quantity id doc exisit
    cartItem.get().then(function(doc) {
        //if statement
        if (doc.exists){
            if(doc.data().quantity > 1){
                cartItem.update({
                    quantity: doc.data().quantity - 1
                })
            }
        }
    })
}

//increase count
function increaseCount(itemId){
    //get from database
    let cartItem = db.collection("cart-items").doc(itemId);
    //update quantity id doc exisit
    cartItem.get().then(function(doc) {
        //if statement
        if (doc.exists){           
            cartItem.update({
                quantity: doc.data().quantity + 1
            })
            
        }
    })
}

//delete item
function deleteItem(itemId){
    //to delete item in cart
    db.collection("cart-items").doc(itemId).delete();
}

//get total cost
function getTotalCost(items){
    //var for total cost
    let totalCost = 0;
    //loop through items
    items.forEach((item) => {
        totalCost += (item.quantity * item.price);
    })
    document.querySelector(".total-cost-number").innerText = numeral(totalCost).format('$0,0.00');
}

getCartItem();