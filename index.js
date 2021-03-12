const URL = 'https://phone-agenda-dany0913.herokuapp.com/api/persons/all';
const getPost = async() => {
    try {
        const res = await fetch(URL);   
        const users = await res.json(); // mirar status y code
        users.forEach(user => {
            displayUser(user);
        });    
    } catch (error) {
        console.log(error);
    }
}

getPost();

const btnSearch = document.getElementById("btn-search");
const mainUl = document.querySelector(".mainUl");
const userForm = document.getElementById("user-form")

function displayUser(user){
    console.log(user);
    const li = document.createElement("li");
    li.className="li";
    const divGeneral = document.createElement("div");
    divGeneral.className="div-general";
    const divUser = document.createElement("div");
    divUser.className="div-user";
    const divName = document.createElement("div");
    divName.className="div-name";
    const span = document.createElement("span");
    const img = document.createElement("img");
    const hr = document.createElement("hr");
    img.src=user.picture;
    img.className="user-photo"; //set attribute
    const userName = document.createElement("h2");
    const userRole = document.createElement("h4");
    let captureStatus="";
    if(user.isActive){
        captureStatus = document.createTextNode("Available");
    }else{
        captureStatus = document.createTextNode("Not available yet");
    }
    const captureUserName = document.createTextNode(`${user.userName}`);
    const captureUserRole = document.createTextNode(user.number);
    divGeneral.id="divGeneral"+user.userName;


    span.appendChild(captureStatus);
    userName.appendChild(captureUserName);
    userRole.appendChild(captureUserRole);
    
    divName.append(userName,userRole);
    divUser.append(img,divName);
    divGeneral.append(divUser,span);
    li.append(divGeneral,hr);
    mainUl.appendChild(li);
    userName.appendChild(captureUserName);
}
function displayUser2(user){
    const li = document.createElement("li");
    li.className="li";
    const divGeneral = document.createElement("div");
    divGeneral.className="div-general";
    const divUser = document.createElement("div");
    divUser.className="div-user";
    const divName = document.createElement("div");
    divName.className="div-name";
    const span = document.createElement("span");
    const img = document.createElement("img");
    const hr = document.createElement("hr");
    img.src=user.picture;
    img.className="user-photo"; //set attribute
    const userName = document.createElement("h2");
    const userRole = document.createElement("h4");
    let captureStatus="";
    if(user.isActive){
        captureStatus = document.createTextNode("Available");
    }else{
        captureStatus = document.createTextNode("Not available yet");
    }
    const captureUserName = document.createTextNode(`${user.name.first} ${user.name.last}`);
    const captureUserRole = document.createTextNode(user.company);
    
    span.appendChild(captureStatus);
    userName.appendChild(captureUserName);
    userRole.appendChild(captureUserRole);
    
    divName.append(userName,userRole);
    divUser.append(img,divName);
    divGeneral.append(divUser,span);
    li.append(divGeneral,hr);
    mainUl.appendChild(li);
    userName.appendChild(captureUserName);
}

const fnBtnListShow = (evt)=>{
    bntShow.style.display='none';
    bntHide.style.display='initial';
    mainUl.style.display='initial';
    userForm.style.display='none';
    console.log("Botón mostrar");

};
const fnBtnListHide = (evt)=>{
    bntShow.style.display='initial';
    bntHide.style.display='none';
    mainUl.style.display='none';
    userForm.style.display='initial';
    console.log("Botón ocultar");
};
const fnBtnSearch = (evt)=>{
    evt.preventDefault();
    let inputName=document.getElementById("userName").value;
    let inputLastName=document.getElementById("userLastName").value;
    let inputCompany=document.getElementById("userCompany").value;
    if (!inputName) {
        alert("Por favor ingresa el nombre del usuario");
     }
    //  else if (!inputLastName){
    //     alert("Por favor ingresa el apellido del usuario");
    //  }
     else if (!inputCompany){
        alert("Por favor ingresa la compañía donde labora del usuario");
     }else{
        // const user = {
        //     "name": {
        //         "first": inputName,
        //         "last": inputLastName
        //         },
        //         "company": inputCompany,
        //         "picture": "https://i.pinimg.com/736x/0c/db/ca/0cdbcaab26c5d8f0bc8f2c5248d0695c.jpg",
        //         "isActive": true
    
        // }
        const user = {
            "userName":inputName,
            "number":inputCompany
        }
        displayUser(user);
        alert(`Se ha agregado el usuario ${inputName} ${inputLastName} que trabaja en ${inputCompany}`);
        createUser(user);
     } 
};
const createUser = async (newUser) => {
    const options = {
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser)
    }
    const res = await fetch(URL,options);
    
}

bntShow.addEventListener('click',fnBtnListShow);
bntHide.addEventListener('click',fnBtnListHide);
userForm.addEventListener('submit',fnBtnSearch);
