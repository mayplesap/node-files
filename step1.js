const fsP = require("fs/promises");

async function cat() {
  try {
    let contents = await fsP.readFile("one.txt", "utf8");
    console.log("file contents", contents);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

cat();