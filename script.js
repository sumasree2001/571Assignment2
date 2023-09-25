function ValidateData(event)
{   event.preventDefault();
    let keywords=document.getElementById("keywords").value;
    let priceFrom=document.getElementById("priceFrom");
    if(keywords.value="")alert("Keywords field is mandatory");
    if(priceFrom.value!="")
        priceFrom =priceFrom.value;
    let priceTo = document.getElementById("priceTo");
    if(priceTo.value!="")
        priceTo =priceTo.value;
    if(priceFrom.value!="" && priceTo.value!=""){
        if(parseFloat(priceFrom)<0 || parseFloat(priceTo)<0){
            alert("Price Range values cannot be negative! Please try values greater than or equal to 0.0");
            return false;
        }
        else if(parseFloat(priceFrom)>parseFloat(priceTo)){
            alert("Oops! lower price limit cannot be greater than upper price limit!.\n Please try again.");
            return false;
        }
    }
    SubmitData();
}
function SubmitData(){
    //check if data is valid
        var data;
        let xhr = new XMLHttpRequest();
        var searchData=sendRequest();
        // 2. Configure it: GET-request for the URL /article/.../load
        xhr.open('GET', 'http://127.0.0.1:8080/getItems?searchData='+JSON.stringify(searchData),true);
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send();
        xhr.onload = function() {
            if (xhr.status != 200) { // analyze HTTP status of the response
                alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
            } else { // show the result
                // alert(`Done, got ${xhr.response.length} bytes`);
                data=xhr.responseText;
                var jsonData = JSON.parse(data);
                // var results=jsonData.paginationOutput[0].totalEntries[0];
                // document.getElementById("noOfResults").style.display="block";
                // document.getElementById("noOfResults").innerHTML=results+ " Results found for "+searchData.keywords;

                
                putItemsinTable(jsonData) // response is the server response
            }
        };
    
}
function sendRequest() {
    // Collect data from form fields
    const keywords = document.getElementById('keywords').value;
    const priceFrom = document.getElementById('priceFrom').value;
    const priceTo = document.getElementById('priceTo').value;
    const conditions = Array.from(document.querySelectorAll('input[name="condition"]:checked')).map(input => input.value);
    const returnAccepted = document.getElementById('returnAccepted').checked;
    const shipping = Array.from(document.querySelectorAll('input[name="shipping"]:checked')).map(input => input.value);
    const sort = document.getElementById('sort').value;

    // Create an object with the collected data
    const searchData = {
        keywords,
        priceFrom,
        priceTo,
        conditions,
        returnAccepted,
        shipping,
        sort
    };
    console.log(searchData)
    return searchData;
}
// function putItemsinTable(itemList){
// // Assuming you have extracted the item list into the 'itemList' variable
// // Assuming you have extracted the item list into the 'itemList' variable

// // Get a container element to display the cards
// // Assuming you have extracted the item list into the 'itemList' variable

// // Get a reference to the card container
// const cardsContainer = document.querySelector('.cards');
// cardsContainer.style.display = 'block';
// const container = document.getElementById('card-container');

// // Get a reference to the card template
// const cardTemplate = document.getElementById('card-template');

// // Loop through the itemList and create a card for each item
// var item =itemList[0];
// var card = cardTemplate;
// card.style.display = 'block';

// // Populate the card with item data
// const imageElement = card.querySelector('img');
// imageElement.src = item.galleryURL[0];

// const productNameElement = card.querySelector('.product-name');
// productNameElement.textContent = truncateString(item.title[0], 61);

// const productTypeElement = card.querySelector('.product-type');
// productTypeElement.textContent += item.primaryCategory[0].categoryName[0];

// const productConditionElement = card.querySelector('.product-condition');
// productConditionElement.textContent += item.condition[0].conditionDisplayName[0];

// const productPriceElement = card.querySelector('.product-price');
// productPriceElement.textContent = '$' + item.sellingStatus[0].currentPrice[0].__value__;

// for(var i=1;i<itemList.length;i++){
//   // Clone the card template
//   let item=itemList[i];
//   const card = cardTemplate.cloneNode(true);
//   card.style.display = 'block';

