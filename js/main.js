let rowData = document.getElementById("rowData");
let SearchContainer = document.getElementById("SearchContainer");
let submitBtn;


function openSideNav() {
     $(".side-nav-menu").animate({left:0},500);

        $("i.open-close-icon").removeClass("fa-align-justify");
        $("i.open-close-icon").addClass("fa-x");

        $(".links li").eq(0).animate({top:0},500);
        $(".links li").eq(1).animate({top:0},600);
        $(".links li").eq(2).animate({top:0},700);
        $(".links li").eq(3).animate({top:0},800);
        $(".links li").eq(4).animate({top:0},900);
}

function closeSideNav() {
    let boxWidth = $(".side-nav-menu .nav-tab").outerWidth();
     $(".side-nav-menu").animate({left:"-256.562"},500);

        $("i.open-close-icon").addClass("fa-align-justify");
        $("i.open-close-icon").removeClass("fa-x");

        $(".links li").animate({top:300},500);
}

closeSideNav()
$(".side-nav-menu i.open-close-icon ").click(()=>{
    if($(".side-nav-menu").css("left") == "0px"){
       closeSideNav()
    }
    else{
       openSideNav()
    }
})


function displayMeals(arr) {
   let cartoona = "";
   for (let i = 0; i < arr.length; i++) {
      cartoona +=`
         <div class="col-md-3">
               <div onclick="getMealDetails('${arr[i].idMeal}')"  class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                  <img class="w-100" src="${arr[i].strMealThumb}" alt="">
                  <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                     <h3 class="text-center">${arr[i].strMeal}</h3>
                  </div>
               </div>
         </div>
      
      `
      
   }
   rowData.innerHTML = cartoona
}



SearchByName("")


async function getCategories () {
   rowData.innerHTML = ""
   $(".inner-loading-screen").fadeIn(100)
   SearchContainer.innerHTML = "";
   

   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)

   response = await response.json()
   displyCategories(response.categories);
   $(".inner-loading-screen").fadeOut(100)
}

function displyCategories(arr){

   let cartoona = "";
   for (let i = 0; i < arr.length; i++) {
      cartoona +=`
         <div class="col-md-3">
               <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                  <img class="w-100" src="${arr[i].strCategoryThumb}" alt="">
                  <div class="meal-layer position-absolute text-center text-black p-2">
                     <h3 class="text-center">${arr[i].strCategory}</h3>
                     <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                  </div>
               </div>
         </div>
      
      `
      
   }
   rowData.innerHTML = cartoona
   
}



async function getArea() {
   SearchContainer.innerHTML = "";
   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
   response = await response.json()
   console.log(response.meals);
   displayArea(response.meals)
}

function displayArea(arr){

    let cartoona = "";
   for (let i = 0; i < arr.length; i++) {
      cartoona +=`
         <div class="col-md-3">
               <div onclick="getAreaMeals('${arr[i].strArea}')" class=" rounded-2 text-center cursor-pointer">
                  
                  <i class="fa-solid fa-house-laptop fa-4x"></i>
                  <h3 class="text-center">${arr[i].strArea}</h3>
               
               </div>
         </div>
      
      `
      
   }
   rowData.innerHTML = cartoona
   
   
}

async function getIngredients() {
   SearchContainer.innerHTML = "";
   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
   response = await response.json()
   console.log(response.meals);
   displayIngredients(response.meals.slice(0,20))
}


function displayIngredients(arr){

    let cartoona = "";
   for (let i = 0; i < arr.length; i++) {
      cartoona +=`
         <div class="col-md-3">
               <div onclick = "getIngredienMeals('${arr[i].strIngredient}')" class=" rounded-2 text-center cursor-pointer">
                  
                  <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                  <h3 class="text-center">${arr[i].strIngredient}</h3>
                  <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ") }</p>
               </div>
         </div>
      
      `
      
   }
   rowData.innerHTML = cartoona
   
   
}

