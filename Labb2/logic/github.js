const githubUser ="tonilingardsson";

async function loadGithubRepos() {
    // Fetch the elements inside the function
    const loadingEl = document.getElementById("repos-loading");
    const projectsSection = document.getElementById("github-projects");
    //
    if(!loadingEl || !projectsSection) {
        return; // protect if the script loads on another side
    }

    try {
        const response = await fetch(
            `https://api.github.com/users/${githubUser}/repos`
        );

        if(!response.ok) {
            throw new Error("Kunde inte hämta repositories");
        }

        const repos = await response.json(); // it is an array with all repo-objects

        // erase "Loading..."
        loadingEl.textContent ="";

        // filter away forks 
        const ownRepos = repos.filter((repo) => !repo.fork);

        if (ownRepos === 0) {
            loadingEl.textContent = "Inga publika projekt hittades.";
            return;
        }

        // create card for every repository
        ownRepos.forEach((repo) => {
            const article = document.createElement("article");
            article.className = "project-card";
            
            // Creating all the attributes of an <h3> element
            const title = document.createElement("h3");
            title.textContent = repo.name;

            const desc = document.createElement("p");
            desc.textContent = repo.description || "Inget projektsammanfattning angiven.";

            // Creating all the attributes of an <a> element
            const link = document.createElement("a");
            link.href = repo.html_url;
            link.target = "_blank";
            link.rel ="noopener";
            link.className = "btn";
            link.textContent = "Visa på Github";

            // Glueing all the elements together inside the section
            article.appendChild(title);
            article.appendChild(desc);
            article.appendChild(link);

            projectsSection.appendChild(article);
        });
    } catch (error) {
        console.error(error);
        loadingEl.textContent= "Kunde inte hämta GitHub-projekt just nu.";
    }
}

loadGithubRepos();