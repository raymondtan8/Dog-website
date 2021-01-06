/*
JavaScript for store page of Vega's Website
*/

/*
Current features to be implemented:


*/

const firstPrice_span = document.getElementById("first-price");
const firstPriceInput_input = document.getElementById("input-1");
const secondPrice_span = document.getElementById("second-price");
const secondPriceInput_input = document.getElementById("input-2");
const subtotal_span = document.getElementById("cart-subtotal-price");
const tax_span = document.getElementById("cart-tax-price");
const total_span = document.getElementById("cart-total-price");
const purchase_btn = document.getElementById("purchase-btn");
const processing_p = document.getElementById("processing");

const firstPriceVal = changeToFloat(firstPrice_span);
const secondPriceVal = changeToFloat(secondPrice_span);


/*
function testFunction(num){
    firstPrice_span.innerHTML = num;
}
*/
const processingDisplay = processing_p.style.display;
processing_p.style.display = "none";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function action(key){
    // Just using a switch statement for practice
    switch(key){
        case "first":
            updatePrice(key);
            break;
        case "second":
            updatePrice(key);
            break;
    }
}

function updatePrice(key){
    let firstInputVal = firstPriceInput_input.value;
    let secondInputVal = secondPriceInput_input.value;
    if(key === "first"){
        let newPrice = firstPriceVal * firstInputVal;
        firstPrice_span.innerHTML = formatFloat(newPrice, "$");

    }
    else if(key === "second"){
        let newPrice = secondPriceVal * secondInputVal;
        secondPrice_span.innerHTML = formatFloat(newPrice, "$");
    }
    updateSubtotal([firstInputVal, secondInputVal], [firstPriceVal, secondPriceVal]);
    updateTax();
    updateTotal();
}

function updateSubtotal(lst_inputs, lst_vals){
    total = 0;
    for(var i = 0; i < lst_inputs.length; i++){
        total += lst_inputs[i] * lst_vals[i];
    }
    subtotal_span.innerHTML = formatFloat(total, "$");
}

function updateTax(){
    total = changeToFloat(subtotal_span);
    tax_span.innerHTML = formatFloat(total * .08, "$");
}

function updateTotal(){
    total = changeToFloat(subtotal_span);
    tax = changeToFloat(tax_span);
    total_span.innerHTML = formatFloat(total + tax, "$");
}

function formatFloat(val, beginning=""){
    return beginning + val.toFixed(2);
}

function changeToFloat(element){
    return parseFloat(element.innerHTML.replace("$", ""));
}

async function loading(button){
    button.style.display = "none";
    processing_p.style.display = processingDisplay;
    await sleep(2000);
    window.location.replace("thankyou.html");
}

function main(){
    firstPriceInput_input.addEventListener("input", () => action("first"))
    secondPriceInput_input.addEventListener("input", () => action("second"));
    purchase_btn.addEventListener("click", () => loading(purchase_btn));
}

main();

