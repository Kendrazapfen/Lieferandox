let basket_meal = [];
let basket_prices = [];
let basket_amounts = [];

function render(j) {
    renderMenues();

    if (j === 0) {
        document.getElementById('emptyBasket').style.display = 'flex';
        document.getElementById('basket').innerHTML = '';
        document.getElementById('sumSection').innerHTML = '';
    } else {
        renderBasketItems();
    }
}

function renderMenues() {
    let yumyum = document.getElementById('yumyum');
    yumyum.innerHTML = '';
    for (let i = 0; i < menues.length; i++) {
        let menu = menues[i];
        document.getElementById('yumyum').innerHTML += addHTML(menu, i);
    }
}

function addHTML(menu) {
    let formattedPrice = menu['price'].toFixed(2).replace('.', ',');
    return `
    <div class="card p-3 m-4"
        <div>
            <div>
                <p><b>${menu['name']}</b></p>
                <p>${menu['description']}</p>
                <p>${formattedPrice} €</p>
            </div>
            <button class="btn btn-outline-warning" onclick="addMenu('${menu['name']}', '${formattedPrice}')"><img class="icons" src="/icons/plus.png"></button>
        </div>
    </div>`
                    
}

function renderBasket(j, amount, basketMenu, formattedBasketPrice, totalBetweenSum) {
    if (totalBetweenSum === 0) {
        document.getElementById('basket').style.display = 'none';
    } else {
        return `
    <div class="card p-3 m-4 flex-box">
        <div class="card-body">
            <p class="card-text">${amount}</p>
            <h5 class="card-title">${basketMenu}</h5>
            <p class="card-text">${formattedBasketPrice} €</p>
        </div>
        <div>
            <button class="btn btn-outline-warning" onclick="reduce(${j})"><img class="icons" src="/icons/minus-24.png"></button>
            <button class="btn btn-outline-warning" onclick="increase(${j})"><img class="icons" src="/icons/plus-24.png"></button>
        </div>
    </div>
    `;
    }
}

function renderBasketItems() {
    document.getElementById('basket').innerHTML = '';
    let totalBetweenSum = 0;

    for (let j = 0; j < basket_meal.length; j++) {
        let basketMenu = basket_meal[j];
        let basketPrice = parseFloat(basket_prices[j]);
        let formattedBasketPrice = basketPrice.toFixed(2).replace('.', ',');
        let delivery = 5.00;
        let formattedDelivery = delivery.toFixed(2).replace('.', ',');
        let amount = parseFloat(basket_amounts[j]);
        let betweenSum = basketPrice * amount;
        totalBetweenSum += betweenSum;
        totalBetweenSum = parseFloat(totalBetweenSum.toFixed(2));
        let sum = (totalBetweenSum + delivery).toFixed(2).replace('.', ',');

        document.getElementById('emptyBasket').style.display = 'none';
        document.getElementById('basket').innerHTML += renderBasket(j, amount, basketMenu, formattedBasketPrice, totalBetweenSum);
        document.getElementById('sumSection').innerHTML = renderBasketSum(totalBetweenSum, formattedDelivery, sum);
        //document.getElementById('showSum').innerHTML = `<p>Bezahlen ${sum} €</p>`;
    }
}

function subTotal(){
    
}

function renderBasketSum(totalBetweenSum, formattedDelivery, sum) {
    return `
    <div class="">
    <div class="card-body ">
    <p class="card-text">Zwischensumme: ${totalBetweenSum} €</p>
    <p class="card-text">Lieferkosten: ${formattedDelivery} €</p>
    <p class="card-text"><b>Gesamtkosten: ${sum} €</b></p>
    </div>
    <button class="btn btn-outline-warning" onclick="removeBasket()"><b> Bezahlen ${sum} €</b></button>
    </div>
    `;
}

function reduce(j) {
    let amount = basket_amounts[j];
    if (amount > 0) {
        basket_amounts[j]--;
        if (basket_amounts[j] === 0) {
            basket_meal.splice(j, 1);
            basket_prices.splice(j, 1);
            basket_amounts.splice(j, 1);
        }
        j = basket_meal.length;
    }
    render(j);
}

function increase(index) {
    basket_amounts[index]++;
    render();
}

function addMenu(name, formattedPrice) {
    let index = basket_meal.indexOf(name);
    if (index == -1) {
        basket_meal.push(name);
        basket_prices.push(formattedPrice);
        basket_amounts.push(1);
    } else {
        basket_amounts[index]++;
    }
    render();
}

function removeBasket() {
    document.getElementById('basket').style.display = 'none';
    document.getElementById('sumSection').style.display = 'none';
    document.getElementById('trash').style.display = 'none';
    document.getElementById('greetings').innerHTML = `<p>Vielen Dank für Deine Bestellung!</p>`;
    setTimeout(() => {
        window.location.reload();
    }, 2200);
}

//function openBasket(event) {
 //   document.getElementById('payContent').style.display = 'none';
 //   document.getElementById('yumyum').style.display = 'none';
 //   document.getElementById('contentBasket').style.display = 'flex';
//  event.stopPropagation();
//}

//function closeBasket(event) {
//    document.getElementById('payContent').style.display = 'flex';
//   document.getElementById('yumyum').style.display = 'block';
//    document.getElementById('contentBasket').style.display = 'none';
//    event.stopPropagation();
//
//   let totalBetweenSum = 0;
//   let delivery = 5.00;
//   for (let j = 0; j < basket_meal.length; j++) {
//       const basketPrice = parseFloat(basket_prices[j]);
//        const amount = parseFloat(basket_amounts[j]);
//        totalBetweenSum += basketPrice * amount;
//    }
//    if (basket_meal.length === 0) {

    //    delivery = 5.00;
    //    window.location.reload();
//    }
//    let formattedDelivery = delivery.toFixed(2).replace('.', ',');
//    let sum = (totalBetweenSum + delivery).toFixed(2).replace('.', ',');
//    document.getElementById('emptyBasket').style.display = 'none';
//    document.getElementById('sumSection').innerHTML = renderBasketSum(totalBetweenSum, formattedDelivery, sum);
//    document.getElementById('showSum').innerHTML = `<p>Bezahlen ${sum} EUR</p>`;
//}