var productTitleInput = document.getElementById("productTitle");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productImageInput = document.getElementById("productImage");
var productDescInput = document.getElementById("productDesc");
var productSearchInput = document.getElementById("productSearch");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn")
var productList = []



if (JSON.parse(localStorage.getItem("allProducts")) !== null) {
    productList = JSON.parse(localStorage.getItem("allProducts"))
    displayProducts()
}


function addProduct() {

    if (validationInputs(productTitleInput, "msgTitle") &&
        validationInputs(productPriceInput, "msgPrice") &&
        validationInputs(productCategoryInput, "msgCategory") &&
        validationInputs(productImageInput, "msgImage") &&
        validationInputs(productDescInput, "msgDesc")
    ) {
        var product = {
            title: productTitleInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            image: productImageInput.files[0]?.name ? `images/${productImageInput.files[0]?.name}` : "images/iphone-15-pro-max-black-1.jpg",
            desc: productDescInput.value,
        };
        productList.push(product);
        localStorage.setItem("allProducts", JSON.stringify(productList))
        console.log(productList);
        clearForm();
        displayProducts();
    } else {
        alert("You Have To Fill The Form First ... ")
    }
}




function clearForm() {
    productTitleInput.value = null;
    productPriceInput.value = null;
    productCategoryInput.value = null;
    productImageInput.value = null;
    productDescInput.value = null;
}



function displayProducts() {
    var bBox = "";
    for (i = 0; i < productList.length; i++) {
        bBox += ` <div class="col-lg-4 col-md-3 col-sm-6">
        <div class="card">
            <img src="${productList[i].image}" class="card-img-top" alt="iphone">
            <div class="card-body bg-light">
              <h3 class="card-title">${productList[i].title}</h3>
              <div class="d-flex justify-content-between">
                <span>${productList[i].category}</span>
                <span>${productList[i].price}</span>
            </div>
            <div class="card-text">
                <p class="text-muted">${productList[i].desc}</p>
            </div>
            <div class="d-flex justify-content-between">
            <button class="btn btn-outline-danger" onclick="deleteProduct(${i})">Delete</button>
            <button class="btn btn-outline-success" onclick="editProduct(${i})">Edit</button>
        </div>
            </div>
          </div>
    </div>`

    }
    document.getElementById("products").innerHTML = bBox;
}


function deleteProduct(deletedIndex) {

    productList.splice(deletedIndex, 1);
    localStorage.setItem("allProducts", JSON.stringify(productList)) // bn3ml override shel el value el adema w 7ot el gdeda
    displayProducts();
}



function editProduct(editedIndex) {
    productTitleInput.value = productList[editedIndex].title;
    productPriceInput.value = productList[editedIndex].price;
    productCategoryInput.value = productList[editedIndex].category;
    productDescInput.value = productList[editedIndex].desc;
    addBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
    updatedIndex = editedIndex;
}

var updatedIndex;
function updateData() {
    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
    var product = {
        title: productTitleInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        image: productImageInput.files[0]?.name ? `images/${productImageInput.files[0]?.name}` : "images/iphone-15-pro-max-black-1.jpg",
        desc: productDescInput.value,
    };
    productList.splice(updatedIndex, 1, product);

    displayProducts();
    clearForm();
    localStorage.setItem("allProducts", JSON.stringify(productList));
}


function searchProduct() {
    var term = productSearchInput.value.trim();
    var bBox = "";
    
    // Check if the search term is empty
    if (term === "") {
        document.getElementById("products").innerHTML = "<p>Please enter a search term.</p>";
        return;
    }

    // Create a case-insensitive regular expression from the search term
    var regex = new RegExp(`(${term})`, 'gi');
    
    // Loop through product list
    for (var i = 0; i < productList.length; i++) {
        if (productList[i].title.toLowerCase().includes(term.toLowerCase())) {
            // Highlight the matched part in the title
            var highlightedTitle = productList[i].title.replace(regex, "<span class='highlight text-danger'>$1</span>");
            
            bBox += ` <div class="col-lg-4 col-md-3 col-sm-6">
            <div class="card">
                <img src="${productList[i].image}" class="card-img-top" alt="iphone">
                <div class="card-body bg-light">
                <h3 class="card-title">${highlightedTitle}</h3>
                <div class="d-flex justify-content-between">
                    <span>${productList[i].category}</span>
                    <span>${productList[i].price}</span>
                </div>
                <div class="card-text">
                    <p class="text-muted">${productList[i].desc}</p>
                </div>
                <div class="d-flex justify-content-between">
                <button class="btn btn-outline-danger" onclick="deleteProduct(${i})">Delete</button>
                <button class="btn btn-outline-success" onclick="editProduct(${i})">Edit</button>
            </div>
                </div>
            </div>
        </div>`;
        }
    }
    
    // Check if no products matched the search term
    if (bBox === "") {
        bBox = "<p>No products found matching your search.</p>";
    }
    
    // Display the results
    document.getElementById("products").innerHTML = bBox;
}



function validationInputs(element, msgId) {
    var text = element.value;
    var regex = {
        productTitle: /^[A-Z][a-z]{2,10}$/,
        productPrice: /^\b(6000|[6-9]\d{3}|[1-5]\d{4}|60000)\b$/,
        productCategory: /^(tv|mobile|screens|laptops|watch|airpod)$/i,
        productImage: /^.{1,}\.(jpg|png|avif|jpeg|png)$/,
        productDesc: /^\w{0,250}$/

    };
    var msg = document.getElementById(msgId)
    if (regex[element.id].test(text) == true) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        msg.classList.add("d-none");
        return true;
    }
    else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        msg.classList.remove("d-none");
        return false;
    }

}

