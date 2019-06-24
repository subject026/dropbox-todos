const ghpages = require("gh-pages");

const foldername = "dist";

ghpages.publish(foldername, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`\n\n/${foldername} folder published to gh-pages\n`);
  }
});
