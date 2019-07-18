const ghpages = require("gh-pages");

const foldername = "dist";

console.log(`\n\ndeploying ${foldername} folder to github pages...`);

ghpages.publish(foldername, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`\nDone\n`);
  }
});