//   // Populate the card with item data
//   const imageElement = card.querySelector('img');
//   imageElement.src = item.galleryURL[0];

//   const productNameElement = card.querySelector('.product-name');
//   productNameElement.textContent = truncateString(item.title[0], 61);

//   const productTypeElement = card.querySelector('.product-type');
//   productTypeElement.textContent = item.primaryCategory[0].categoryName[0];

//   const productConditionElement = card.querySelector('.product-condition');
//   productConditionElement.textContent = item.condition[0].conditionDisplayName[0];

//   const productPriceElement = card.querySelector('.product-price');
//   productPriceElement.textContent = '$' + item.sellingStatus[0].currentPrice[0].__value__;

//   // Append the card to the container
//   container.appendChild(card);


// }

//}
// function putItemsinTable(itemList){
//     // Assuming you have extracted the item list into the 'itemList' variable
//     // Assuming you have extracted the item list into the 'itemList' variable
    
//     // Get a container element to display the cards
//     // Assuming you have extracted the item list into the 'itemList' variable
    
//     // Get a reference to the card container
//     const cardsContainer = document.querySelector('.results');
//     cardsContainer.style.display = 'block';
//     cardsContainer.innerHTML="<div id='card-container'><div id='card-template'>"
//     // Loop through the itemList and create a card for each item
//     for(var i=0;i<itemList.length;i++){
//         cardsContainer.innerHTML+="<div class='card' style='padding:20px;border:1px solid black;margin-bottom: 2px;>";
//         var item =itemList[i];
//         cardsContainer.style.display = 'block';
        
//         // Populate the card with item data
//         //image
//         cardsContainer.innerHTML+="<div class='left-container' style='display: inline-block;width: 150px;'><img src='"+item.galleryURL[0]+"' style='width:100px;height:100px;'>"+"</div>&emsp;";
//         //for Item ID
//         cardsContainer.innerHTML+="<span id='itemId' style='display: none;'>"+item.itemId+"</span>";
//         //for right-container
//         cardsContainer.innerHTML+="<div class='right-container' style='display: inline-block;'>";
//         //for product name
//         cardsContainer.innerHTML+="<p class='product-name' style='font-weight: bold;'>"+truncateString(item.title[0], 61)+"</p>";
//         //for product type
//         cardsContainer.innerHTML+="<p class='product-type' style='font-weight: bold;'>"+item.primaryCategory[0].categoryName[0]+"</p>";
//         //for product condition
//         cardsContainer.innerHTML+="<p class='product-condition' style='font-weight: bold;'>"+item.condition[0].conditionDisplayName[0]+"</p>";
//         //for product price
//         cardsContainer.innerHTML+="<p class='product-price' style='font-weight: bold;'>$"+item.sellingStatus[0].currentPrice[0].__value__+"</p>";
//         //close right-container
//         cardsContainer.innerHTML+="</div>";
//         //close card
//         cardsContainer.innerHTML+="</div>";
        
//     }
//     //close card-template
//     cardsContainer.innerHTML+="</div>";
//     //close card-container
//     cardsContainer.innerHTML+="</div>";

// }
// function putItemsinTable(itemList) {
//     const cardsContainer = document.querySelector('.results');
//     cardsContainer.style.display = 'block';
//     cardsContainer.innerHTML = "<div id='card-container'>";
    
//     // Loop through the itemList and create a card for each item
//     for (var i = 0; i < itemList.length; i++) {
//         const item = itemList[i];
        
//         // Create a card for each item with a border
//         const card = "<div class='card' style='padding: 20px; border: 1px solid black; margin-bottom: 2px; display: flex;'>";
        
//         // Create left container for the item image
//         const leftContainer = "<div class='left-container' style='width: 150px;'>";
//         const itemImage = "<img src='" + item.galleryURL[0] + "' style='width: 100px; height: 100px;'>";
        
//         // Create right container for item details
//         const rightContainer = "<div class='right-container' style='flex: 1;'>";
//         const productName = "<p class='product-name' style='font-weight: bold;'>" + truncateString(item.title[0], 61) + "</p>";
//         const productType = "<p class='product-type' style='font-weight: bold;'>" + item.primaryCategory[0].categoryName[0] + "</p>";
//         const productCondition = "<p class='product-condition' style='font-weight: bold;'>" + item.condition[0].conditionDisplayName[0] + "</p>";
//         const productPrice = "<p class='product-price' style='font-weight: bold;'>$" + item.sellingStatus[0].currentPrice[0].__value__ + "</p>";
        
