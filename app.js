let carts = document.querySelectorAll('.add-cart')

let products = [{
    name: 'Ipad Pro',
    tag: 'gadgets',
    price: 150,
    inCart: 0
  },
  {
    name: 'Canon EOS 80D',
    tag: 'gadgets',
    price: 250,
    inCart: 0
  },
  {
    name: 'headPhones Blue',
    tag: 'gadgets',
    price: 50,
    inCart: 0
  },
  {
    name: 'Nice Tv',
    tag: 'gadgets',
    price: 2250,
    inCart: 0
  },
]

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener('click', () => {
    console.log('added to cart')
    cartNumbers()
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

function cartNumbers() {
  let productNumbers = localStorage.getItem('cartNumbers');

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.cart span').textContent = productNumbers + 1;
    
  } else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.cart span').textContent = 1;
    
  }


}

onLoadCartNumbers()