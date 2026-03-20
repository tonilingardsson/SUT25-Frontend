const cvData = "data/cv.json";

async function loadCvData() {
    const response = await fetch(cvData);
    if(!response.ok) {
        throw new Error("Kunde inte läsa cv.json");
    }
const data = await response.json();
return data;
}

// Loop through the JSON file and create an <li> for each object
// Render Experience
function renderExperience(experienceArray) {
    const xpList = document.getElementById("experience-list");
    xpList.innerHTML = ""; 

    experienceArray.forEach((job) => {
        const li = document.createElement("li");
        
        const header = document.createElement("p");
        header.innerHTML = `<strong>${job.title}</strong>, ${job.company} <span> 
        (${job.years}, ${job.location})</span>`;
        li.appendChild(header);

        if (Array.isArray(job.details) && job.details.length > 0) {
            const innerUL = document.createElement("ul");
            job.details.forEach((text) => {
                const detailLi = document.createElement("li");
                detailLi.textContent= text;
                innerUL.appendChild(detailLi);
            });
            li.appendChild(innerUL);
        }

        xpList.appendChild(li);
    });
}

// Render Education
function renderEducation(educationArray) {
    const edList = document.getElementById("education-list");
    edList.innerHTML = "";

    educationArray.forEach((course) => {
        const li = document.createElement("li");

        const header = document.createElement("ul");
        header.innerHTML = `<strong>${course.degree}</strong> på ${course.school} under ${course.years}.`;
        li.appendChild(header);

        edList.appendChild(li);
    })
}

// Render Languages
function renderLanguages(languagesArray) {
    const lngList = document.getElementById("languages-list");
    lngList.innerHTML = "";

    languagesArray.forEach((lang) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${lang.language}</strong>, ${lang.level}.`;
        lngList.appendChild(li);
    })
}

// Render Certificates
function renderCertificates(certificatesArray) {
    const crtList = document.getElementById("certificates-list");
    crtList.innerHTML = "";

    certificatesArray.forEach((certificate) => {
        const li = document.createElement("li");
        li.innerHTML = `${certificate.title}`;
        crtList.appendChild(li);

    })
}

async function initCv() {
    try {
        const data = await loadCvData();
        // Make sure that data.experience (and others) exists
    renderExperience(data.experience || []); 
    renderEducation(data.education || []);
    renderLanguages(data.language|| []);
    renderCertificates(data.certificate || []);
    } catch (err) {
        console.error(err);
    }
}

initCv();