//         // Combine all elements and append to the card container
//         cardsContainer.innerHTML += card + leftContainer + itemImage + "</div>" + rightContainer + productName + productType + productCondition + productPrice + "</div></div>";
//     }
// }
function putItemsinTable(jsonData) {
    const itemList = jsonData.searchResult[0].item;
    var results=jsonData.paginationOutput[0].totalEntries[0];
    document.getElementById("noOfResults").style.display="block";
    var searchData=sendRequest();
    document.getElementById("noOfResults").innerHTML=results+ " Results found for "+searchData.keywords;
    const cardsContainer = document.querySelector('.results');
    cardsContainer.style.display = 'block';
    cardsContainer.innerHTML += "<div id='card-container'>";
    
    // Loop through the itemList and create a card for each item
    for (var i = 0; i < itemList.length; i++) {
        const item = itemList[i];
        
        // Create a card for each item with a border
        const card = "<div class='card' style='padding: 20px; border: 1px solid black; margin-bottom: 2px;'onclick='getItemDetails(" + item.itemId + ");'>";
        
        // Create left container for the item image
        const leftContainer = "<div class='left-container' style='width: 150px; display: inline-block;'>";
        const itemImage = "<img src='" + item.galleryURL[0] + "' style='width: 100px; height: 100px;'>";
        
        // Create right container for item details
        const rightContainer = "<div class='right-container' style='display: inline-block;'>";
        const productName = "<p class='product-name' style='font-weight: bold;'>" + truncateString(item.title[0], 61) + "</p>";
        const productType = "<p class='product-type' style='font-weight: bold;'>" + item.primaryCategory[0].categoryName[0] + "</p>";
        const productCondition = "<p class='product-condition' style='font-weight: bold;'>" + item.condition[0].conditionDisplayName[0] + "</p>";
        const productPrice = "<p class='product-price' style='font-weight: bold;'>$" + item.sellingStatus[0].currentPrice[0].__value__ + "</p>";
        
        // Combine all elements and append to the card container
        cardsContainer.innerHTML += card + leftContainer + itemImage + "</div>" + rightContainer + productName + productType + productCondition + productPrice + "</div></div>";
    }
}
function getItemDetails(itemId) {
   

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:8080/getSingleItem?itemId=' + itemId, true);
    xhr.send();
    xhr.onload = function() {
        if (xhr.status === 200) {
            // Handle the response here, e.g., display the item details
            var itemDetails = JSON.parse(xhr.responseText);
            putSingleItemInTable(itemDetails); // You can do something with the itemDetails
        } else {
            console.error('Error fetching single item:', xhr.status, xhr.statusText);
        }
    };


}
// function putSingleItemInTable(itemDetails) {
//      //make display none of results div
//      document.querySelector('.results').style.display="none";
//         //make display none of noOfResults div
//         document.getElementById("noOfResults").style.display="none";

