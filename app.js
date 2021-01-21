let carts = document.querySelectorAll('.add-cart')

let products = [{
    name: 'Ipad Pro',
    tag: 'gadgets',
    price: 150,
    inCart: 0
  },
  {
    name: 'Canon EOS 80D',
    tag: 'Cameras',
    price: 250,
    inCart: 0
  },
  {
    name: 'headPhones Blue',
    tag: 'Music',
    price: 50,
    inCart: 0
  },
  {
    name: 'Nice Tv',
    tag: 'Television',
    price: 2250,
    inCart: 0
  },
]

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener('click', () => {
    console.log('added to cart')
    cartNumbers(products[i])
    totalCost(products[i])
  })
}

function onLoadCartNumbers() { 
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {

      localStorage.setItem('cartNumbers', productNumbers + 1);
      document.querySelector('.cart span').textContent = productNumbers;

    } 
}

function cartNumbers(product, action) {
  // console.log('you clicked on item:', product)
  let productNumbers = localStorage.getItem('cartNumbers');

  productNumbers = parseInt(productNumbers);

  let cartItems = localStorage.getItem('productsInCart');
  cartItems= JSON.parse(cartItems)

  if (action == 'decrease') {
    localStorage.setItem('cartNumbers', productNumbers - 1)
    document.querySelector('.cart span').textContent = productNumbers - 1
  } else if (productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1)
    document.querySelector('.cart span').textContent = productNumbers + 1
  } else { 
    localStorage.setItem('cartNumbers', 1)
    document.querySelector('.cart span').textContent = 1
  }

  // if (productNumbers) {
    
  //   localStorage.setItem('cartNumbers', productNumbers + 1);
  //   document.querySelector('.cart span').textContent = productNumbers + 1;
    
  // } else {
  //   localStorage.setItem('cartNumbers', 1);
  //   document.querySelector('.cart span').textContent = 1;
    
  // }

  setItems(product);

}

function setItems(product) { 

  let cartItems = localStorage.getItem('productsInCart');

  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {

    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product
      }
    }

    cartItems[product.tag].inCart += 1
  } else { 

    product.inCart = 1;
    cartItems = {
      [product.tag]: product
    }
  }
  
  

  localStorage.setItem('productsInCart', JSON.stringify(cartItems))
}


function totalCost(product, action) { 
  let cartCost = localStorage.getItem('totalCost');
  
  if (action == 'decrease') { 
    cartCost = parseInt(cartCost);
    localStorage.setItem('totalCost', cartCost - product.price)
  }else if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem('totalCost', cartCost + product.price);
  } else {
    localStorage.setItem('totalCost', product.price);
  }

}

function displayCart() { 
  let cartItems = localStorage.getItem('productsInCart')
  cartItems = JSON.parse(cartItems)
  // console.log(cartItems)
  let productContainer = document.querySelector('.products');
  let cartCost = localStorage.getItem('totalCost');

  if (cartItems && productContainer) {
    productContainer.innerHTML = '';
    Object.values(cartItems).map(item => {
      productContainer.innerHTML += `
        <div class="product">
          <ion-icon name="close-circle"></ion-icon>
          <img src="./public/img/${item.tag}.jpg">
          <span>${item.name}</span>
        </div>
        <div class="price">
          ${item.price},00
        </div>
        <div class="quantity">
          <ion-icon class="decrease" name="arrow-dropleft-circle"></ion-icon>
          <span>${item.inCart}</span> <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>
        </div>
        <div class="total">
          ${item.inCart * item.price},00
        </div>
      `
    });

    productContainer.innerHTML += `
    <div class="basketTotalContainer">
      <h4 class="basketTotalTitle">
        Basket Total
      </h4>
      <h4 class="basketTotal">
        $${cartCost},00
      </h4>
    </div>

    `;

  } 
  deleteButtons()
  manageQuantity()
}

function deleteButtons() { 
  let deleteButtons = document.querySelectorAll('.product ion-icon');
  let productName;
  let productNumbers = localStorage.getItem('cartNumbers');
  let cartItems = localStorage.getItem('productsInCart')
  cartItems = JSON.parse(cartItems)
  let cartCost = localStorage.getItem('totalCost');

  for (let i = 0; i < deleteButtons.length; i++) { 
    deleteButtons[i].addEventListener('click', () => {
      productName = deleteButtons[i].parentElement.textContent.trim().toLowerCase().replace(/ /g, '');

      localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart)
      localStorage.setItem('totalCost', cartCost - (cartItems[productName].price * cartItems[productName].inCart))

      delete cartItems[productName];
      localStorage.setItem('productInCart', JSON.stringify(cartItems));

      displayCart();
      onLoadCartNumbers();
    });
  }
}


function manageQuantity() { 
  let decreaseButtons = document.querySelectorAll('.decrease');
  let increaseButtons = document.querySelectorAll('.increase');

  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  let currentQuantity = 0;
  let currentProduct = "";

  for (let i = 0; i < decreaseButtons.length; i++) { 
    decreaseButtons[i].addEventListener('click', () => { 
      currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent
      currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent

      if (cartItems[currentProduct].inCart > 1) {
        // cartItems[currentProduct].inCart = cartItems[currentProduct].inCart - 1;
        cartItems[currentProduct].inCart -= 1;
        cartNumbers(cartItems[currentProduct], 'decrease')
        totalCost(cartItems[currentProduct], 'decrease')
        localStorage.setItem('productsInCart', JSON.stringify(cartItems))

        displayCart()
      }
    })
  }
  for (let i = 0; i < increaseButtons.length; i++) { 
    increaseButtons[i].addEventListener('click', () => { 
      currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent.trim().toLowerCase().replace(/ /g, '');

      currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent

        // cartItems[currentProduct].inCart = cartItems[currentProduct].inCart - 1;
        cartItems[currentProduct].inCart += 1;
        cartNumbers(cartItems[currentProduct])
        totalCost(cartItems[currentProduct])
        localStorage.setItem('productsInCart', JSON.stringify(cartItems))

        displayCart()
      

    })
  }
}
// run function on page Load

onLoadCartNumbers()
displayCart()