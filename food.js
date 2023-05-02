// KEY AND ENDPOINT PER TheMealDb
const key = 1;
const meal_api_endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s='; //ricerca meal per nome
const meal_api_id = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='; // ricerca il meal per id
const ingredientImgBaseUrl = 'https://www.themealdb.com/images/ingredients/';
const ingredientImgExtension = '.png';

//Aggiungo l'eventListener al form per la ricerca 
const form = document.querySelector('#search_recipe');
console.log(form);
form.addEventListener('submit', search);



//Quando si apre la pagina carica il cibo e la bevanda preferita nella homepage*/
window.onload = function () {
    const url_pizza = meal_api_endpoint + "pizza";
    const url_negroni = cocktail_api_endpoint + "Garibaldi Negroni";
    const url_bellini = cocktail_api_endpoint + "Bellini";


    fetch(url_pizza)
        .then(onResponse)
        .then(onJsonPizzaRecipe);
  
        fetch(url_negroni)
        .then(onResponse)
        .then(onJsonNegroni);

    fetch(url_bellini)
        .then(onResponse)
        .then(onJsonBellini);

}


/*Funzione che inserisce il cibo  italiano preferito*/
function onJsonPizzaRecipe(json) {
    console.log('JSON ricevuto');
    console.log(json, 'pizza');

    const library_f = document.querySelector('#food');
    const favorit = document.createElement('h1');
    favorit.innerHTML = 'My favourite italian food';


    library_f.innerHTML = '';
    const meals = json.meals;
    for (const meal of meals) {
        const immUrl = meal.strMealThumb;

        const album = document.createElement('div');
        album.classList.add('album');

        const title = document.createElement('h2');
        title.textContent = meal.strMeal;
        title.classList.add('titles');

        const image = document.createElement('img');
        image.classList.add('images');
        image.dataset.mealId = meal.idMeal;
        image.src = immUrl;

        const title_ingredient = document.createElement('h3');
        title_ingredient.textContent = 'Ingredients:';
        title_ingredient.classList.add('title_ingredients_instruction')
            ;
        const ingredientilista = document.createElement('div');
        ingredientilista.classList.add('ingredienti');
        for (let i = 1; i <= 20; i++) {
            const ingredienti = meal['strIngredient' + i];
            const misure = meal['strMeasure' + i];
            if (!ingredienti) {
                break;
            }
            const ingredientItem = document.createElement('div');
            ingredientItem.classList.add('ingredient');

            const ingredientImg = document.createElement('img');
            ingredientImg.src = ingredientImgBaseUrl + ingredienti + ingredientImgExtension;
            ingredientImg.classList.add('ingredient-image');

            const ingredientName = document.createElement('span');
            ingredientName.textContent = ingredienti + ' ';
            ingredientName.classList.add('ingredient-name');

            const measure = document.createElement('span');
            measure.textContent = misure;
            measure.classList.add('ingredient-measure');

            ingredientItem.appendChild(ingredientImg);
            ingredientItem.appendChild(ingredientName);
            ingredientItem.appendChild(measure);
            ingredientilista.appendChild(ingredientItem);
        }

        const title_instruction = document.createElement('h3');
        title_instruction.textContent = 'Instruction:';
        title_instruction.classList.add('title_ingredients_instruction');
        const instruction = document.createElement('p');
        instruction.textContent = meal.strInstructions;
        instruction.classList.add('instruction');

        album.appendChild(title);
        album.appendChild(image);
        album.appendChild(title_ingredient);
        album.appendChild(ingredientilista);
        album.appendChild(title_instruction);
        album.appendChild(instruction);
        library_f.appendChild(favorit);
        library_f.appendChild(album);
    }
}



//Funzione di ricerca
function search(event) {
    // Impediamo comportamento di default del submit
    event.preventDefault();

    // Leggi valore del campo di testo
    const content = document.querySelector('#content').value;
    console.log(content);

    //verifico che ho inserito il testo
    if (content) {
        const text = encodeURIComponent(content);
        console.log('Eseguo ricerca elementi riguardanti: ' + text);


        //leggi l'opzione della scelta
        const tipo = document.querySelector('#tipo').value;
        console.log('Ricerco elementi di tipo: ' + tipo);

        if (tipo === "Food") {
            // Esegui la richiesta GET all'API MealDB
            const mealUrl = meal_api_endpoint + text + '&api_key=' + key;
            fetch(mealUrl)
                .then(onResponse)
                .then(onJsonRecipe);
        }
        else if (tipo === 'Drinks') {// Esegui la richiesta GET all'API TheCocktailDB
            const drinkUrl = cocktail_api_endpoint + text + '&api_key=' + key;
            fetch(drinkUrl)
                .then(onResponse)
                .then(onJsonDrink);




        } else {
            //se non ho scritto nel riquadro mi da un alert 
            alert("Inserisci il testo per cui effettuare la ricerca");
        }
    }
}



