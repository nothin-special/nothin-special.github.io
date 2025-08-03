const lines = [
  "guest@localhost:~$ whoami",
  "Cybersecurity Professional | CTF Enthusiast",
  "",
  "guest@localhost:~$ ls images",
  "- profile.jpg",
  "guest@localhost:~$ feh profile.jpg",
  "",
  "guest@localhost:~$ ls projects",
  '<a href="https://github.com/nothin-special/security-logs" target="_blank">- Main Content Page</a>',
  '<a href="https://github.com/nothin-special/security-logs/tree/main/HackTheBox" target="_blank">- HackTheBox Writeups</a>',
  '<a href="https://github.com/nothin-special/security-logs/tree/main/Projects" target="_blank">- Projects</a>',
  "",
  "guest@localhost:~$ links",
  '<a href="https://github.com/nothin-special" target="_blank">- GitHub</a>',
  '<a href="https://www.linkedin.com/in/benjamin-rada-298b2a230/" target="_blank">- LinkedIn</a>',
  '<a href="https://nothin-special.github.io/">- Website</a>',
  "",
  "guest@localhost:~$ cat htb.md"
];

const terminal = document.getElementById("terminal");
const cursor = document.createElement("span");
cursor.id = "cursor";
cursor.innerHTML = "&nbsp;";

let lineIndex = 0;
let charIndex = 0;
let currentSpan;
let hasLaunched = false;

function typeLine() {
  if (lineIndex >= lines.length) {
    showDetails();
    return;
  }

  const line = lines[lineIndex];
  const div = document.createElement("div");

  if (line.startsWith("guest@localhost:~$ ")) {
    const prompt = "guest@localhost:~$ ";
    const command = line.substring(prompt.length);
    const isLaunch = command === "./launch.sh";

    div.appendChild(document.createTextNode(prompt));

    if (isLaunch) {
      // Write launch command directly
      div.appendChild(document.createTextNode(command));
      terminal.appendChild(div);

      // Add simulated feedback line
      const feedback = document.createElement("div");
      feedback.className = "terminal-output";
      feedback.textContent = "[ loading profile... ]";
      terminal.appendChild(feedback);

      lineIndex++;
      setTimeout(typeLine, 700);
      return;
    } else {
      // Animate as normal
      currentSpan = document.createElement("span");
      div.appendChild(currentSpan);
      currentSpan.appendChild(cursor);
      terminal.appendChild(div);
      setTimeout(() => typeChar(command), 300);
    }
  } else {
    div.className = "terminal-output";
    div.innerHTML = line.includes("<a") ? line : line;
    terminal.appendChild(div);
    lineIndex++;
    setTimeout(typeLine, 200);
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
    const feedback = document.createElement("div");
    feedback.textContent = "[ profile.jpg opened ]";
    feedback.className = "terminal-output";
    terminal.appendChild(feedback);


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
<details open>
  <summary class="terminal-output">HackTheBox - Chemistry</summary>
  <p>PrivEsc via sudoers misconfig. <a href="https://github.com/nothin-special/security-logs/blob/main/HackTheBox/Chemistry.md" target="_blank">Read writeup</a></p>
</details>
<details>
  <summary class="terminal-output">Project - Flipper Zero</summary>
  <p>SMB enumeration example. <a href="https://github.com/nothin-special/security-logs/blob/main/Projects/FlipperZero.md" target="_blank">Read more</a></p>
</details>
<details>
  <summary class="terminal-output">Cheatsheets</summary>
  <p>Linux and web pentest references. Coming Soon... <a href="#" target="_blank">View all</a></p>
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
  instruction.style.display = "none";
  tapButton.style.display = "none";

  const startTyping = () => {
    const launchCursor = document.getElementById("launch-cursor");
    if (launchCursor) launchCursor.remove();

    if (hasLaunched) return;
    hasLaunched = true;

    terminalDiv.style.display = "block";
    instruction.style.display = "none";
    tapButton.style.display = "none";
    typeLine();
  };

  const handler = (e) => {
    if (e.key === "Enter") {
      document.removeEventListener("keydown", handler);
      startTyping();
    }
  };

  document.addEventListener("keydown", handler);
  tapButton.addEventListener("click", startTyping);

  // Mobile: show tap right away
  if (window.innerWidth <= 768) {
    tapButton.style.display = "block";
  }

  // Desktop: show enter instruction after 10s
  if (window.innerWidth > 768) {
    setTimeout(() => {
      if (!hasLaunched) {
        instruction.style.display = "block";
      }
    }, 10000);
  }
});
