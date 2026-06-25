const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async event => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const motDePasse = document.getElementById("motDePasse").value;

    const data = {
        email,
        motDePasse
    };

    console.log("Données envoyées à l'API login :", data);

    /*
    Quand ton prof aura créé l'API, tu remplaceras par ceci :

    const response = await fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    if(result.success){
        localStorage.setItem("userId", result.user.id);
        localStorage.setItem("pseudo", result.user.pseudo);

        window.location.href = "index.html";
    }else{
        alert(result.message || "Email ou mot de passe incorrect.");
    }
    */

    alert("Connexion prête. En attente de l'API.");
});