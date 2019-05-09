const alphabet = "0123456789abcdefghijklmnopqrstuvwxyz";
const idLength = 20;

function generateNumber() {
  return Math.floor(Math.random() * alphabet.length);
}

export default function generateID() {
  let id = "";
  for (let i = 0; i < idLength; i++) {
    const num = generateNumber();
    id += alphabet[num];
  }
  return id;
}
