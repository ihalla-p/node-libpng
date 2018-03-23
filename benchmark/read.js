const Benchmark = require("benchmark");
const fs = require("fs");
const drawChart = require("./chart");

const PngJS = require("pngjs");
const nodeLibpng = require("node-libpng");

const path = `${__dirname}/sample.png`;

const suite = new Benchmark.Suite();

module.exports = () => new Promise(resolve => {
    console.log("Benchmarking read")
    const file = fs.readFileSync(path);
    suite
        .add("node-libpng", {
            fn() {
                new nodeLibpng.PngImage(file);
            }
        })
        .add("pngjs", {
            fn() {
                PngJS.PNG.sync.read(file);
            }
        })
        .on("cycle", event => {
            console.log(String(event.target));
        })
        .on("complete", () => {
            drawChart(suite, "./benchmark-read.png", resolve);
        })
        .run();
});
