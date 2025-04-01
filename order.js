const displayOrderList = document.querySelector("#orderlist");
const backButtonOrderPage = document.querySelector("#back");
const searchInput = document.querySelector('#searchBox')
const removeButton = document.createElement('button');
const filterOrderByStatus = document.querySelector('#filter');
const sortOrderButton = document.querySelector('#sortBtn');
const pancakeImage = document.querySelector('#image');

const returnedOrders = localStorage.getItem("pancakeOrder");
const ordersObject = JSON.parse(returnedOrders);

function createRemoveButton(parentElement) {
    const removeButtons = document.createElement('button');
    removeButtons.classList.add('removeBtn');  // adding class name to 'Button'
    removeButtons.textContent = 'Remove';
    parentElement.appendChild(removeButtons);
    return removeButtons;
}

function createDropDownList(parentElement, order) {
    const dropDownList = document.createElement('select');
    dropDownList.classList.add('select-dropdownlist');
    parentElement.appendChild(dropDownList);
    const optionNode = ['Waiting', 'Ready', 'Delivered'];

    for (const option of optionNode) {
        const node = document.createElement('option');
        node.text = option;
        dropDownList.appendChild(node);
    }
    return dropDownList;

}

function changeOrderColorByStatus(parentElement, order) {

    if (order.status == 'Waiting') {
        parentElement.classList.add('orderstatus-waiting');
    }
    if (order.status == 'Ready') {
        parentElement.classList.add('orderstatus-ready');
    }
    if (order.status == 'Delivered') {
        parentElement.classList.add('orderstatus-delivered');
    }
}


const displayOrdersOnPage = (ordersObject) => {

    displayOrderList.innerHTML = '';

    // Error handling is not working

    // try {
    //     errorHandling(ordersObject)
    // }
    // catch (error) {
    //     console.error(error.message);
    // }

    ordersObject.forEach((order) => {

        const orderList = document.createElement('li');

        const statusDropDownList = createDropDownList(orderList);
        changeOrderColorByStatus(orderList, order);

        const status = document.createElement('p');
        const id = document.createElement("p");
        const customerName = document.createElement("p");
        const pancakeType = document.createElement("p");
        const toppings = document.createElement("p");
        const extras = document.createElement("p");
        const deliveryMethod = document.createElement("p");
        const totalPrice = document.createElement("p");
        const image = document.createElement('img');

        status.textContent = `Status: ${order.status}`;
        id.textContent = `Id:${order.id}`;
        customerName.textContent = `Customer Name:${order.customerName}`;
        pancakeType.textContent = `Pancake Type:${order.selectedPancake}`;
        toppings.textContent = `Toppings:${order.topping}`;
        extras.textContent = `Extras:${order.extras}`;
        deliveryMethod.textContent = `Delivery Method:${order.deliveryMethod}`;
        totalPrice.textContent = `Total Price:${order.totalPrice}`;
        image.textContent = `${order.selectedPancake}`;

        orderList.appendChild(status)
        orderList.appendChild(id);
        orderList.appendChild(customerName);
        orderList.appendChild(pancakeType);
        orderList.appendChild(toppings);
        orderList.appendChild(extras);
        orderList.appendChild(deliveryMethod);
        orderList.appendChild(totalPrice);
        orderList.appendChild(image);
        displayOrderList.appendChild(orderList);

        const removeBtn = createRemoveButton(orderList);

        const removeOrder = () => {
            const filteredOrders = ordersObject.filter(o => o.id !== order.id)
            orderList.remove();
            alert('order is removed');
            localStorage.setItem('pancakeOrder', JSON.stringify(filteredOrders));
        }
        removeBtn.addEventListener('click', removeOrder)

        const changeOrderStatus = () => {
            if (statusDropDownList.value == 'Ready') {
                order.status = 'Ready';
                status.textContent = `Status: ${order.status}`;
                orderList.style.backgroundColor = '#84b0d7';

            } else if (statusDropDownList.value == 'Delivered') {
                order.status = 'Delivered';
                status.textContent = `Status: ${order.status}`;
                orderList.style.backgroundColor = '#92e09d';
            } else {
                order.status = 'Waiting';
                status.textContent = `Status: ${order.status}`;
                orderList.style.backgroundColor = '#efef9f';
            }

            localStorage.setItem('pancakeOrder', JSON.stringify(ordersObject));

        }
        statusDropDownList.addEventListener('change', changeOrderStatus)

        // Upload pancake image
        image.classList.add('pancake-image');
        if (order.selectedPancake === 'Classic') {
            image.src = "/image/classic-pancake.jpg";
        }
        else if (order.selectedPancake === 'Chocolate') {
            image.src = "/image/Chocolate-Pancakes.jpg";
        }
        else if (order.selectedPancake === 'Blueberry') {
            image.src = "/image/pancake-blueberry.jpg";
        }
        image.width = 300;
        image.height = 300;

    });

}

const searchOrder = () => {
    const searchByName = searchInput.value.toLowerCase().trim();
    const searchById = Number(searchInput.value);
    const filteredOrdersByName = ordersObject.filter(order => order.customerName.includes(searchByName) || (order.id == searchById));
    displayOrdersOnPage(filteredOrdersByName);
    searchByName.value = '';
}
searchInput.addEventListener('change', searchOrder);

const filterOrders = () => {
    const selectedStatus = filterOrderByStatus.value;
    if (selectedStatus === 'All') {
        displayOrdersOnPage(ordersObject);
    }
    else {
        const filteredOrder = ordersObject.filter(order => order.status === selectedStatus)
        displayOrdersOnPage(filteredOrder);
    }
}
filterOrderByStatus.addEventListener('change', filterOrders)


const sortOrderByStatus = () => {
    const status = ['Waiting', 'Ready', 'Delivered']
    ordersObject.sort((a, b) => {
        return status.indexOf(a.status) - status.indexOf(b.status);
    });
    displayOrdersOnPage(ordersObject);

}
sortOrderButton.addEventListener('click', sortOrderByStatus)


const backToPancakePage = () => {
    window.location.href = "index.html";
};
backButtonOrderPage.addEventListener("click", backToPancakePage);

function errorHandling(order) {
    if (order.length == 0) {
        throw new error('No orders in the list, get new orders');
    }
    console.log('The order length is:', order.length);
}


displayOrdersOnPage(ordersObject);


// 1. Error handling is not working