/*Funzione che ritorna tutte le foto delle ricette trovate*/
function onJsonRecipe(json) {
    console.log('JSON ricevuto');

    const errore=document.querySelector('#er');
    const library = document.querySelector("#album-view");
    const rimuovi = document.querySelector('.opaco');
    library.innerHTML = "";

    console.log(json);

    if (json.meals === null) {
        const error = document.createElement('p');

        error.textContent = 'No food found';
        rimuovi.classList.remove('opacity');
        errore.appendChild(error);
          error.classList.add('errore');
         setTimeout(function() {
           errore.removeChild(error);
        }, 5000);

        return;
    }


    rimuovi.classList.add('opacity');

    const meals = json.meals;
    for (const meal of meals) {
        //prendo l'immagine
        const immUrl = meal.strMealThumb;

        const album = document.createElement('div');
        album.classList.add('single_recipe');

        const title = document.createElement('h2');
        title.textContent = meal.strMeal;
        title.classList.add('title_recipe');

        const image = document.createElement('img');
        image.src = immUrl;
        image.classList.add('images');
        image.dataset.mealId = meal.idMeal; //imposto l'attributo data-meal-id con l'ID del piatto

        // Aggiungi event listener all'immagine
        image.addEventListener('click', apriricetta);


        album.appendChild(title);
        album.appendChild(image);
        library.appendChild(album);

    }

    // Aggiungi il pulsante di chiusura
    const closeButton = document.createElement('span');
    closeButton.classList.add('close-button');
    closeButton.innerHTML = '&times;';

    library.appendChild(closeButton);

    // Aggiungi l'event listener al pulsante di chiusura
    closeButton.addEventListener('click', function () {
        library.innerHTML = "";
        rimuovi.classList.remove('opacity');
    });
}



/*Funzione che quando clicclo sulla foto della ricetta fa una richeista per recuperare tutti i dati */
function apriricetta(event) {
    const image = event.currentTarget;
    const mealId = image.dataset.mealId; //recupero l'ID del piatto dall'attributo data-meal-id dell'immagine

    // Esegui la richiesta GET per ottenere i dettagli del piatto
    const url = meal_api_id + mealId;
    fetch(url)
        .then(onResponse)
        .then(onJsonMealDetails)
        .catch(function (error) {
            console.error(error);
            alert('Impossibile recuperare i dettagli della ricetta');
        });
}

//Funzione che apre la ricetta 
function onJsonMealDetails(json) {
    const library = document.querySelector("#album-view");
    const elements = document.querySelectorAll('#album-view div');
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.add('opacity');
    }
    const x = document.querySelector('#album-view span');
    x.classList.add('opacity');
    const meal = json.meals[0];
  
    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('recipe_details');
    const title=document.createElement('h2');
    title.textContent=meal.strMeal;
    title.classList.add('title_recipe_open');
  
    const immMeal=meal.strMealThumb;
    const image = document.createElement('img');
    image.classList.add('images');
    image.dataset.idMeal = meal.idMeal; 
    image.src = immMeal;
  
    const title_ingredient = document.createElement('h3');
    title_ingredient.textContent = 'Ingredients:';
    title_ingredient.classList.add('title_ingredients_instruction');
  
    const ingredientilista = document.createElement('div');
    
    for (let i = 1; i <= 20; i++) {
      const ingredienti = meal['strIngredient' + i];
      const misure = meal['strMeasure' + i];
      if (!ingredienti) {
        break;
      }
  
      const ingredientItem = document.createElement('div');
      ingredientItem.classList.add('ingredient');
  
      const ingredientImg = document.createElement('img');
      ingredientImg.src = ingredientImgBaseUrl + ingredienti + ingredientImgExtension;
      ingredientImg.classList.add('ingredient-image');
  
      const ingredientName = document.createElement('span');
      ingredientName.textContent = ingredienti + ' ';
      ingredientName.classList.add('ingredient-name');
  
      const measure = document.createElement('span');
      measure.textContent = misure;
      measure.classList.add('ingredient-measure');
  
      ingredientItem.appendChild(ingredientImg);
      ingredientItem.appendChild(ingredientName);
      ingredientItem.appendChild(measure);
      ingredientilista.appendChild(ingredientItem);
    }
  
    const title_instruction=document.createElement('h3');
    title_instruction.classList.add('title_ingredients_instruction');
    title_instruction.textContent = 'Instructions:';
  
    const instruction = document.createElement('p');
    instruction.textContent = meal.strInstructions;
    instruction.classList.add('instruction')
  
    const backButton = document.createElement('button');
    backButton.textContent = 'Back';
    backButton.classList.add('back-button');
  
    detailsContainer.appendChild(title)
    detailsContainer.appendChild(title_ingredient);
    detailsContainer.appendChild(ingredientilista);
    detailsContainer.appendChild(title_instruction);
    detailsContainer.appendChild(instruction);
    detailsContainer.appendChild(backButton);
  
    library.appendChild(detailsContainer);
    backButton.addEventListener('click', function () {
      detailsContainer.remove();
      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove('opacity');
      };
      x.classList.remove('opacity');
    });
  }



function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json(); //stampiamo il jeason per vedere quali parametri ha
}


const menuBtn = document.getElementById("menu");
const menuLinks = document.querySelector(".navbar-links");
const menua = document.querySelectorAll(".navbar-links a");

menuBtn.addEventListener("click", aprimenu);

function aprimenu(event) {
  console.log('ciao');
  const menuLinks = document.querySelector(".navbar-links");
  const menuLinksToggle = document.querySelector(".navbar-links ");
  const menuimgs = document.querySelectorAll(".navbar-links a img");
  menuLinks.classList.remove('navbar-links');

  for (let i = 0; i < menuimgs.length; i++) {
    menuimgs[i].classList.add('immggg');
  }

  for (let i = 0; i < menua.length; i++) {
    menua[i].classList.add('link');
   

  }

  setTimeout(function() {
    
    menuLinks.classList.add('navbar-links');
    for (let i = 0; i < menua.length; i++) {
      menua[i].classList.remove('link');
    }
  }, 5000);
}






