const displayProduct = (products) => {
  const productContainer = document.getElementById("drinksList");
  productContainer.innerHTML = "";
  productContainer.classList.add("row");

  products.forEach((product) => {
    const div = document.createElement("div");
    div.classList.add("col-4", "mb-4"); 

    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = product[`strIngredient${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(ingredient.trim());
      }
    }

    div.innerHTML = `
      <div class="card p-2 h-100">
        <img class="card-img-top w-100" src="${product.strMealThumb}" alt="">
        <div >
          <h5">${product.strMeal}</h5>
          <p >Category: ${product.strCategory}</p>

          <button class="btn btn-info w-100" 
            onclick='showDetails(${JSON.stringify(product.strMeal)}, ${JSON.stringify(product.strMealThumb)}, ${JSON.stringify(ingredients.slice(0, 5))})'
            data-bs-toggle="modal"
            data-bs-target="#productModal">
            Details
          </button>
        </div>
      </div>
    `;

    productContainer.appendChild(div);
  });
};


const showDetails = (title, image, ingredients) => {
  document.getElementById("modalTitle").innerText = title;

  let ingredientList = "";
  ingredients.forEach((item) => {
    ingredientList += `<li>${item}</li>`;
  });

  document.getElementById("modalBody").innerHTML = `
    <img src="${image}" class="img-fluid mb-3 rounded w-50" alt="">
    <h6><b>Ingredients:</b></h6>
    <ul>${ingredientList}</ul>
  `;
};

 

const searchDrinksByName = (searchText) => {
  fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.meals) {
        displayProduct(data.meals);
      } else {
        showNotFound();
      }
    });
};


const showNotFound = () => {
  const productContainer = document.getElementById("drinksList");
  productContainer.innerHTML = `
    <h3 class="text-center text-danger mt-5"> No item found!</h3>
  `;
};


document.getElementById("searchBtn").addEventListener("click", () => {
  const searchValue = document.getElementById("searchInput").value;

  if (searchValue === "") {
    showNotFound();
  } else {
    searchDrinksByName(searchValue);
  }
});


window.showDetails = showDetails;