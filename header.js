function getCartItems(){
    //from database collection, snapshot for live update
    db.collection("cart-items").onSnapshot((snapshot)=> {
        //variable to count
        let totalCount = 0;
        //loop through each document
        snapshot.forEach((doc) =>{
            totalCount += doc.data().quantity;
        })
        setCartCounter(totalCount);
    })
}

//function for setting cart counter
function setCartCounter(totalCount){
    //setting number to cart
    document.querySelector(".cart-item-number").innerText = totalCount;
}
getCartItems();