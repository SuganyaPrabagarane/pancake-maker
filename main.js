const form = document.querySelector("#pancakeForm");
const pancakeType = document.querySelector("#type");
const nameInput = document.querySelector("#customerName");
const totalPriceDisplay = document.querySelector("#totalPriceDisplay");
const orderButton = document.querySelector("#seeOrder");
const summary = document.querySelector("#summaryText");
const totalPriceBanner = document.querySelector("#totalPrice");

const confirmOrder = document.querySelector("#confirmOrder");
const checkOrderButton = document.querySelector("#checkOrder");

const changeHandler = (event) => {
    const basePrice = parseFloat(pancakeType.selectedOptions[0].dataset.price);

    const toppingsTotal = [
        ...document.querySelectorAll(".topping:checked"),
    ].reduce((sum, topping) => sum + parseFloat(topping.dataset.price), 0);

    const extrasTotal = [...document.querySelectorAll(".extra:checked")].reduce(
        (sum, extra) => sum + parseFloat(extra.dataset.price), 0);

    let deliveryPrice = 0;
    const deliveryMethod = document.querySelector(".delivery:checked");
    if (deliveryMethod) {
        deliveryPrice = parseFloat(deliveryMethod.dataset.price);
    }

    let totalPrice = basePrice + toppingsTotal + extrasTotal + deliveryPrice;

    totalPriceBanner.textContent = `${totalPrice}€`;
    totalPriceDisplay.textContent = `${totalPrice}€`;
};
form.addEventListener("change", changeHandler);

const orderSummary = () => {

    confirmOrder.classList.toggle('confirmButton'); // Toggle the confirm order button

    const customerName = (nameInput.value).toLowerCase().trim();
    const deliveryMethod = document.querySelector(".delivery:checked");

    const toppingItem = [...document.querySelectorAll(".topping:checked")].map(
        (item) => item.value
    );

    const extraItem = [...document.querySelectorAll(".extra:checked")].map(
        (item) => item.value
    );

    const toppingMessage = toppingItem.length > 0 ? toppingItem.join(',') : 'None';
    const extraMessage = extraItem.length > 0 ? extraItem.join(',') : 'None';
    const getCustomerName = customerName == '' ? 'Guest' : customerName;

    summary.innerHTML = ` Name: ${getCustomerName} <br> Pancake Type: ${pancakeType.value} <br>  Toppings: ${toppingMessage} <br> Extras: ${extraMessage} <br>  Delivery Method: ${deliveryMethod.value}`;

    const orderConfirmation = () => {
        alert('Order is confirmed')
        const orders = JSON.parse(localStorage.getItem("pancakeOrder")) || [];

        let id = Date.now();
        let status = "Waiting";

        class Orders {
            constructor(id, customerName, selectedPancake, topping, extras, deliveryMethod, totalPrice, status) {
                this.id = id;
                this.customerName = customerName;
                this.selectedPancake = selectedPancake;
                this.topping = topping;
                this.extras = extras;
                this.deliveryMethod = deliveryMethod;
                this.totalPrice = totalPrice;
                this.status = status;
                this.showInfo = function () {
                    return `Id: ${this.id} <br> Name: ${this.customerName} <br> Pancake: ${this.selectedPancake} <br> Topping: ${this.topping} <br> Extras: ${this.extras} <br> DeliveryMethod: ${this.deliveryMethod} <br> TotalPrice: ${this.totalPrice} <br> Status: ${this.status}`;
                };
            }
        }

        const newOrder = new Orders(id, getCustomerName, pancakeType.value, toppingMessage, extraMessage, deliveryMethod.value, totalPriceDisplay.textContent, status);

        summary.innerHTML = newOrder.showInfo();
        orders.push(newOrder);

        const ordersJSON = JSON.stringify(orders);
        localStorage.setItem("pancakeOrder", ordersJSON);

        confirmOrder.classList.toggle('confirmButton');
        form.reset(); // to clear the input fields
    };
    confirmOrder.addEventListener("click", orderConfirmation);
};
orderButton.addEventListener("click", orderSummary);

