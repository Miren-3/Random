(function () {
    function terminal() {
        console.log("Terminal initialized");
        const mainBox = document.createElement("div");
        mainBox.id = "terminalBox";
        mainBox.style = "position:absolute;width:650px;height:600px;top:20px;left:20px;border-radius:5px;background-color:black;color:green;font-family:monospace;box-sizing:border-box;overflow-y:auto;border:3px solid red;z-index:5;opacity:1;user-select:none;";
        const nav = document.createElement("div");
        nav.style = "position:relative;width:auto;height:33px;background-color:white;";
        const hidk = document.createElement("h6");
        hidk.innerHTML = "Terminal - try some commands (rm -rf / also exists)";
        hidk.style = "margin:0;padding:5px;font-size:1.1rem;color:black;";
        nav.appendChild(hidk);
        const buttons = document.createElement("div");
        buttons.style = "position: absolute;display:flex;gap:7px;right:10px;margin-top:-37px;left:auto;width:min-content;align-items:center;justify-content:center;";
        const buttonMin = document.createElement("button");
        buttonMin.style = "border:none;background-color:transparent;cursor:pointer;font-size: 2em;margin-top: 1px;";
        buttonMin.onclick = () => mainBox.style.opacity === 1 ? mainBox.style.opacity = 0.25 : mainBox.style.opacity = 1;
        buttonMin.innerHTML = "-";
        const buttonFull = document.createElement("button");
        buttonFull.style = "border:none;background-color:transparent;cursor:pointer;font-size: 1.6em;";
        buttonFull.onclick = () => { if (mainBox.style.width === '100vw') { mainBox.style.top = "50px"; mainBox.style.left = "50px"; mainBox.style.width = "650px"; mainBox.style.height = "600px"; } else { mainBox.style.top = "0px"; mainBox.style.left = "0px"; mainBox.style.width = '100vw'; mainBox.style.height = '100vh'; } };
        buttonFull.innerHTML = "□";
        const buttonRM = document.createElement("button");
        buttonRM.style = "border:none;background-color:transparent;cursor:pointer;margin-top:5px;font-size: 1.7em;";
        buttonRM.onclick = () => { const b = window.prompt('>Yes< or >Y< to delete terminal, >remake< to delete and it will come back in 3 seconds', 'remake'); if (b === 'Yes' || b === 'Y') mainBox.remove(); else if (b === 'remake') { mainBox.remove(); setTimeout(() => terminal(), 3000); } };
        buttonRM.innerHTML = "×";
        buttons.appendChild(buttonMin);
        buttons.appendChild(buttonFull);
        buttons.appendChild(buttonRM);
        nav.appendChild(buttons);
        mainBox.appendChild(nav);
        const text = document.createElement("h2");
        text.innerHTML = "~$ <input style='width: 90%; background-color: transparent; border:2px solid white;font-size: 1rem;color: white; margin: 1px 3px 0 3px;'>";
        text.style = "margin: 10px; color: lightgreen; position: relative; top:0;";
        mainBox.appendChild(text);
        document.body.prepend(mainBox);
        let startX, startY;
        document.addEventListener("mousedown", (e) => { const c = mainBox.getBoundingClientRect(); if (e.x < c.right && e.x > c.left && e.y < c.top + 33 && e.y > c.top) { startX = e.x; startY = e.y; } });
        document.addEventListener("mouseup", (e) => { mainBox.style.left = Number(mainBox.style.left.slice(0, -2)) + (e.x - startX) + "px"; mainBox.style.top = Number(mainBox.style.top.slice(0, -2)) + (e.y - startY) + "px"; startX = undefined; startY = undefined; });
        let top = 30;
        let am = 0;
        text.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && text.querySelector("input").value.trim().length !== 0 && am <= Math.floor((mainBox.getBoundingClientRect().height - 50) / 28)) {
                let input = text.querySelector("input").value;
                text.style.top = `${top}px`;
                const p = document.createElement("p");
                p.style = `position:absolute;top:${top + 10}px;left:10px;color:lightgreen;font-size:1.1rem;margin:0;`;
                if (document.querySelectorAll("p")[0] && document.querySelectorAll("p")[document.querySelectorAll("p").length - 1].textContent === '> You sure? (Y/N)' && input.toLowerCase() === "y") {
                    p.innerHTML = "> YOU FOOL YOUVE DOOMED US ALL!";
                    mainBox.append(p);
                    setTimeout(() => document.open(), 1750);
                    return;
                }
                if (input.toLowerCase() === "cls") {
                    document.querySelectorAll("#terminalBox p").forEach(p => p.remove());
                    text.querySelector("input").value = "";
                    text.style.top = `0`;
                    top = 30;
                    am = 0;
                    return;
                } else if (input.toLowerCase() === "help" || input.toLowerCase().slice(0, 3) === "man") {
                    p.innerHTML = "> figure it out yourself x3";
                } else if (input.toLowerCase() === "bash") {
                    p.innerHTML = "> bash uwu";
                } else if (input.toLowerCase() === "pwd") {
                    p.innerHTML = "> home/*your name here*";
                } else if (input.toLowerCase().slice(0, 2) === "ls" || input.toLowerCase().slice(0, 3) === "dir") {
                    p.innerHTML = ">..  .  nuclearLaunchCodes.txt";
                } else if (input.toLowerCase().slice(0, 2) === "cd") {
                    p.innerHTML = "> only home exists silly";
                } else if (input.toLowerCase() === "rm -rf /") {
                    p.innerHTML = "> You sure? (Y/N)";
                } else if (input.toLowerCase().slice(0, 2) === "rm" || input.toLowerCase().slice(0, 2) === "mk") {
                    p.innerHTML = "> too lazy to code this";
                } else if (input.toLowerCase().slice(0, 4) === "echo") {
                    p.innerHTML = "> " + input.slice(5);
                } else if (input.toLowerCase() === "cat nuclearlaunchcodes.txt") {
                    p.innerHTML = "> meow meow meow meow meow meow :3";
                } else if (input.toLowerCase() === "cmd" || input.toLowerCase() === "terminal" || input.toLowerCase() === "new" || input.toLowerCase() === "start" || input.toLowerCase() === "run") {
                    p.innerHTML = "> opening new terminal...";
                    mainBox.append(p);
                    text.querySelector("input").value = "";
                    top += 25;
                    am++;
                    terminal();
                    return;
                } else p.innerHTML = `> command not found: ${input}`;
                mainBox.append(p);
                text.querySelector("input").value = "";
                top += 25;
                am++;
            }
        });
    } terminal();
})();