const URL = 'http://localhost:3001/jobs';
const mainUl = document.querySelector(".mainUl");
const userForm = document.getElementById("userSearchForm")
const checkboxTypeFull = document.getElementById("checkboxTypeFull");
const checkboxTypePart = document.getElementById("checkboxTypePart");


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

const getTypeFilter = async(param) =>{
    try {
        const res = await fetch(`${URL}/type/${param}`);   
        const jobs = await res.json();
        if (Object.values(jobs).length>0) {
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
    const li = document.createElement("li");
    li.className="li";
    const divGeneral = document.createElement("div");
    divGeneral.className="div-general";
    const divUser = document.createElement("div");
    divUser.className="div-user";
    const divName = document.createElement("div");
    divName.className="div-name";
    const span = document.createElement("span");
    const spanType = document.createElement("span");
    const img = document.createElement("img");
    img.src=user.company_logo;
    img.className="user-photo"; //set attribute
    const jobTitle = document.createElement("h2");
    const jobCompany = document.createElement("h4");
    let captureStatus=document.createTextNode(`${user.location}   ${user.created_at}`);
    const captureStatusType=document.createTextNode(user.type);
    spanType.className="border-span";
    const captureJobTitle = document.createTextNode(`${user.title}`);
    const captureJobCompany = document.createTextNode(user.company);
    
    span.appendChild(captureStatus);
    spanType.appendChild(captureStatusType);
    jobTitle.appendChild(captureJobTitle);
    jobCompany.appendChild(captureJobCompany);
    
    divName.append(jobCompany,jobTitle,spanType);
    divUser.append(img,divName);
    divGeneral.append(divUser,span);
    li.append(divGeneral);
    mainUl.appendChild(li);
    jobTitle.appendChild(captureJobTitle);
}

const fnSearch = (evt)=>{
    evt.preventDefault();
    let inputSearch=document.getElementById("userSearch").value;
    getPostFilter(inputSearch.toLowerCase());
};

const fnCheckboxType = (evt)=>{
    evt.preventDefault();
    if (checkboxTypeFull.checked && checkboxTypePart.checked) {
        getPost();
    } else if(checkboxTypeFull.checked && !checkboxTypePart.checked){
        fnClean();
        getTypeFilter("Full time")
    }else if(!checkboxTypeFull.checked && checkboxTypePart.checked){
        fnClean();
        getTypeFilter("Part time")
    }else{
        fnClean();
    }

};

function fnClean(){
    // mainUl.innerHTML='';
    const div=document.querySelectorAll(".div-general");
    div.forEach(item=>item.remove());
}

userForm.addEventListener('submit',fnSearch);
checkboxTypeFull.addEventListener('change',fnCheckboxType);
checkboxTypePart.addEventListener('change',fnCheckboxType);
