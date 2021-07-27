const axios = require('axios');
const fsP = require("fs/promises");
const argv = process.argv;

// Reads a utf8 file
async function cat(path) {
  try {
    let contents = await fsP.readFile(path, "utf8");
    console.log("file contents", contents);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

// Reads a URL
async function webCat(url) {
    try {
        const resp = await axios.get(url);
        // console.log(resp.data.slice(0, 100), '...');
        console.log(resp.data);
    } catch (err) {
        let msg = `Error fetching ${url}: \nError: Request failed with status code 404`;
        console.log(msg);
        process.exit(1);
    }
}

// Note: alternative to startsWith is to resolve the domain using a DNS lookup (Tim suggested, but not required)
// Determines if utf8 file or URL and invokes relevant function
if (argv[2].startsWith('http')) {
    webCat(argv[2]); 
} else {
    cat(argv[2]); 
}