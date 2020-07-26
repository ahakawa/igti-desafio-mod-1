let userFound = null;
let statistics = null;
let allUsers = [];
let inputSearch = "";
let letters = "";
let result = "";
let listaUsers = [];
let sumAges = "";
let totalUsers = 0;

userFound = document.querySelector("#userFound");
statistics = document.querySelector("#statistics");
let buttonSearch = document.querySelector("#buttonSearch");
inputSearch = document.querySelector(".inputSearch");
let userDiv = document.querySelector(".user");

function start() {
  hideSpinner();
  fetchUsers();
  enableButton();
}

function hideSpinner() {
  setTimeout(() => {
    console.log("promiseUsers resolvida");
    const spinner = document.querySelector("#spinner");
    spinner.classList.add("hide");
  }, 6000);
}

async function fetchUsers() {
  // const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
  const res = await fetch("http://localhost:3000/results");
  const json = await res.json();

  allUsers = json.map((user) => {
    const {
      gender,
      name: { first, last },
      dob: age,
      picture: thumbnail,
    } = user;
    return {
      nome: `${first} ${last}`,
      sexo: gender,
      idade: age.age,
      foto: thumbnail.thumbnail,
    };
  });

  console.log(allUsers, "todosss");
}

function enableButton(event) {
  inputSearch.addEventListener("keyup", (event) => {
    letters = inputSearch.value;
    console.log(letters, "letras");
    if (letters !== "") {
      buttonSearch.removeAttribute("disabled");
      const { key } = event;
      if (key == "Enter") {
        search();
      }
    } else {
      buttonSearch.setAttribute("disabled", "disabled");
    }
  });
  triggerSearchButton();
}

function triggerSearchButton() {
  buttonSearch.addEventListener("click", search);
}

function search() {
  listaUsers = allUsers.filter((user) => {
    return user.nome.toLowerCase().includes(letters.toLowerCase());
  });
  listaUsers.sort((a, b) => a.nome.localeCompare(b.nome));

  console.log(listaUsers, "buscares");
  renderUser();
}

function renderUser() {
  totalUsers = listaUsers.length;
  console.log(totalUsers, "total usuarios");
  console.log(listaUsers, "listausuarios");

  if (listaUsers == false) {
    let usersHTML = `
        <h2>
            Nenhum usuário filtrado!         
        </h2>
        `;
    userFound.innerHTML = usersHTML;

    statistics.innerHTML;
    let statiticsHTML = `
                <h2>
                    Nenhuma estatística!     
                </h2>
                `;
    statistics.innerHTML = statiticsHTML;
  } else {
    let usersHTML = `
        <h2>
            ${totalUsers} usuário(s) encontrado(s)         
        </h2>
        `;
    listaUsers.forEach((user) => {
      const { nome, idade, foto } = user;

      const userHTML = `
             <div class='user'>
                 <div>
                     <img src="${foto}" alt="${nome}"> 
                     ${nome}, ${idade}
                 </div>
             </div>
             `;
      usersHTML += userHTML;
    });
    usersHTML += "</div>";
    userFound.innerHTML = usersHTML;

    statisticsUsers();
  }
}

function statisticsUsers() {
  let totalMen = listaUsers.filter((user) => user.sexo == "male").length;
  let totalWomen = listaUsers.filter((user) => user.sexo == "female").length;
  idade = listaUsers.idade;
  sumAges = listaUsers
    .map((user) => user.idade)
    .reduce((acc, idade) => acc + idade);
  let mediaAges = (sumAges / totalUsers).toFixed(2);

  let statiticsHTML = `
            <h2>Estatísticas</h2>
            <ul>
            <li>Sexo masculino:<strong> ${totalMen}</strong></li>
            <li>Sexo feminino:<strong> ${totalWomen}</strong></li>
            <li>Soma das idades:<strong> ${sumAges}</strong></li>
            <li>Média das idades:<strong> ${mediaAges}</strong></li>
            </ul>
            `;
  statistics.innerHTML = statiticsHTML;

  console.log(listaUsers, "userdalista");
}

start();
