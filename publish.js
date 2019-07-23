const ghpages = require("gh-pages");

try {
  ghpages.publish("dist", () => {
    console.log("/dist published to gh-pages");
  });
} catch (err) {
  console.log(err);
}
