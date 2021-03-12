const URL = 'http://localhost:3001/jobs';
const mainUl = document.querySelector(".mainUl");
const userForm = document.getElementById("userSearchForm")


const getPost = async() => {
    try {
        const res = await fetch(URL);   
        const jobs = await res.json(); // mirar status y code
        jobs.forEach(job => {
            displayUser(job);
        });    
    } catch (error) {
        console.log(error);
    }
}
getPost();

const getPostFilter = async(param) => {
    try {
        const res = await fetch(`${URL}/filter/${param}`);   
        const jobs = await res.json();
        console.log(typeof jobs);
        if (Object.values(jobs).length>0) {
            fnClean();
            jobs.forEach(job => {
                displayUser(job);
            });    
        }else{
            alert("No se encontraron objetos con tu consulta");
        } 
    } catch (error) {
        console.log(error);
    }
}


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
    img.src=user.company_logo;
    img.className="user-photo"; //set attribute
    const userName = document.createElement("h2");
    const userRole = document.createElement("h4");
    let captureStatus=document.createTextNode(user.type);
    const captureUserName = document.createTextNode(`${user.title}`);
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

const fnSearch = (evt)=>{
    evt.preventDefault();
    let inputSearch=document.getElementById("userSearch").value;
    getPostFilter(inputSearch);
};

function fnClean(){
    mainUl.innerHTML='';
}

userForm.addEventListener('submit',fnSearch);