async function getCategoryMeals(category) {
   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
   response = await response.json();
   console.log(response)
   displayMeals(response.meals.slice(0,20))
}


async function getAreaMeals(area) {
   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
   response = await response.json();
   console.log(response)
   displayMeals(response.meals.slice(0,20))
}




async function getIngredienMeals(ingredien) {
   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredien}`)
   response = await response.json();
   console.log(response)
   displayMeals(response.meals.slice(0,20))
}

async function getMealDetails(mealID) {
   SearchContainer.innerHTML = "";
   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
   response =await response.json();
   displayMealsDetails(response.meals[0]);
}


function displayMealsDetails(meal) {
   SearchContainer.innerHTML = "";

   let ingredients = `` 


   for (let i = 0; i < 20; i++) {
      if(meal[`strIngredient${i}`]){
         ingredients += ` <li class="alert alert-info m-2 p-2"> ${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        
      }
   }

   let tags = meal.strTags?.split(",")
   if(!tags) tags = []

   let tagsStr =''

   for(let i =0; i < tags.length; i++ ){
      tagsStr += `
      <li class="alert alert-danger m-2 p-2">${tags[i]}</li>
      `
   }

   let cartoona = `
            <div class="col-md-4">
            <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
            <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
               <h2>Instructions</h2>
               <p>${meal.strInstructions}</p>
               <h3> <span class="fw-bolder">Area : </span>${meal.strArea}</h3>
               <h3> <span class="fw-bolder">category : </span>${meal.strCategory}</h3>
               <h3>Recipes : </h3>
               <ul class="list-unstyled d-flex gap-3 flex-wrap">
                  ${ingredients}
               </ul>
               <h3>Tage :</h3>

               <ul class="list-unstyled d-flex gap-3 flex-wrap">
                  ${tagsStr}
               </ul>
               <a target="_blank" href="${meal.strSource}" class="btn btn-success">source</a >
               <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a >
            </div>
   `
   rowData.innerHTML = cartoona 
}



function showSearchInputs() {
   SearchContainer.innerHTML = `
   <div class="row py-4 ">
         <div class="col-md-6">
            <input onkeyup="SearchByName(this.value)" class="form-control bg-transparent text-white" type="" placeholder="Search By Name">
         </div>
         <div class="col-md-6">
            <input onkeyup="SearchByFlitter(this.value)" maxlenght="1" class="form-control bg-transparent text-white" type="" placeholder="Search By Frist Litter">
         </div>
   </div>
   `
   rowData.innerHTML = ""
}


async function SearchByName(term) {
   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
   response = await response.json();
   
   response.meals?displayMeals(response.meals) : displayMeals([]);
}


async function SearchByFlitter(term) {
   term == "" ? term ="a":""
   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
   response = await response.json();
   
   response.meals?displayMeals(response.meals) : displayMeals([]);
}


