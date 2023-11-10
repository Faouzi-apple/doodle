
<script>

let requiredPlayerName = "tfjfhj"

function getplayerId(requiredId){
    let url ="getplayerById.php?id=" + requiredId;
    fetch(url, {method: 'GET'})
    .then((response) =>{
        if (!response.ok){
            throw new Error("Something went wrong!");
        }
        return response.json();  // Parse directly here
    })
    .then((data) => {
        console.log(data);
        return data;
    })
    .catch((error)=>{
        console.error(error);
    });
}

getplayerId(33);  // Corrected function call

function createNewPlayerName(playerName) {
    let url = "createNewPlayerName.php";  // Corrected quotes
    let formData = new FormData();
    formData.append("name", playerName);
    fetch(url, { method: 'POST', body: formData })
      .then((response) => response.text())  // Corrected response.text() for getting the text
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error)=>{
          console.error(error);
      });
}

const unTexte = "Nom du nouvel utilisateur";  // Corrected quotes
createNewPlayerName(unTexte);  // Corrected function call

</script>