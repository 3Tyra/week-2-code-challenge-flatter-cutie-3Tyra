// Your code here
document.addEventListener("DOMContentLoaded", () => {
   });
  
 fetchCharacters();
 function fetchCharacters (){     
     fetch("http://localhost:3000/characters");
     then((response) => response.json());
 }

characters.forEach((character) => {
    const span = document.createElement("span");  
    span.textContent = character.name;             
    span.classList.add("character");               
   characterBar.appendChild(span);                
  });
  
