const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", async event => {
    event.preventDefault();

    const pseudo = document.getElementById("pseudo").value.trim();
    const email = document.getElementById("email").value.trim();
    const motDePasse = document.getElementById("motDePasse").value;
    const cle = document.getElementById("cle").value.trim();

    const data = {
        pseudo,
        email,
        motDePasse,
        cle
    };

    console.log("Données envoyées à l'API register :", data);

    /*
    Quand ton prof aura créé l'API, tu remplaceras par ceci :

    const response = await fetch("/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    if(result.success){
        alert("Compte créé avec succès !");
        window.location.href = "login.html";
    }else{
        alert(result.message || "Erreur lors de la création du compte.");
    }
    */

    alert("Création de compte prête. En attente de l'API.");
});