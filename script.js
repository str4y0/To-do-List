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

async function saveData() {
    console.log(listContainer.innerHTML);
    await fetch('https://tinkr.tech/sdb/str4ybase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({html: listContainer.innerHTML.split("×")})
    });
}

async function showTask() {

    const response = await fetch('https://tinkr.tech/sdb/str4ybase');
    const data = await response.json();
    listContainer.innerHTML = data[data.length-1].html.join('×');
}

showTask();