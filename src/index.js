// Your code here
document.addEventListener('DOMContentLoaded', () => {
  
  getCharacters();

  function getCharacters() {
    fetch('https://flactuaries-tyra.vercel.app/characters')
      .then(response => response.json())
      .then(characters => {
        const characterBar = document.getElementById('character-bar');
        
        characters.forEach(character => {
          const span = document.createElement('span');
          span.textContent = character.name;
          span.addEventListener('click', function() {
            displayDetails(character.id); 
          });

          characterBar.appendChild(span);
        });
      });
  }

  
  function displayDetails(characterId) {
    fetch(`https://flactuaries-tyra.vercel.app/characters/${characterId}`) 
      .then(response => response.json())
      .then(character => {
        const Info = document.getElementById('detailed-info');
        document.getElementById('name').textContent = character.name;
        document.getElementById('image').src = character.image;
        document.getElementById('image').alt = character.name;
        document.getElementById('vote-count').textContent = character.votes;

        
        Info.setAttribute('data-character-id', character.id);
      });
  }

 
  const votesForm = document.getElementById('votes-form');
  votesForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const characterId = document.getElementById('detailed-info').getAttribute('data-character-id');
    const votesToAdd = parseInt(document.getElementById('votes').value);  


    if (isNaN(votesToAdd)) {
      alert("Please enter a valid number of votes.");
      return;
    }

    fetch(`https://flactuaries-tyra.vercel.app/characters/${characterId}`)
      .then(response => response.json())
      .then(character => {
        const newVoteCount = character.votes + votesToAdd;

        document.getElementById('vote-count').textContent = newVoteCount;

       event.target.reset()
      });
  });

  
  document.getElementById('reset-btn').addEventListener('click', function () {
    const characterId = document.getElementById('detailed-info').getAttribute('data-character-id');

    
    document.getElementById('vote-count').textContent = 0;
    fetch(`https://flactuaries-tyra.vercel.app/characters/${characterId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ votes: 0 })
    });
  });
});
