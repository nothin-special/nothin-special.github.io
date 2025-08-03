const lines = [
  "user@nothinspecial:~$ whoami",
  "Cybersecurity Professional | CTF Enthusiast",
  "",
  "user@nothinspecial:~$ ls images",
  "- profile.jpg",
  "user@nothinspecial:~$ feh profile.jpg",
  "",
  "user@nothinspecial:~$ ls projects",
  '<a href="https://your-htb-page.github.io" target="_blank">- HackTheBox Writeups</a>',
  '<a href="https://your-tryhackme-page.github.io" target="_blank">- TryHackMe Notes</a>',
  '<a href="https://your-cheatsheet-page.github.io" target="_blank">- Cheatsheets</a>',
  "",
  "user@nothinspecial:~$ links",
  '<a href="https://github.com/yourprofile" target="_blank">- GitHub</a>',
  '<a href="https://linkedin.com/in/yourprofile" target="_blank">- LinkedIn</a>',
  '<a href="mailto:you@example.com">- Email</a>',
  "",
  "user@nothinspecial:~$ cat htb.md"
];

const terminal = document.getElementById("terminal");
const cursor = document.createElement("span");
cursor.id = "cursor";
cursor.innerHTML = "&nbsp;";

let lineIndex = 0;
let charIndex = 0;
let currentSpan;

function typeLine() {
  if (lineIndex >= lines.length) {
    cursor.classList.add('dimmed');
    showDetails();
    return;
  }

  const line = lines[lineIndex];
  const div = document.createElement("div");

  if (line.startsWith("user@nothinspecial:~$ ")) {
    const prompt = "user@nothinspecial:~$ ";
    div.appendChild(document.createTextNode(prompt));

    currentSpan = document.createElement("span");
    div.appendChild(currentSpan);
    terminal.appendChild(div);
    currentSpan.appendChild(cursor);

    const command = line.substring(prompt.length);
    setTimeout(() => typeChar(command), 400);
  } else if (line.includes("<a")) {
    div.innerHTML = line;
    terminal.appendChild(div);
    lineIndex++;
    setTimeout(typeLine, 200);
  } else {
    div.textContent = line;
    terminal.appendChild(div);
    lineIndex++;
    setTimeout(typeLine, 150);
  }
}

function typeChar(text) {
  if (charIndex < text.length) {
    cursor.insertAdjacentText("beforebegin", text.charAt(charIndex++));
    setTimeout(() => typeChar(text), 60);
  } else {
    if (text === "feh profile.jpg") openImage();
    charIndex = 0;
    lineIndex++;
    setTimeout(typeLine, 300);
  }
}

function openImage() {
  const cmd = document.createElement("div");
  cmd.textContent = "feh profile.jpg";
  terminal.appendChild(cmd);

  const profile = document.getElementById("profile-frame");
  const loader = document.getElementById("loading-indicator");

  setTimeout(() => {
    profile.style.backgroundImage = "url('./images/profile.jpg')";
    profile.style.backgroundColor = "transparent";
    loader.style.display = "none";
  }, 1000);
}

function showDetails() {
  const blocks = `
<details>
  <summary>HackTheBox - SneakyMachine</summary>
  <p>PrivEsc via sudoers misconfig. <a href="https://your-htb-link.com/sneakymachine" target="_blank">Read writeup</a></p>
</details>
<details>
  <summary>TryHackMe - Blue</summary>
  <p>SMB enumeration example. <a href="https://your-thm-link.com/blue" target="_blank">Read writeup</a></p>
</details>
<details>
  <summary>Cheatsheets</summary>
  <p>Linux and web pentest references. <a href="https://your-github-page.com/cheatsheets" target="_blank">View all</a></p>
</details>`;
  const wrapper = document.createElement("div");
  wrapper.innerHTML = blocks;
  terminal.appendChild(wrapper);
}

document.addEventListener("DOMContentLoaded", () => {
  const terminalDiv = document.getElementById("terminal");
  const instruction = document.getElementById("launch-instruction");
  const tapButton = document.getElementById("tap-launch");

  terminalDiv.style.display = "none";

  const startTyping = () => {
    terminalDiv.style.display = "block";
    instruction.style.display = "none";
    tapButton.style.display = "none";
    typeLine();
  };

  // Handle Enter key
  const handler = (e) => {
    if (e.key === "Enter") {
      document.removeEventListener("keydown", handler);
      startTyping();
    }
  };
  document.addEventListener("keydown", handler);

  // Show tap button after delay on small screens
  if (window.innerWidth <= 768) {
    setTimeout(() => {
      tapButton.style.display = "block";
    }, 10000);

    tapButton.addEventListener("click", startTyping);
  }
});



