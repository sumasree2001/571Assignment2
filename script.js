
function ValidateData(event)
{   
    let keywords=document.getElementById("keywords").value;
    let priceFrom=document.getElementById("priceFrom");
    if(keywords!=""){
    //  alert("Keywords field is mandatory");
        event.preventDefault();
        
        if(priceFrom!=""){
            if(parseFloat(priceFrom)<0){
                alert("Price Range values cannot be negative! Please try values greater than or equal to 0.0");
                return false;
            }
            priceFrom =parseFloat(priceFrom.value);
        }
        let priceTo = document.getElementById("priceTo");
        if(priceTo!=""){
            if(parseFloat(priceTo)<0){
                alert("Price Range values cannot be negative! Please try values greater than or equal to 0.0");
                return false;
            }
            priceFrom =parseFloat(priceTo.value);
        }
        if(priceFrom!="" && priceTo!=""){
            if(parseFloat(priceFrom)>parseFloat(priceTo)){
                alert("Oops! lower price limit cannot be greater than upper price limit!.\n Please try again.");
                return false;
            }
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

var numEntriesToShow = 3; // Initial number of entries to show

function toggleCardVisibility() {
    console.log("toggleCardVisibilityEntered");
    const entries = document.querySelectorAll('.card');
    entries.forEach((entry, index) => {
        if (index < numEntriesToShow) {
            entry.style.display = 'block';
        } else {
            entry.style.display = 'none';
        }
    });
}

function putItemsinTable(jsonData) {
    const itemList = jsonData.searchResult[0].item;
    var results=jsonData.paginationOutput[0].totalEntries[0];
    // document.getElementById("noOfResults").style.display="block";
    var searchData=sendRequest();
    const TableContainer = document.querySelector('.singleItem');
    TableContainer.innerHTML="<h1>Item Details</h1><button onclick='backToSearchResults()'>Back to Search Results</button>'";
    TableContainer.style.display = 'none';
    const cardsContainer = document.querySelector('.results');
    cardsContainer.innerHTML = "";
    cardsContainer.innerHTML+="<div id='noOfResults'>"+results+ " Results found for "+searchData.keywords; +"</div>";
    cardsContainer.innerHTML+="<hr>";
    // document.getElementById("noOfResults").innerHTML=results+ " Results found for "+searchData.keywords;
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
     // Create buttons to show more or less entries
     const showMoreButton = document.createElement('button');
     showMoreButton.id = 'showMoreButton';
     showMoreButton.style.display = 'block';
     showMoreButton.style.margin = 'auto';
     showMoreButton.textContent = 'Show More';
     

     const showLessButton = document.createElement('button');
     showLessButton.style.display = 'none';
     showLessButton.id = 'showLessButton';
     showLessButton.style.margin = 'auto';
     showLessButton.textContent = 'Show Less';


     const buttonsContainer = document.createElement('div');
     buttonsContainer.appendChild(showMoreButton);
     buttonsContainer.appendChild(showLessButton);
    cardsContainer.appendChild(buttonsContainer);
    cardsContainer.innerHTML += "</div>";
        document.getElementById('showMoreButton').addEventListener('click', function () {
            console.log("enteredOnclick");
             numEntriesToShow = 10; // Increase the number of entries to show
             document.getElementById('showLessButton').style.display = 'block';
             document.getElementById('showMoreButton').style.display = 'none';
             toggleCardVisibility();
             scrollToBottom();
         });
            document.getElementById('showLessButton').addEventListener('click', function () {
                numEntriesToShow = 3; // Decrease the number of entries to show
                document.getElementById('showLessButton').style.display = 'none';
                document.getElementById('showMoreButton').style.display = 'block';
                toggleCardVisibility();
                scrollToTop();
            });
        console.log(cardsContainer);
        //toggleCardVisibility();
        // Initially set visibility
        numEntriesToShow = 3;
        const entries = document.querySelectorAll('.card');
        entries.forEach((entry, index) => {
            if (index < numEntriesToShow) {
                entry.style.display = 'block';
            } else {
                entry.style.display = 'none';
            }
        });
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
function scrollToBottom() {
    const cardContainer = document.querySelector('.results');
    if (cardContainer) {
        cardContainer.scrollIntoView({ behavior: "smooth", block: "end" });
    }
}

function scrollToTop() {
    const cardsContainer = document.querySelector('.results');
    if (cardsContainer) {
        cardsContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

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
function changeButtonColorEnter(button) {
    button.style.backgroundColor = 'green';
    button.style.color = 'white';
}

// function changeButtonColorLeave(button) {
//     button.style.backgroundColor = 'white'; // Restore to default background color
//     button.style.color = 'black'; // Restore to default text color
// }
function truncateString(str, maxLength) {
    if (str.length > maxLength) {
      return str.slice(0, maxLength - 3) + '...';
    }
    return str;
  }
function OnClearClicked(event){
    console.log("clear clicked");
    event.preventDefault();
    form = document.getElementById("inputForm");
    form.reset();
    document.getElementById("noOfResults").style.display="none";
    document.querySelector('.results').style.display="none";
    document.querySelector('.singleItem').style.display="none";
}
