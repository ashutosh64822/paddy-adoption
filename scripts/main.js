const loadCategories = async () => {
  showLoader();
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories",
  );
  const data = await response.json();
  showCategories(data.categories);
  hideLoader();
};

const loadRandomImages = async () => {
  showLoader();
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets",
  );
  const data = await response.json();
  displayRandomImg(data);
  hideLoader();
};

const fetchPetId = async (id) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${id}`,
  );
  const data = await response.json();
  displayModal(data.petData);
};

const showCategories = (category) => {
  const categoryContaier = document.querySelector(".category-container");
  categoryContaier.innerHTML = "";

  category.forEach((cate, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <button 
        onclick='handleCategoryClick(this, "${cate.category}")'
        class="category-btn btn font-bold interFont text-xl md:text-2xl px-8 py-6 rounded-xl ${
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

const loadPets = async (categoryName = "cat") => {
  showLoader();
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`,
  );
  const data = await response.json();
  showPets(data.data);
  hideLoader();
};

const showPets = (data) => {
  const petContainer = document.querySelector("#petContainer");
  petContainer.innerHTML = "";
  if (data.length < 1) {
    document.getElementById("notFound").classList.remove("hidden");
  } else {
    document.getElementById("notFound").classList.add("hidden");
  }
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
                  class="btn font-bold text-teal-800 md:text-xl bg-transparent px-4 py-2"
                >
                  Adopt
                </button>
                <button
                  onclick = fetchPetId(${element.petId})
                  class="btn font-bold text-teal-800 md:text-xl bg-transparent px-4 py-2"
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
        class="w-full h-40 object-center object-cover rounded-lg "
      />
    `;
    asideImages.appendChild(div);
  });
};

const displayModal = (e) => {
  console.log(e);
  const detailsModal = document.getElementById("detailsModal");
  detailsModal.innerHTML = `
    <div class="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
          class="w-full object-fill object-center"
          src="${e.image}"
          alt="pet image" />
      </figure>
      <div class="card-body">
        <h2 class="card-title text-2xl font-bold ">${e.pet_name}</h2>
        <div class="grid grid-cols-2">
          <p class="text-stone-400"><i class="fa-solid fa-grip"></i> Breed: ${e.breed}</p>
          <p class="text-stone-400"><i class="fa-regular fa-calendar"></i> Birth: ${e.date_of_birth}</p>
          <p class="text-stone-400"><i class="fa-solid fa-mercury"></i> Gender: ${e.gender}</p>
          <p class="text-stone-400"><i class="fa-solid fa-dollar-sign"></i> Price : ${e.price}$</p>
        </div>
    
        <hr class="text-stone-400 my-1" />
        <h6 class = "interFont font-medium">Details information</h6>
        <p class = 'text-stone-400'>${e.pet_details}</p>
      </div>
      <div class='px-4 py-2'>
        <button 
          id="closeBtn" 
          class="bg-green-200 text-green-800 px-10 py-4 w-full border btn rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  `;
  detailsModal.showModal();
};

const showLoader = () => {
  document.querySelector(".loader").classList.remove("hidden");
};

const hideLoader = () => {
  document.querySelector(".loader").classList.add("hidden");
};

loadCategories();
loadPets();
loadRandomImages();
