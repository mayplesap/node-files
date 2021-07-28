const { cat, webCat } = require('./step2')
const dns = require('dns');
const axios = require('axios');
const fsP = require("fs/promises");
const argv = process.argv;

// Reads a utf8 file
// async function cat(path) {
//   try {
//     let content = await fsP.readFile(path, "utf8");
//     console.log("file contents", content);
//   } catch (err) {
//     console.log(err);
//     process.exit(1);
//   }
// }

// Reads a URL
// async function webCat(url) {
//     try {
//         const resp = await axios.get(url);
//         // console.log(resp.data.slice(0, 100), '...');
//         console.log(resp.data);
//     } catch (err) {
//         let msg = `Error fetching ${url}: \nError: Request failed with status code 404`;
//         console.log(msg);
//         process.exit(1);
//     }
// }

// Reads a utf8 file and writes to a new file
// await not necessary to write (suggestion from Nate)
    // refactor using 'require' since we exported code we don't want to duplicate from above
async function catWrite(path, filename) {
  try {
    let content = await fsP.readFile(path, "utf8");
    fsP.writeFile(filename, content, "utf8");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

// Reads a URL and writes to a new file
// await not necessary to write (suggestion from Nate)
async function webCatWrite(url, filename) {
    try {
        const resp = await axios.get(url);
        // console.log(resp.data.slice(0, 100), '...');
        // console.log(resp.data);
        fsP.writeFile(filename, resp.data)
    } catch (err) {
        let msg = `Error fetching ${url}: \nError: Request failed with status code 404`;
        console.log(msg);
        process.exit(1);
    }
}

// Note: alternative to startsWith is to resolve the domain using a DNS lookup (Tim suggested, but not required)
// if --out, then read from a file and write to a new file
    // and determines if utf8 file or URL and invokes relevant function
// else,
    // only read file and print content, 
    // and determines if utf8 file or URL and invokes relevant function

if (argv[2] === "--out") {
  if (argv[4].startsWith('http')) {
    webCatWrite(argv[4], argv[3]); 
  } else {
    catWrite(argv[4], argv[3]); 
  }
} else{
  if (argv[2].startsWith('http')) {
    webCat(argv[2]); 
  } else {
      cat(argv[2]); 
  }
}

// file lookup does not work here
// let arr = argv[4].split("://");
// let domainName = arr[1];
// if (argv[2] === "--out") {

//   dns.lookup(domainName, function(err) {
//     if (err) {
//       catWrite(argv[4], argv[3]); 
//     } else {
//       webCatWrite(argv[4], argv[3]); 
//     }
//   })
// } else{
//   dns.lookup(domainName, function(err) {
//     if (err) {
//       cat(argv[2]); 
//     } else {
//       webCat(argv[2]); 
//     }
//   })
// }