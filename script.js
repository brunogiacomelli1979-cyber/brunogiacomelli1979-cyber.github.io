const terminalLines = [
  { type: "cmd", text: "ask --problema 'gargalos operacionais'" },
  { type: "ok", text: "OK perguntas de negócio definidas" },
  { type: "cmd", text: "prepare --fontes planilhas sql logs" },
  { type: "ok", text: "OK dados validados e documentados" },
  { type: "cmd", text: "analyze --kpis sla produtividade qualidade" },
  { type: "ok", text: "OK indicadores prontos para decisão" },
  { type: "cmd", text: "automate --n8n --human-checkpoint" },
  { type: "ok", text: "OK fluxo com validação humana" }
];

const terminal = document.getElementById("terminal-content");
let lineIndex = 0;
let charIndex = 0;
let currentLine = null;

function typeTerminalLine() {
  if (!terminal) return;

  if (lineIndex >= terminalLines.length) {
    lineIndex = 0;
    terminal.innerHTML = "";
  }

  const line = terminalLines[lineIndex];

  if (charIndex === 0) {
    currentLine = document.createElement("div");
    currentLine.className = "terminal-line";
    currentLine.innerHTML = line.type === "cmd"
      ? '<span class="terminal-prompt">$ </span><span class="terminal-command"></span>'
      : '<span class="terminal-ok"></span>';
    terminal.appendChild(currentLine);
  }

  const target = currentLine.querySelector("span:last-child");

  if (charIndex < line.text.length) {
    target.textContent += line.text[charIndex];
    charIndex += 1;
    window.setTimeout(typeTerminalLine, line.type === "cmd" ? 28 : 10);
  } else {
    charIndex = 0;
    lineIndex += 1;
    window.setTimeout(typeTerminalLine, lineIndex % 2 === 0 ? 850 : 260);
  }
}

window.setTimeout(typeTerminalLine, 650);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.09 });

document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));

const sections = [...document.querySelectorAll("section[id]")];
const navLinks = [...document.querySelectorAll(".main-nav a[href^='#']")];

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-45% 0px -45% 0px" });

sections.forEach((section) => navObserver.observe(section));

const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");

if (header && menuButton) {
  menuButton.addEventListener("click", () => {
    const isOpen = header.classList.toggle("menu-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".main-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("menu-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