function showContacts() {

   rowData.innerHTML=`
               <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
                  <div class="container w-75 text-center">
                     <div class="row g-3">
                        <div class="col-md-6">
                           <input id="nameInput" onkeyup="inputsValidation()" class="form-control" placeholder="Enter Your Name" type="text">
                           <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                              Special characters and numbers not allowed
                           </div>
                        </div>
                        <div class="col-md-6">
                           <input id="emailInput" onkeyup="inputsValidation()" class="form-control" placeholder="Enter Your Email" type="email">
                           <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                              Email not valid *exemple@yyy.zzz
                           </div>
                        </div>
                        <div class="col-md-6">
                           <input id="phoneInput" onkeyup="inputsValidation()" class="form-control" placeholder="Enter Your Phone" type="text">
                           <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                              Enter valid Phone Number
                           </div>
                        </div>
                        <div class="col-md-6">
                           <input id="ageInput" onkeyup="inputsValidation()" class="form-control" placeholder="Enter Your Age" type="number">
                           <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                              Enter valid age
                           </div>

                        </div>
                        <div class="col-md-6">
                           <input id="passwordInput" onkeyup="inputsValidation()" class="form-control" placeholder="Enter Your Password" type="password">
                           <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                              Enter valid password *Minimum eight characters, at least one letter and one number:*
                           </div>
                        </div>
                        <div class="col-md-6">
                           <input id="repasswordInput" onkeyup="inputsValidation()" class="form-control" placeholder="Repassword" type="password">
                           <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                              Enter valid repassword 
                           </div>
                        </div>
                     </div>
                     <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3 ">sumbit</button>
                  </div>
               </div> 
   `
   submitBtn = document.getElementById("submitBtn");






}




   document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("nameInput");
  if (nameInput) {
    nameInput.addEventListener("focus", () => {
      nameInputTouched = true;
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("emailInput");
  if (emailInput) {
    emailInput.addEventListener("focus", () => {
      emailInputTouched = true;
    });
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const phoneInput = document.getElementById("phoneInput");
  if (phoneInput) {
    phoneInput.addEventListener("focus", () => {
      phoneInputTouched = true;
    });
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const ageInput = document.getElementById("ageInput");
  if (ageInput) {
    ageInput.addEventListener("focus", () => {
      ageInputTouched = true;
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.getElementById("passwordInput");
  if (passwordInput) {
    passwordInput.addEventListener("focus", () => {
      passwordInputTouched = true;
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const repasswordInput = document.getElementById("repasswordInput");
  if (repasswordInput) {
    repasswordInput.addEventListener("focus", () => {
      repasswordInputTouched = true;
    });
  }
});




let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;





function inputsValidation() {

   if (nameInputTouched) {
      if (nameValidation()) {
      document.getElementById("nameAlert").classList.replace("d-block","d-none")
      }else{
      document.getElementById("nameAlert").classList.replace("d-none","d-block")
      }
   }

   if (emailInputTouched) {
      if (emailValidation()) {
      document.getElementById("emailAlert").classList.replace("d-block","d-none")
      }else{
      document.getElementById("emailAlert").classList.replace("d-none","d-block")
      }

   }

   if (phoneInputTouched) {
      if (phoneValidation()) {
      document.getElementById("phoneAlert").classList.replace("d-block","d-none")
      }else{
      document.getElementById("phoneAlert").classList.replace("d-none","d-block")
      }

   }

   if (ageInputTouched) {
      if (ageValidation()) {
      document.getElementById("ageAlert").classList.replace("d-block","d-none")
      }else{
      document.getElementById("ageAlert").classList.replace("d-none","d-block")
      }
   }


   if (passwordInputTouched) {
      if (passwordValidation()) {
      document.getElementById("passwordAlert").classList.replace("d-block","d-none")
      }else{
      document.getElementById("passwordAlert").classList.replace("d-none","d-block")
      }
   }


   if (repasswordInputTouched) {
      if (repasswordValidation()) {
      document.getElementById("repasswordAlert").classList.replace("d-block","d-none")
      }else{
      document.getElementById("repasswordAlert").classList.replace("d-none","d-block")
      }
   }



   if(nameValidation()&&
   emailValidation()&&
   phoneValidation()&&
   ageValidation()&&
   passwordValidation()&&
   repasswordValidation()){
      submitBtn.removeAttribute("disabled")
   }else{
      submitBtn.setAttribute("disabled",true)
   }
}

function nameValidation() {
   return/^[a-zA-Z\-]+$/.test(document.getElementById("nameInput").value);

}

function emailValidation() {
   return/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value)

}

function phoneValidation() {
   return/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/.test(document.getElementById("phoneInput").value);

}


function ageValidation() {
   return/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value);

}

function passwordValidation() {
   return/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{7,}$/.test(document.getElementById("passwordInput").value);

}



function repasswordValidation() {
   return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value;

}



























 