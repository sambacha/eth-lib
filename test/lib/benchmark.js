const rnd = require("./randomData.js");
const rlp = require("./../../src/rlp.js");
const ref = {rlp: require("rlp")};

// ∀ a b . (a -> b) ~> Number
const callsPerSecond = fn => {
  for (var i = 0, t = Date.now(); Date.now() - t < 500; ++i)
    fn();
  return i * 2;
}

let dataTrees = [];
for (let i = 0; i < 64; ++i)
  dataTrees.push(rnd.dataTree());
console.log("Benchmarking Mist-lite's RLP implementation vs the one on NPM.");
const liteCps = callsPerSecond(() => dataTrees.map((dt) => rlp.decode(rlp.encode(dt))));
const npmCps = callsPerSecond(() => dataTrees.map((dt) => ref.rlp.decode(ref.rlp.encode(dt))));
console.log("- Mist Lite: " + liteCps + " calls per second.");
console.log("- Reference: " + npmCps + " calls per second.");
console.log("- Mist Lite is: " + (liteCps / npmCps).toFixed(2) + " " + (liteCps > npmCps ? "faster" : "slower") + " than reference.");
