const loadCategories = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories",
  );
  const data = await response.json();
  showCategories(data.categories);
};

const loadRandomImages = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets",
  );
  const data = await response.json();
  displayRandomImg(data);
};

const showCategories = (category) => {
  const categoryContaier = document.querySelector(".category-container");
  categoryContaier.innerHTML = "";

  category.forEach((cate, index) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <button 
        onclick='handleCategoryClick(this, "${cate.category}")'
        class="category-btn btn font-bold interFont text-2xl px-8 py-6 rounded-xl ${
          index === 0 ? "bg-teal-800 text-white" : ""
        }">
        <img class="w-8 inline-block mr-2" src="${cate.category_icon}"/>
        ${cate.category}
      </button>
    `;

    categoryContaier.append(div);
  });
};
const handleCategoryClick = (button, categoryName) => {
  // সব button reset
  const allButtons = document.querySelectorAll(".category-btn");
  allButtons.forEach((btn) => {
    btn.classList.remove("bg-teal-800", "text-white");
  });

  // clicked button active
  button.classList.add("bg-teal-800", "text-white");

  // pets load
  loadPets(categoryName);
  loadRandomImages();
};

const loadPets = async (categoryName) => {
  console.log(categoryName);
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`,
  );
  const data = await response.json();
  showPets(data.data);
};

const showPets = (data) => {
  const petContainer = document.querySelector("#petContainer");
  petContainer.innerHTML = "";
  data.forEach((element) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card bg-base-100 shadow-sm">
            <figure>
              <img
                class="bg-cover bg-center w-full"
                src="${element.image}"
                alt="pet-image"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title text-2xl font-bold ">${element.pet_name}</h2>
              <p class="text-stone-400"><i class="fa-solid fa-grip"></i> Breed: ${element.breed}</p>
              <p class="text-stone-400"><i class="fa-regular fa-calendar"></i> Birth: ${element.date_of_birth}</p>
              <p class="text-stone-400"><i class="fa-solid fa-mercury"></i> Gender: ${element.gender}</p>
              <p class="text-stone-400"><i class="fa-solid fa-dollar-sign"></i> Price : ${element.price}$</p>
              <hr class="text-stone-400 my-5" />
              <div class=" flex items-center justify-between">
                <button class="btn bg-transparent px-6 py-4">
                  <i class="fa-regular fa-thumbs-up"></i>
                </button>
                <button
                  class="btn font-bold text-teal-800 text-xl bg-transparent px-6 py-4"
                >
                  Adopt
                </button>
                <button
                  class="btn font-bold text-teal-800 text-xl bg-transparent px-6 py-4"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
    `;
    petContainer.appendChild(div);
  });
};

const displayRandomImg = (pet) => {
  console.log(pet);
  const asideImages = document.querySelector("#asideImages");
  asideImages.innerHTML = "";

  const pets = pet.pets;

  // random 4 images
  const randomPets = pets.sort(() => 0.5 - Math.random()).slice(0, 6);

  randomPets.forEach((pet) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <img 
        src="${pet.image}" 
        class="w-full h-28 object-cover rounded-lg"
      />
    `;
    asideImages.appendChild(div);
  });
};

loadCategories();
loadPets("cat");
loadRandomImages();
