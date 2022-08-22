const monsterContainer = document.getElementById('monster-container')
let currentPage = 1;

document.getElementById('new-monster').addEventListener('submit', createNewMonster)

document.getElementById('forward').addEventListener('click', () => goToPage(currentPage + 1));

document.getElementById('back').addEventListener('click', () => goToPage(currentPage - 1));

getMonsters();

//------------helper functions-------------

function getMonsters() {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${currentPage}`)
    .then(
        function(response) {
            if (response.status !==200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                return;
            }
            response.json().then(function(data) {
                //console.log(data)
                displayMonsters(data);
            });
        }
    )
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
}

function displayMonsters(monsters) {
    monsterContainer.innerHTML = '';
    monsters.forEach(displayNewMonster);   
  }
    
function createNewMonster(event) {
    event.preventDefault();
    const newMonster = {
        name: event.target.name.value,
        age: event.target.age.value,
        description: event.target.description.value
    }
    fetch('http://localhost:3000/monsters', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
       Accept: 'application/json'
    },
    body: JSON.stringify(newMonster)
  }).then(response => response.json())
    .then(json => displayNewMonster(json));
}

function displayNewMonster(monster) {
      const h2 = document.createElement('h2');
      h2.innerHTML = 'Name: ' + monster.name;
      monsterContainer.appendChild(h2);
      const p = document.createElement('p');
      p.innerHTML = 'Age: ' + monster.age;
      monsterContainer.appendChild(p);
      const p1 = document.createElement('p');
      p1.innerHTML = 'Bio: ' + monster.description;
      monsterContainer.appendChild(p1);
}

function goToPage(page) {
    currentPage = page < 1 ? 1 : page;
    getMonsters();
}

//https://www.youtube.com/watch?v=l2LZHykUd-A&list=PLyAztG23eM7OyS9cVTnZ6NMlwvz4LB9_m&index=10




