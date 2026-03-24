const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
    if(inputBox.value === ''){
        alert("You must write something!");
    }
    else{
        let li = document.createElement("li");      // tekitab listi
        li.innerHTML = inputBox.value;              // lisab teksti listi
        listContainer.appendChild(li);              // displayb teksti listis
        let span = document.createElement("span");  // tekitab kustutamis nuppu
        span.innerHTML = "\u00d7";                  // tekitab joone üle teksti
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e){    // nuppu vajutamine
    if(e.target.tagName === "LI"){                      // vaatab kuhu vajutasid
        e.target.classList.toggle("checked");           // muudab checked
        saveData();
    }
    else if(e.target.tagName === "SPAN"){               // kontrollib kas vajutasid x        
        e.target.parentElement.remove();                // kustutab listist kui vajutad x
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);  // salvestab kirjutatud data 
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data"); // call outib salvestatud data
}
showTask();