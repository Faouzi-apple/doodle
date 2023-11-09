<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>
<script>

    function getplayerId(requiredId){
        let url ="getplayerById.php?id=" + requiredId;
        fetch(url, {method: 'GET'})
        .then((response) =>{
            if (!response.ok){
                throw new Error("Something went wrong!");
            }
            let parsedResponse = response.json();
            return parsedResponse
        })
        .then((data) => {
            console.log(data);
            return data;
        })
        .catch((error)=>{
        });
    }

    getPlayerName(requiredPlayerName);
  function createNewPlayerName(playerName) {
    let url = “createNewPlayerName.php”;
    let formData = new FormData();
    formData.append(“name”, playerName);
    fetch(url, { method: ‘POST’, body: formData })
      .then((response) => {
        // Show Response Text
        console.log(response.text);
        return response.text
      })
  }
  const unTexte = “Nom du nouvel utilisateur”;
  createNewPlayer(unTexte);
</script>