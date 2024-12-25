let formDataBackup: Record<string, string> = {};

type ResumeData = {
  name: string;
  title: string;
  address: string;
  email: string;
  phone: string;
  profile: string;
  education: string;
  experience: string;
  skills: string;
};

function addEducation(): void {
  const section = document.getElementById("educationSection") as HTMLElement;
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

function addExperience(): void {
  const section = document.getElementById("experienceSection") as HTMLElement;
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

function removeEntry(element: HTMLElement): void {
  element.parentElement?.remove();
}

function generateResume(): void {
  const name = (
    document.getElementById("name") as HTMLInputElement
  ).value.trim();
  const title = (
    document.getElementById("title") as HTMLInputElement
  ).value.trim();
  const address = (
    document.getElementById("address") as HTMLInputElement
  ).value.trim();
  const email = (
    document.getElementById("email") as HTMLInputElement
  ).value.trim();
  const phone = (
    document.getElementById("phone") as HTMLInputElement
  ).value.trim();
  const profile = (
    document.getElementById("profile") as HTMLTextAreaElement
  ).value.trim();

  const form = document.getElementById("formContainer") as HTMLElement;
  const resume = document.getElementById("resume") as HTMLElement;
  const requiredFields = form.querySelectorAll(
    "input[required], textarea[required]"
  );

  let isValid = true;

  requiredFields.forEach((field) => {
    const input = field as HTMLInputElement | HTMLTextAreaElement;
    if (!input.value.trim()) {
      input.classList.add("error-highlight");
      isValid = false;
    } else {
      input.classList.remove("error-highlight");
    }
  });

  if (!isValid) {
    alert("Please fill in all required fields.");
    return;
  }

  (document.getElementById("resume-name") as HTMLElement).innerText = name;
  (document.getElementById("resume-title") as HTMLElement).innerText = title;
  (document.getElementById("resume-address") as HTMLElement).innerText =
    address;
  (document.getElementById("resume-email") as HTMLElement).innerText = email;
  (document.getElementById("resume-phone") as HTMLElement).innerText = phone;
  (document.getElementById("resume-profile") as HTMLElement).innerText =
    profile;

  const educationEntries = document.querySelectorAll(
    "#educationSection .educationEntry"
  );
  const educationHTML = Array.from(educationEntries)
    .map((entry) => {
      const degree = (
        entry.querySelector('input[name="degree"]') as HTMLInputElement
      ).value;
      const institution = (
        entry.querySelector('input[name="institution"]') as HTMLInputElement
      ).value;
      const dates = (
        entry.querySelector('input[name="educationDates"]') as HTMLInputElement
      ).value;

      return `
<div class="inline">
  <h4 class="subtitle">${degree}</h4>
  <h5><i>${dates}</i></h5>
</div>
<h5>from <i>${institution}</i></h5>`;
    })
    .join("");
  (document.getElementById("resume-education") as HTMLElement).innerHTML =
    educationHTML;

  const experienceEntries = document.querySelectorAll(
    "#experienceSection .experienceEntry"
  );
  const experienceHTML = Array.from(experienceEntries)
    .map((entry) => {
      const jobTitle = (
        entry.querySelector('input[name="jobTitle"]') as HTMLInputElement
      ).value;
      const company = (
        entry.querySelector('input[name="company"]') as HTMLInputElement
      ).value;
      const expDates = (
        entry.querySelector('input[name="experienceDates"]') as HTMLInputElement
      ).value;
      const expDetails = (
        entry.querySelector(
          'textarea[name="experienceDetails"]'
        ) as HTMLTextAreaElement
      ).value;

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
</ul>`;
    })
    .join("");
  (document.getElementById("resume-experience") as HTMLElement).innerHTML =
    experienceHTML;

  const skills = (
    document.getElementById("skills") as HTMLTextAreaElement
  ).value
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

  (document.getElementById("resume-skills") as HTMLElement).innerHTML = `
<div class="skills-columns">
  ${skillsHTML}
</div>`;

  const formElements = document.querySelectorAll(
    "#resumeForm input, #resumeForm textarea"
  );
  formDataBackup = {};
  formElements.forEach((el) => {
    const input = el as HTMLInputElement | HTMLTextAreaElement;
    formDataBackup[input.name] = input.value;
  });

  form.style.display = "none";
  resume.style.display = "block";

  (document.getElementById("backToEditT") as HTMLElement).style.display =
    "block";
  (document.getElementById("printTop") as HTMLElement).style.display = "block";
  (document.getElementById("shareButtonT") as HTMLElement).style.display =
    "block";
  (document.getElementById("backToEditB") as HTMLElement).style.display =
    "block";
  (document.getElementById("printBottom") as HTMLElement).style.display =
    "block";
  (document.getElementById("shareButtonB") as HTMLElement).style.display =
    "block";
}

function backToEdit(): void {
  const form = document.getElementById("formContainer") as HTMLElement;
  const resume = document.getElementById("resume") as HTMLElement;

  const formElements = document.querySelectorAll(
    "#resumeForm input, #resumeForm textarea"
  );
  formElements.forEach((el) => {
    const input = el as HTMLInputElement | HTMLTextAreaElement;
    if (formDataBackup[input.name] !== undefined) {
      input.value = formDataBackup[input.name];
    }
  });

  form.style.display = "block";
  resume.style.display = "none";

  (document.getElementById("backToEditT") as HTMLElement).style.display =
    "none";
  (document.getElementById("printTop") as HTMLElement).style.display = "none";
  (document.getElementById("shareButtonT") as HTMLElement).style.display =
    "none";
  (document.getElementById("backToEditB") as HTMLElement).style.display =
    "none";
  (document.getElementById("printBottom") as HTMLElement).style.display =
    "none";
  (document.getElementById("shareButtonB") as HTMLElement).style.display =
    "none";
}

function printResume(): void {
  const originalContent = document.body.innerHTML;
  const resumeContent = (document.getElementById("resume") as HTMLElement)
    .outerHTML;

  document.body.innerHTML = resumeContent;

  window.print();

  document.body.innerHTML = originalContent;

  (document.getElementById("formContainer") as HTMLElement).style.display =
    "none";
  (document.getElementById("resume") as HTMLElement).style.display = "block";
  (document.getElementById("backToEditT") as HTMLElement).style.display =
    "block";
  (document.getElementById("printTop") as HTMLElement).style.display = "block";
  (document.getElementById("backToEditB") as HTMLElement).style.display =
    "block";
  (document.getElementById("printBottom") as HTMLElement).style.display =
    "block";
}

function showSharePopup(): void {
  const popup = document.getElementById("sharePopup") as HTMLElement;
  popup.style.display = "flex";

  const usernameInput = document.getElementById("username") as HTMLInputElement;
  const generatedUrlField = document.getElementById(
    "generatedUrl"
  ) as HTMLInputElement;

  usernameInput.addEventListener("input", () => {
    const username = usernameInput.value.trim();
    if (username) {
      const generatedUrl = `${window.location.origin}?username=${username}`;
      generatedUrlField.value = generatedUrl;
    } else {
      generatedUrlField.value = "";
    }
  });
}

function closeSharePopup(): void {
  const popup = document.getElementById("sharePopup") as HTMLElement;
  popup.style.display = "none";
}

function copyGeneratedUrl(): void {
  const username = (
    document.getElementById("username") as HTMLInputElement
  ).value.trim();
  if (!username) {
    alert("Please enter a username!");
    return;
  }

  const resumeData: ResumeData = {
    name: (document.getElementById("resume-name") as HTMLElement).innerText,
    title: (document.getElementById("resume-title") as HTMLElement).innerText,
    address: (document.getElementById("resume-address") as HTMLElement)
      .innerText,
    email: (document.getElementById("resume-email") as HTMLElement).innerText,
    phone: (document.getElementById("resume-phone") as HTMLElement).innerText,
    profile: (document.getElementById("resume-profile") as HTMLElement)
      .innerText,
    education: (document.getElementById("resume-education") as HTMLElement)
      .innerHTML,
    experience: (document.getElementById("resume-experience") as HTMLElement)
      .innerHTML,
    skills: (document.getElementById("resume-skills") as HTMLElement).innerHTML,
  };

  localStorage.setItem(username, JSON.stringify(resumeData));

  const generatedUrl = `${window.location.origin}?username=${username}`;
  (document.getElementById("generatedUrl") as HTMLInputElement).value =
    generatedUrl;

  navigator.clipboard
    .writeText(generatedUrl)
    .then(() => {
      alert("Link copied to clipboard!");
    })
    .catch(() => {
      alert("Failed to copy link. Please try manually.");
    });
}

function loadSharedResume(): void {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username");
  if (username) {
    const savedResume = localStorage.getItem(username);
    if (savedResume) {
      const resumeData: ResumeData = JSON.parse(savedResume);
      (document.getElementById("resume-name") as HTMLElement).innerText =
        resumeData.name;
      (document.getElementById("resume-title") as HTMLElement).innerText =
        resumeData.title;
      (document.getElementById("resume-address") as HTMLElement).innerText =
        resumeData.address;
      (document.getElementById("resume-email") as HTMLElement).innerText =
        resumeData.email;
      (document.getElementById("resume-phone") as HTMLElement).innerText =
        resumeData.phone;
      (document.getElementById("resume-profile") as HTMLElement).innerText =
        resumeData.profile;
      (document.getElementById("resume-education") as HTMLElement).innerHTML =
        resumeData.education;
      (document.getElementById("resume-experience") as HTMLElement).innerHTML =
        resumeData.experience;
      (document.getElementById("resume-skills") as HTMLElement).innerHTML =
        resumeData.skills;

      (document.getElementById("formContainer") as HTMLElement).style.display =
        "none";
      (document.getElementById("resume") as HTMLElement).style.display =
        "block";
    } else {
      alert("No resume found for this username.");
      const newUrl = `${window.location.origin}${window.location.pathname}`;
      window.history.replaceState({}, document.title, newUrl);
    }
  }
}

document.addEventListener("DOMContentLoaded", loadSharedResume);
