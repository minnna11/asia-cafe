
//function to get this weeks item
function getThisWeeks(){
    //import drinks from firebase
    db.collection("thisWeeks").get().then((querySnapshot) => {
        let thisWeeks = [];
        querySnapshot.forEach((doc) => {
            //push items from firebase
            thisWeeks.push({
                id: doc.id,
                image: doc.data().image,
                name: doc.data().name,
                description: doc.data().description,
                price: doc.data().price
            })      
        });
        generateThisWeeks(thisWeeks)
    });

}

//function to get new selection/items
function getNewItems(){
    //import new items from firebase
    db.collection("newItems").get().then((querySnapshot) => {
        let newItems = [];
        querySnapshot.forEach((doc) => {
            //push items from firebase
            newItems.push({
                id: doc.id,
                image: doc.data().image,
                name: doc.data().name,
                description: doc.data().description
            })      
        });
        generateNewItems(newItems)
    });

}

//function to get bubble tea
function getBubbleTea(){
    //import bubbletea from firebase
    db.collection("bubbleteas").get().then((querySnapshot) => {
        let bubbleteas = [];
        querySnapshot.forEach((doc) => {
            //push items from firebase
            bubbleteas.push({
                id: doc.id,
                image: doc.data().image,
                name: doc.data().name,
                description: doc.data().description,
                price: doc.data().price
            })      
        });
        generateBubbleTea(bubbleteas)
    });
}

//function to get noodles
function getNoodles(){
    //import item from database
    db.collection("noodles").get().then((querySnapshot) => {
        let noodles = [];
        querySnapshot.forEach((doc) => {
            //push items from firebase
            noodles.push({
                id: doc.id,
                image: doc.data().image,
                name: doc.data().name,
                description: doc.data().description,
                price: doc.data().price
            })      
        });
        generateNoodles(noodles)
    });
}

//add to cart function
function addToCart(thisWeek){
    //create new doc with id of item
    let cartItem = db.collection("cart-items").doc(thisWeek.id);
    cartItem.get().then(function(doc){
        if(doc.exists){
            cartItem.update({
                quantity: doc.data().quantity +1
            })
        } else {
            cartItem.set({
                image: thisWeek.image,
                name: thisWeek.name,
                description: thisWeek.description,
                price: thisWeek.price,
                quantity: 1
            })
        }
    })
          
}

//generating items
function generateThisWeeks(thisWeeks){
    //declare variable
    let thisWeekHTML ="";
    //loop through for drinks
    thisWeeks.forEach((thisWeek) => {
        //create element
        let doc = document.createElement("div");
        //add all the classes of main product
        doc.classList.add("main-product", "w-36", "ml-8");
        doc.innerHTML =`
            <div class="product-image w-32 h-32 bg-white rounded-2xl border border-gray-500">
                <img class="w-full h-full object-contain" src="${thisWeek.image}">             
            </div>
            <div class="product-name font-bold">
                ${thisWeek.name}
            </div>
            <div class="product-discription text-xs">
                ${thisWeek.description}
            </div>
            <div class="product-price text-lg">
                ${numeral(thisWeek.price).format('$0,0.00')}
            </div>
            
        `
        //create div
        let addToCartEl = document.createElement("div");
        //adding class
        addToCartEl.classList.add("product-button","bg-purple-200","rounded","flex","items-center",
        "justify-center","p-1","text-black","text-xl","mt-2","mb-14","cursor-pointer","hover:bg-purple-500");
        //adding inner text
        addToCartEl.innerText = "Add to cart";
        //adding event listener for clicks
        addToCartEl.addEventListener("click", function(){
            //call out add to cart
            addToCart(thisWeek)
        })
        doc.appendChild(addToCartEl);
        document.querySelector(".main-section-products").appendChild(doc);
    })   
    
}
//generating newItems
function generateNewItems(newItems){
    //declare variable
    let newItemHTML ="";

    //loop through for new Items
    newItems.forEach((newItem) => {
        newItemHTML += `
        <div class="new-product w-36  ml-8">
            <div class="product-image w-32 h-32 bg-white rounded-2xl border border-gray-500">
                <img class="w-full h-full object-contain" src="${newItem.image}">
            </div>
            <div class="product-name font-bold">
                ${newItem.name}
            </div>
            <div class="product-discription text-xs">
                ${newItem.description}
            </div>                        
        </div>                                 
        `
    })
    document.querySelector(".new-selection-item").innerHTML = newItemHTML;
}

//generating bubbleteas
function generateBubbleTea(bubbleteas){
    //declare variable
    let bubbleteaHTML ="";
    //loop through bubble tea
    bubbleteas.forEach((bubbletea) => {
        bubbleteaHTML += `
        <div class="main-product w-36  ml-8 mt-7">
            <div class="product-image w-32 h-32 bg-white rounded-2xl border border-gray-500">
                <img class="w-full h-full object-contain" src="${bubbletea.image}">
            </div>
            <div class="product-name font-bold">
                ${bubbletea.name}
            </div>
            <div class="product-discription text-xs">
                ${bubbletea.description}
            </div>
            <div class="product-price text-lg">
                ${numeral(bubbletea.price).format('$0,0.00')}
            </div>
            <div class="product-button bg-purple-200 rounded flex items-center justify-center p-1 text-black text-xl mt-2 mb-3">
                Add to Cart
            </div>
            </div>
        `
    })
    document.querySelector(".item-bubbletea").innerHTML = bubbleteaHTML;
}

//generating noodles
function generateNoodles(noodles){
    //declare variable
    let noodlesHTML ="";
    //loop through noodles
    
        //loop through for drinks
    noodles.forEach((noodle) => {
        //create element
        let doc = document.createElement("div");
        //add all the classes of main product
        doc.classList.add("main-product", "w-36", "ml-8", "mt-7");
        doc.innerHTML =`
        <div class="product-image w-32 h-32 bg-white rounded-2xl border border-gray-500">
        <img class="w-full h-full object-contain" src="${noodle.image}">
    </div>
    <div class="product-name font-bold">
        ${noodle.name}
    </div>
    <div class="product-discription text-xs">
        ${noodle.description}
    </div>
    <div class="product-price text-lg">
        ${numeral(noodle.price).format('$0,0.00')}
    </div>
    
        `

        //create div
        let addToCartEl = document.createElement("div");
        //adding class
        addToCartEl.classList.add("product-button","bg-purple-200","rounded","flex","items-center",
        "justify-center","p-1","text-black","text-xl","mt-2","mb-3","cursor-pointer","hover:bg-purple-500");
        //adding inner text
        addToCartEl.innerText = "Add to cart";
        //adding event listener for clicks
        addToCartEl.addEventListener("click", function(){
            //call out add to cart
            addToCart(noodles)
        })
        doc.appendChild(addToCartEl);
        document.querySelector(".item-noodles").appendChild(doc);
        
    })
    
    //document.querySelector(".item-noodles").innerHTML = noodlesHTML;
}

getThisWeeks();
getNewItems();
getBubbleTea();
getNoodles();
