/*import Chart from 'https://cdn.jsdelivr.net/npm/chart.js/dist/chart.esm.js';

let nums = [];
let chart;

Chart.defaults.backgroundColor = '#9bd0f5ff';
Chart.defaults.color = '#000000ff';
Chart.defaults.font.size = 18;

*/function makeChart() {
formatNums();
}/*
    if (chart !== undefined) {
        chart.destroy(); nums.length = 0;
    }
    
    let data = documen  t.getElementById("info").value.split(";");
    if (data[0] === '') return;
    data.forEach((el, idx) => {
        if (el.includes(",")) el = el.split(",");
        else if (el.includes(".")) el = el.split(".");
        data[idx] = el.map(x => +x);

        /*function checkOrder() {
            let amount = 0;
            for (let idx = 0; idx < data.length - 1; idx++) {
                if (data[idx][0] < data[idx + 1][0]) amount++;
            }
            return amount === data.length - 1;
        }

        while (!checkOrder()) {
            for (let idx = 0; idx < data.length - 1; idx++) {
                if (data[idx][0] > data[idx + 1][0]) {
                    [data[idx], data[idx + 1]] = [data[idx + 1], data[idx]];
                }
            }
        }*//*

        nums.push({ x: data[idx][0], y: data[idx][1] })
    });

    chart = new Chart(
        document.getElementById('canvas'),
        {
            type: 'line',
            //options: {
            //    aspectRatio: 1,
            //},
            data: {
                labels: nums.map(row => row.x),
                datasets: [
                    {
                        label: 'Kropki',
                        data: nums.map(row => row.y),
                        borderColor: '#ff0000ff',
                        pointRadius: 10,
                        pointHoverRadius: 10
                    }
                ]
            }
        }
    );
}
*/


const canv = document.querySelector("canvas")
canv.width = canv.clientWidth;
canv.height = canv.clientHeight;
const ctx = canv.getContext("2d");
const beginX = 50;
const beginY = canv.height - 50;
let chart = [];
let arrX = [];
let arrY = [];

function addAxis() {
    //initialisation 
    //x-axis
    ctx.lineWidth = 2;
    ctx.fillStyle = `rgb(0,0,0)`;
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

addAxis();

function addLines(scaleX, scaleY) {
    for (let idx = 0; idx < chart.length; idx++) {
        console.log(info);
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.beginPath();
        ctx.moveTo(beginX - 4 + chart[idx][0] * scaleX, beginY - (chart[idx][1] * scaleY) - 4);
        ctx.lineTo(beginX - 4 + chart[idx + 1][0] * scaleX, beginY - (chart[idx + 1][1] * scaleY) - 4);
        ctx.stroke();
    }
}

function addPoints(scaleX, scaleY) {
    ctx.clearRect(0, 0, canv.width, canv.height);
    addAxis();
    addMeasurements(scaleX, scaleY)
    for (info of chart) {
        console.log(info);
        ctx.fillStyle = "rgb(255,0,0)";
        ctx.beginPath();
        ctx.roundRect(beginX - 4 + info[0] * scaleX, beginY - (info[1] * scaleY) - 4, 8, 8, 10);
        ctx.fill();
    }

    addLines(scaleX, scaleY);
}

function CalcMeasurements() {
    //this depends a lot if the biggestX is bigger or smaller then width lol damn
    //i give up just use the library
    arrX = arrX.sort((a, b) => a - b);
    arrY = arrY.sort((a, b) => a - b);
    const biggestX = arrX.at(-1);
    const biggestY = arrY.at(-1);

    const width = canv.width - 20 - beginX;
    const displayNumX = biggestX;
    const amountX = width / displayNumX;

    const height = canv.height - 20 - 50;
    //const displayNumY = Math.round(biggestY / Math.ceil(height / 30));
    const amountY = height / biggestY;

    //addPoints(scaleX, scaleY);
    addMeasurements();
}

function addMeasurements(scaleX, scaleY) {
    //this depends a lot if the biggestX is bigger or smaller then width lol damn
        //i give up just use the library
    const pos = canv.getBoundingClientRect();
    const biggestX = arrX.at(-1);
    const biggestY = arrY.at(-1);

    const width = canv.width - 20 - beginX;
    const displayNumX = biggestX;
    const amountX = width / displayNumX;

    const height = canv.height - 20 - 50;
    //const displayNumY = Math.round(biggestY / Math.ceil(height / 30));
    const amountY = height / biggestY;
    const displayNumY = biggestY;

    // oś X
    for (let i = 0; i <= amountX; i++) {
        const x = beginX + i * displayNumX;
        ctx.fillStyle = "blue";
        ctx.fillRect(x - 2, beginY, 4, 10); // kreski osi X
        const label = document.createElement("p");
        label.style = `position: absolute; left: ${pos.left + beginX + i * displayNumX - 4}px; top: ${pos.top + beginY}px; font-size: 17px; color: black;`;
        label.textContent = (i * displayNumX) / 10;
        document.getElementById("values").appendChild(label);
    }

    // oś Y
    for (let i = 0; i <= amountY; i++) {
        const y = beginY - i * displayNumY;
        ctx.fillStyle = "blue";
        ctx.fillRect(beginX, y - 2, -10, 4); // kreski osi Y
        const label = document.createElement("p");
        label.style = `position: absolute; left: ${pos.left + beginX - 30}px; top: ${pos.top + beginY - i * displayNumY - 21 - 4}px; font-size: 17px; color: black;`;
        label.textContent = (i * displayNumY) / 10;
        document.getElementById("values").appendChild(label);
    }
}


function sortNumbers() {
    function checkOrder() {
        let amount = 0;
        for (let idx = 0; idx < chart.length - 1; idx++) {
            if (chart[idx][0] < chart[idx + 1][0]) amount++;
        }
        return amount === chart.length - 1;
    }

    while (!checkOrder()) {
        for (let idx = 0; idx < chart.length - 1; idx++) {
            console.log(chart[idx]);
            if (chart[idx][0] > chart[idx + 1][0]) {
                [chart[idx], chart[idx + 1]] = [chart[idx + 1], chart[idx]];
            }
        }
    }

    CalcMeasurements();
}

function formatNums() {
    let data = Array.from(document.getElementById("info").value.split(";"));
    if (data[0] === '') return;
    data.forEach((el, idx) => {
        if (el.includes(",")) el = el.split(",");
        else if (el.includes(".")) el = el.split(".");
        data[idx] = el.map(x => +x);
        arrX.push(data[idx][0]);
        arrY.push(data[idx][1]);
    });

    chart = structuredClone(data);
    sortNumbers();
}

window.addEventListener("resize", () => location.reload());
