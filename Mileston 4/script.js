"use strict";
let formDataBackup = {};
function addEducation() {
    const section = document.getElementById("educationSection");
    const entry = document.createElement("div");
    entry.className = "educationEntry";
    entry.innerHTML = `
<div class="inline">
<input type="text" name="degree" placeholder="Degree" required />
<input type="text" name="institution" placeholder="Institution" required />
</div>
<input type="text" name="educationDates" placeholder="Dates (e.g., 2012 - 2016)" required />
<span class="remove" onclick="removeEntry(this)">- Remove</span>
`;
    section.appendChild(entry);
}
function addExperience() {
    const section = document.getElementById("experienceSection");
    const entry = document.createElement("div");
    entry.className = "experienceEntry";
    entry.innerHTML = `
    <div>
      <div class="inline">
        <input type="text" name="jobTitle" placeholder="Job Title" required />
        <input type="text" name="company" placeholder="Company" required />
      </div>
      <input type="text" name="experienceDates" placeholder="Dates (e.g., April 2018 - July 2020)" required />
      <textarea name="experienceDetails" rows="2" placeholder="Details about the role (Press Enter for new point)"></textarea>
      <span class="remove" onclick="removeEntry(this)">- Remove</span>
    </div>
  `;
    section.appendChild(entry);
}
function removeEntry(element) {
    var _a;
    (_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.remove();
}
function generateResume() {
    const name = document.getElementById("name").value.trim();
    const title = document.getElementById("title").value.trim();
    const address = document.getElementById("address").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const profile = document.getElementById("profile").value.trim();
    const form = document.getElementById("formContainer");
    const resume = document.getElementById("resume");
    const requiredFields = form.querySelectorAll("input[required], textarea[required]");
    let isValid = true;
    requiredFields.forEach((field) => {
        if (!field.value.trim()) {
            field.classList.add("error-highlight");
            isValid = false;
        }
        else {
            field.classList.remove("error-highlight");
        }
    });
    if (!isValid) {
        alert("Please fill in all required fields.");
        return;
    }
    document.getElementById("resume-name").innerText = name;
    document.getElementById("resume-title").innerText = title;
    document.getElementById("resume-address").innerText = address;
    document.getElementById("resume-email").innerText = email;
    document.getElementById("resume-phone").innerText = phone;
    document.getElementById("resume-profile").innerText = profile;
    const educationEntries = document.querySelectorAll("#educationSection .educationEntry");
    const educationHTML = Array.from(educationEntries)
        .map((entry) => {
        const degree = entry.querySelector('input[name="degree"]').value;
        const institution = entry.querySelector('input[name="institution"]').value;
        const dates = entry.querySelector('input[name="educationDates"]').value;
        return `
        <div class="inline">
          <h4 class="subtitle">${degree}</h4>
          <h5><i>${dates}</i></h5>
        </div>
        <h5>from <i>${institution}</i></h5>`;
    })
        .join("");
    document.getElementById("resume-education").innerHTML = educationHTML;
    const experienceEntries = document.querySelectorAll("#experienceSection .experienceEntry");
    const experienceHTML = Array.from(experienceEntries)
        .map((entry) => {
        const jobTitle = entry.querySelector('input[name="jobTitle"]').value;
        const company = entry.querySelector('input[name="company"]').value;
        const expDates = entry.querySelector('input[name="experienceDates"]').value;
        const expDetails = entry.querySelector('textarea[name="experienceDetails"]').value;
        const bulletPoints = expDetails
            .split("\n")
            .filter((point) => point.trim() !== "")
            .map((point) => `<li>${point.trim()}</li>`)
            .join("");
        return `
        <div class="inline">
          <h4 class="subtitle">${jobTitle}</h4>
          <h5><i>${expDates}</i></h5>
        </div>
        <h5><i>at ${company}</i></h5>
        <ul>
          ${bulletPoints}
        </ul>
      `;
    })
        .join("");
    document.getElementById("resume-experience").innerHTML = experienceHTML;
    const skills = document.getElementById("skills").value
        .split(",")
        .map((skill) => skill.trim());
    const columnSize = Math.min(4, Math.ceil(skills.length / 2));
    const skillsColumns = [
        skills.slice(0, columnSize),
        skills.slice(columnSize, columnSize * 2),
    ];
    const skillsHTML = skillsColumns
        .map((column) => {
        const columnHTML = column.map((skill) => `<li>${skill}</li>`).join("");
        return `<ul>${columnHTML}</ul>`;
    })
        .join("");
    document.getElementById("resume-skills").innerHTML = `
<div class="skills-columns">
  ${skillsHTML}
</div>`;
    const formElements = document.querySelectorAll("#resumeForm input, #resumeForm textarea");
    formDataBackup = {};
    formElements.forEach((el) => {
        formDataBackup[el.name] = el.value;
    });
    form.style.display = "none";
    resume.style.display = "block";
    document.getElementById("backToEditT").style.display = "block";
    document.getElementById("printTop").style.display = "block";
    document.getElementById("backToEditB").style.display = "block";
    document.getElementById("printBottom").style.display = "block";
}
function backToEdit() {
    const form = document.getElementById("formContainer");
    const resume = document.getElementById("resume");
    const formElements = document.querySelectorAll("#resumeForm input, #resumeForm textarea");
    formElements.forEach((el) => {
        if (formDataBackup[el.name] !== undefined) {
            el.value = formDataBackup[el.name];
        }
    });
    form.style.display = "block";
    resume.style.display = "none";
    document.getElementById("backToEditT").style.display = "none";
    document.getElementById("printTop").style.display = "none";
    document.getElementById("backToEditB").style.display = "none";
    document.getElementById("printBottom").style.display = "none";
}
function printResume() {
    const originalContent = document.body.innerHTML;
    const resumeContent = document.getElementById("resume")
        .outerHTML;
    document.body.innerHTML = resumeContent;
    window.print();
    document.body.innerHTML = originalContent;
    document.getElementById("formContainer").style.display =
        "none";
    document.getElementById("resume").style.display = "block";
    document.getElementById("backToEditT").style.display = "block";
    document.getElementById("printTop").style.display = "block";
    document.getElementById("backToEditB").style.display = "block";
    document.getElementById("printBottom").style.display = "block";
}