//      const TableContainer = document.querySelector('.singleItem');
//         TableContainer.style.display = 'block';
//         const table = document.createElement('table');
//         table.style.border = '1px solid black';
//         //for Photo
//         const row = table.insertRow();
//         const cell1 = row.insertCell(0);
//         cell1.textContent="Photo";
//         const cell2 = row.insertCell(1);
//         const img=document.createElement('img');
//         img.src=itemDetails.PictureURL[0];
//         cell2.textContent=img;
//         //for eBayLink
//         const row1 = table.insertRow();
//         const cell3 = row1.insertCell(0);
//         cell3.textContent="eBay Link";
//         const cell4 = row1.insertCell(1);
//         cell4.textContent=itemDetails.ViewItemURLForNaturalSearch[0];
//         //for Title
//         const row2 = table.insertRow();
//         const cell5 = row2.insertCell(0);
//         cell5.textContent="Title";
//         const cell6 = row2.insertCell(1);
//         cell6.textContent=itemDetails.Title[0];
//         //for Price
//         const row3 = table.insertRow();
//         const cell7 = row3.insertCell(0);
//         cell7.textContent="Price";
//         const cell8 = row3.insertCell(1);
//         cell8.textContent=itemDetails.CurrentPrice. + " USD"va;
//         //for Location
//         const row4 = table.insertRow();
//         const cell9 = row4.insertCell(0);
//         cell9.textContent="Location";
//         const cell10 = row4.insertCell(1);
//         cell10.textContent=itemDetails.Location[0];
//         //for Seller
//         const row5 = table.insertRow();
//         const cell11 = row5.insertCell(0);
//         cell11.textContent="Seller";
//         const cell12 = row5.insertCell(1);
//         cell12.textContent=itemDetails.Seller.UserID;
//         //for Return Policy
//         const row6 = table.insertRow();
//         const cell13 = row6.insertCell(0);
//         cell13.textContent="Return Policy(US)";
//         const cell14 = row6.insertCell(1);
//         cell14.textContent=itemDetails.ReturnPolicy.ReturnsAccepted+" within "+itemDetails.ReturnPolicy.ReturnsWithin+" days";
//         //Extract Name Value Pairs
//         Specifics=itemDetails.ItemSpecifics.NameValueList;
//         for (var i = 0; i < Specifics.length; i++) {
//             const row = table.insertRow();
//             const cell1 = row.insertCell(0);
//             cell1.textContent=Specifics[i].Name;
//             const cell2 = row.insertCell(1);
//             cell2.textContent=Specifics[i].Value[0];
//         }
//         TableContainer.appendChild(table);
// }
function putSingleItemInTable(itemDetails) {
    // Make display none of results div
    document.querySelector('.results').style.display = 'none';
    
    const TableContainer = document.querySelector('.singleItem');
    TableContainer.style.display = 'block';
    const table = document.createElement('table');
    table.style.width='750px';
    table.style.border = '1px solid black'; // Add border around the table

    // Helper function to create an image element
    function createImageElement(src) {
        const img = document.createElement('img');
        img.src = src;
        img.style.width = '100px'; // Set the width to 100px
    img.style.height = '100px'; // Set the height to 100px
        return img;
    }

    // Helper function to create a table row with two cells
    function createTableRowWithCells(label, content) {
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        cell1.textContent = label;
        const cell2 = row.insertCell(1);
        if (content instanceof HTMLElement) {
            cell2.appendChild(content); // If content is an HTML element (like an image), append it
        } else {
            cell2.textContent = content;
        }
    }

    // for Photo
    createTableRowWithCells('Photo', createImageElement(itemDetails.PictureURL[0]));

    // for eBayLink
    const link = document.createElement('a');
    link.href = itemDetails.ViewItemURLForNaturalSearch;
    link.textContent = "eBay Product Link";
    createTableRowWithCells('eBay Link', link);

    // for Title
    createTableRowWithCells('Title', itemDetails.Title);

    // for Price
    createTableRowWithCells('Price', itemDetails.CurrentPrice.Value + " "+itemDetails.CurrentPrice.CurrencyID);

    // for Location
    createTableRowWithCells('Location', itemDetails.Location);

    // for Seller
    createTableRowWithCells('Seller', itemDetails.Seller.UserID);

    // for Return Policy
    createTableRowWithCells('Return Policy(US)', itemDetails.ReturnPolicy.ReturnsAccepted + ' within ' + itemDetails.ReturnPolicy.ReturnsWithin);

    // Extract Name Value Pairs
    const Specifics = itemDetails.ItemSpecifics.NameValueList;
    for (let i = 0; i < Specifics.length; i++) {
        createTableRowWithCells(Specifics[i].Name, Specifics[i].Value[0]);
    }

    TableContainer.appendChild(table);
}
function backToSearchResults(){
    const TableContainer = document.querySelector('.singleItem');
    TableContainer.innerHTML="<h1>Item Details</h1><button onclick='backToSearchResults()'>Back to Search Results</button>'";
    TableContainer.style.display = 'none';
    const cardsContainer = document.querySelector('.results');
    cardsContainer.style.display = 'block';
}

function truncateString(str, maxLength) {
    if (str.length > maxLength) {
      return str.slice(0, maxLength - 3) + '...';
    }
    return str;
  }
