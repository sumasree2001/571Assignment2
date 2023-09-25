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
                results=xhr.response.length;
                data=xhr.responseText;
                var jsonData = JSON.parse(data);
                document.getElementById("noOfResults").style.display="block";
                document.getElementById("noOfResults").innerHTML=results+ " Results found for "+searchData.keywords;

                
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
function putItemsinTable(itemList){
// Assuming you have extracted the item list into the 'itemList' variable
// Assuming you have extracted the item list into the 'itemList' variable

// Get a container element to display the cards
// Assuming you have extracted the item list into the 'itemList' variable

// Get a reference to the card container
const cardsContainer = document.querySelector('.cards');
cardsContainer.style.display = 'block';
const container = document.getElementById('card-container');

// Get a reference to the card template
const cardTemplate = document.getElementById('card-template');

// Loop through the itemList and create a card for each item
var item =itemList[0];
var card = cardTemplate;
card.style.display = 'block';

// Populate the card with item data
const imageElement = card.querySelector('img');
imageElement.src = item.galleryURL[0];

const productNameElement = card.querySelector('.product-name');
productNameElement.textContent = truncateString(item.title[0], 61);

const productTypeElement = card.querySelector('.product-type');
productTypeElement.textContent += item.primaryCategory[0].categoryName[0];

const productConditionElement = card.querySelector('.product-condition');
productConditionElement.textContent += item.condition[0].conditionDisplayName[0];

const productPriceElement = card.querySelector('.product-price');
productPriceElement.textContent = '$' + item.sellingStatus[0].currentPrice[0].__value__;

for(var i=1;i<itemList.length;i++){
  // Clone the card template
  let item=itemList[i];
  const card = cardTemplate.cloneNode(true);
  card.style.display = 'block';

  // Populate the card with item data
  const imageElement = card.querySelector('img');
  imageElement.src = item.galleryURL[0];

  const productNameElement = card.querySelector('.product-name');
  productNameElement.textContent = truncateString(item.title[0], 61);

  const productTypeElement = card.querySelector('.product-type');
  productTypeElement.textContent = item.primaryCategory[0].categoryName[0];

  const productConditionElement = card.querySelector('.product-condition');
  productConditionElement.textContent = item.condition[0].conditionDisplayName[0];

  const productPriceElement = card.querySelector('.product-price');
  productPriceElement.textContent = '$' + item.sellingStatus[0].currentPrice[0].__value__;

  // Append the card to the container
  container.appendChild(card);


}

}
function truncateString(str, maxLength) {
    if (str.length > maxLength) {
      return str.slice(0, maxLength - 3) + '...';
    }
    return str;
  }
