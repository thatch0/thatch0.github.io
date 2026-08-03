const canvas = document.getElementById("canvas")
const ctx = canvas.getContext('2d');
var damping = 0.85
var slope = 16
var iterations = 5

const modes = Object.freeze({
    MidpointDecay: 'MidpointDecay',
    RandomWalk: 'RandomWalk'
});

function generateMPD(steps, steepness, decay = 0.85, step = 0, pointmap = [0, 0]) {
    var newPeaks = [];
    for (let i = 0; i < pointmap.length - 1; i++) {
        var sign = (Math.random() >= 0.5) ? 1 : -1;
        newPeaks.push(midpoint(pointmap[i], pointmap[i + 1]) + (steepness * sign));
    }
    var out;
    step++;
    if (step < steps) {
        out = generateMPD(steps, steepness * decay, decay, step, zipInto(pointmap, newPeaks));
    } else {
        return zipInto(pointmap, newPeaks);
    }
    return out;
}

function midpoint(v1, v2) {
    return (v1 + v2) / 2;
}

function zipInto(base, zips) {
    var out = [];
    for (let i = 0; i < base.length; i++) {
        out.push(base[i]);
        if (i < zips.length) {
            out.push(zips[i]);
        }
    }
    return out;
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
    ctx.lineWidth = 3;
    var pm = generateMPD(iterations, slope, damping);
    var pm2 = generateMPD(iterations, slope, damping);
    const y = canvas.height / 2;
    const xstep = canvas.width / pm.length;
    const id = setInterval(() => {
        damping = 1 - document.getElementById("damp").value
        slope = document.getElementById("slope").value
        pm2 = generateMPD(iterations, slope, damping)
        if (pm.length < pm2.length - 1) {
            return
        }
    }, 1500)
    while (true) {
        ctx.fillStyle = "#13192c";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "#00FF00";
        var x = 0;
        ctx.beginPath();
        ctx.moveTo(x, y);
        for (const offset of pm) {
            x += xstep;
            ctx.lineTo(x, y + offset);
        }
        ctx.stroke();
        for (let i = 0; i < pm.length; i++) {
            pm[i] -= 0.05 * (pm[i] - pm2[i]);
        }
        await delay(10);
    }
}

run();