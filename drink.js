const cocktail_api_endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const drink_id_api = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';



/*Funzione che inserisce il drink italiano preferito*/
function onJsonNegroni(json)
{
  const library_f=document.querySelector('#drink');
  library_f.innerHTML='';
  const favorit=document.createElement('h1');
  favorit.innerHTML='My favourite italian drink';

  

  
  const drinks=json.drinks;
  for ( const drink of drinks)
  {
    const immDrink=drink.strDrinkThumb;

    const album=document.createElement('div');
    album.classList.add('album');

    const title=document.createElement('h2');
    title.textContent=drink.strDrink;
    title.classList.add('titles');
  
      const image = document.createElement('img');
        image.classList.add('images');
      image.dataset.idDrink = drink.idDrink; 
       image.src = immDrink;



       const title_ingredient = document.createElement('h3');
       title_ingredient.textContent = 'Ingredients:';
       title_ingredient.classList.add('title_ingredients_instruction');

       const ingredientilista = document.createElement('div');
    ingredientilista.classList.add('ingredienti');
    for (let i = 1; i <= 20; i++) {
      const ingredienti = drink['strIngredient' + i];
      const misure = drink['strMeasure' + i];
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
title_instruction.textContent = 'Instruction:';
    
    const instruction = document.createElement('p');
    instruction.textContent = drink.strInstructions;

  
  

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




function onJsonBellini(json)
{
  console.log('spritz');
  const library_f=document.querySelector('#drink');
    
 
  const drinks=json.drinks;
  for ( const drink of drinks)
  {
    const immDrink=drink.strDrinkThumb;

    const album=document.createElement('div');
    album.classList.add('album');

    const title=document.createElement('h2');
    title.textContent=drink.strDrink;
    title.classList.add('titles');
  
      const image = document.createElement('img');
        image.classList.add('images');
      image.dataset.idDrink = drink.idDrink; 
       image.src = immDrink;



       const title_ingredient = document.createElement('h3');
       title_ingredient.textContent = 'Ingredients:';
       title_ingredient.classList.add('title_ingredients_instruction');

       const ingredientilista = document.createElement('div');
    ingredientilista.classList.add('ingredienti');
    for (let i = 1; i <= 20; i++) {
      const ingredienti = drink['strIngredient' + i];
      const misure = drink['strMeasure' + i];
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
title_instruction.textContent = 'Instruction:';
    
    const instruction = document.createElement('p');
    instruction.textContent = drink.strInstructions;

  
  

    album.appendChild(title);
    album.appendChild(image);
    album.appendChild(title_ingredient);
    album.appendChild(ingredientilista);
    album.appendChild(title_instruction);
    album.appendChild(instruction);

    
    library_f.appendChild(album);
    
  }

}



// Funzione per visualizzare i drink
function onJsonDrink(json) {
    console.log('JSON ricevuto');
   
    const errore=document.querySelector('#er');
    const library = document.querySelector("#album-view");
    errore.innerHTML='';
    const rimuovi = document.querySelector('.opaco');
    library.innerHTML = "";
    
    console.log(json);
  
 

      if (json.drinks === null) {
        const error = document.createElement('p');
       
        error.textContent = 'No drinks found';
        rimuovi.classList.remove('opacity');
       errore.appendChild(error);
         error.classList.add('errore');
        setTimeout(function() {
          errore.removeChild(error);
        }, 5000);
        
        return;
      }

      
  rimuovi.classList.add('opacity');
 
    const drinks = json.drinks;
    for (const drink of drinks) {
      // Prendi l'immagine
      const immUrl = drink.strDrinkThumb;
  
      const album = document.createElement('div');
      album.classList.add('single_recipe');
  
      const title = document.createElement('h2');
      title.textContent = drink.strDrink;
      title.classList.add('title_recipe');
  
      const image = document.createElement('img');
      image.src = immUrl;
      image.classList.add('images');
      image.dataset.idDrink = drink.idDrink; // Imposta l'attributo data-id-drink con l'ID del drink
  
      // Aggiungi l'event listener all'immagine
      image.addEventListener('click', apridrink);
  
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
    closeButton.addEventListener('click', function() {
      library.innerHTML = "";
      rimuovi.classList.remove('opacity');
    });
  }



 /*Funzione che quando clicclo sulla foto della drink fa una richeista per recuperare tutti i dati */
function apridrink(event) {
    const image = event.currentTarget;
    const drinkId = image.dataset.idDrink; // Recupera l'ID del drink dall'attributo data-id-drink dell'immagine
    
    // Esegui la richiesta GET per ottenere i dettagli del drink
    const url = drink_id_api + drinkId;
    fetch(url)
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(onJsonDrinkDetails)
      .catch(function(error) {
        console.error(error);
        alert('Impossibile recuperare i dettagli del drink');
      });
  }

  
// Funzione per visualizzare i dettagli di un drink
function onJsonDrinkDetails(json) {
  const library = document.querySelector("#album-view");
  const elements = document.querySelectorAll('#album-view div');
  for (let i = 0; i < elements.length; i++) {
  elements[i].classList.add('opacity');
  }
  const x = document.querySelector('#album-view span');
  x.classList.add('opacity');
  const drink = json.drinks[0];
  const detailsContainer = document.createElement('div');
detailsContainer.classList.add('recipe_details');
const title=document.createElement('h2');
title.textContent=drink.strDrink;
title.classList.add('title_recipe_open');

const immDrink=drink.strDrinkThumb;
const image = document.createElement('img');
image.classList.add('images');
image.dataset.idDrink = drink.idDrink; 
image.src = immDrink;

const title_ingredient = document.createElement('h3');
title_ingredient.textContent = 'Ingredients:';
title_ingredient.classList.add('title_ingredients_instruction');

const ingredientilista = document.createElement('div');

for (let i = 1; i <= 15; i++) {
  const ingredienti = drink['strIngredient' + i];
  const misure = drink['strMeasure' + i];
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
instruction.textContent = drink.strInstructions;
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
