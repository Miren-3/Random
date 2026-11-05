const canv = document.querySelector("canvas")
canv.width = canv.clientWidth;
canv.height = canv.clientHeight;
const pos = canv.getBoundingClientRect();
const div = document.querySelector("div");
const ctx = canv.getContext("2d");
const textArea = document.querySelector("textArea");
const beginX = 50;
const beginY = canv.height - 50;
let data = [];

function initialize() {
    try {
        if (data.length !== 0) {
            ctx.clearRect(0, 0, canv.width, canv.height);
            data.length = 0;
            document.querySelectorAll("p").forEach(p => p.remove());
        }

        formatData();
    } catch (e) {
        e(e)
    } finally {
        log("finished");
    }
}

function formatData() {
    const info = textArea.value.split(";");

    if (info[0] === '' || info.length === 0) return e("no Data silly");

    info.forEach((el, idx) => {
        el = el.split(",").map(x => +x);
        data.push({ x: el[0], y: el[1] });
        //log("formatData:", data);
    });

    addMeasurements()
}

function addMeasurements() {
    const { biggestX, biggestY, smallestX, smallestY, stepX, modX, stepY, modY, scaleX, scaleY } = calcMeasurements();
    let labelX;
    let labelY;
    addAxis();
    log(stepX, stepY, scaleX, scaleY);

    ctx.clearRect(0, 0, canv.width, canv.height);
    data.forEach((el, idx) => {
        log(`addMeasurements: `, el);
        ctx.fillStyle = "blue";

        // X
        const x = (beginX + idx * stepX) / modX;
        ctx.fillRect(x - 2, beginY, 4, 10); // kreski osi X
        labelX = document.createElement("p");
        labelX.style = `position:absolute;left:${(pos.left + beginX + idx * stepX) / modX - 5}px;top:${pos.bottom - beginX}px;font-size:17px;color:black;z-index:3`;
        labelX.textContent = idx === 0 ? smallestX : idx === data.length ? biggestX : smallestX + (idx);
        
        // Y
        const y = beginY - idx * stepY;
        ctx.fillRect(beginX, y - 2, -10, 4); // kreski osi Y
        labelY = document.createElement("p");
        labelY.style = `position:absolute;left:${pos.left + 5}px;top:${pos.top + beginY - idx * stepY - 30}px;font-size:17px;color:black;z-index:3`;
        labelY.textContent = idx === 0 ? smallestY : idx === data.length ? biggestY : smallestY + (idx);

        div.appendChild(labelX);
        div.appendChild(labelY);
    });

    addLines(modX, modY, stepX, stepY, scaleX, scaleY);
}

function calcMeasurements() {
    let xArr = [];
    let yArr = [];

    data.forEach(el => {
        xArr.push(el.x);
        yArr.push(el.y);
    });

    const biggestX = Math.max(...xArr);
    const biggestY = Math.max(...yArr);
    const smallestX = Math.min(...xArr);
    const smallestY = Math.min(...yArr);
    const scaleX = (biggestX - smallestX) / data.length;
    const scaleY = (biggestY - smallestY) / data.length;
    let stepX = canv.width / data.length;
    let stepY = canv.height / data.length;
    let modX = 1;
    let modY = 1;

    //while (stepX <= 10) { stepX *= 2; modX *= 2 }
    //while (stepY <= 10) { stepY *= 2; modY *= 2 }

    return { biggestX, biggestY, smallestX, smallestY, stepX, modX, stepY, modY, scaleX, scaleY };
}

function addAxis() {
    ctx.lineWidth = 2;
    ctx.fillStyle = `rgb(0,0,0)`;

    //x-axis
    ctx.beginPath(); // Start a new path
    ctx.moveTo(beginX, beginY);
    ctx.lineTo(canv.width - 2, beginY);
    ctx.stroke();

    //arrowhead
    ctx.beginPath();
    ctx.moveTo(canv.width - 2, beginY);
    ctx.lineTo(canv.width - 10, beginY - 10);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(canv.width - 2, beginY);
    ctx.lineTo(canv.width - 10, beginY + 10);
    ctx.stroke();

    //y-axis
    ctx.beginPath();
    ctx.moveTo(beginX, beginY);
    ctx.lineTo(beginX, 2);
    ctx.stroke();

    //arrowhead
    ctx.beginPath();
    ctx.moveTo(beginX, 2);
    ctx.lineTo(beginX - 10, 10);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(beginX, 2);
    ctx.lineTo(beginX + 10, 10);
    ctx.stroke();
}

function addLines(MX, MY, sX, sY, SX, SY) {
    for (let idx = 0; idx < data.length - 1; idx++) {
        log("addLines:", data[idx]);
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.beginPath();
        ctx.moveTo((beginX + idx * sX) / MX, (idx * -sY + beginY) / MY);
        ctx.lineTo((beginX + (idx + 1) * sX) / MX, ((idx + 1) * -sY) + beginY / MY);
        //log("from:", (beginX + idx * sX) / MX, (idx * sY + beginY) / MY, "to:", (beginX + (idx + 1) * sX) / MX, ((idx + 1) * -sY) + beginY / MY - 4);
        ctx.stroke();
    }

    addPoints(MX, MY, sX, sY, SX, SY);
}

function addPoints(MX, MY, sX, sY, SX, SY) {
    data.forEach((el, idx) => {
        ctx.fillStyle = "rgb(255,0,0)";
        log("Addpoints:", el, SX, SY);
        ctx.beginPath();
        ctx.roundRect((beginX + idx * sX) / MX - 4, (idx * -sY + beginY) / MY - 4, 8, 8, 10);
        ctx.fill();
    });

    //addAxis();
}

document.querySelector("button").onclick = () => initialize();
window.addEventListener("resize", () => location.reload());