const fs = require('fs');
const readLine = require('readline');
const events = require('events');
const { performance } = require('perf_hooks');
const inputRL = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Show welcome message
console.log('Welcome to the Anagram Finder!');
console.log('-------------------------------------------------------------------------------');
console.log('Dictionary will be loaded line by line when searching for the input word');


// load dictionary file line by line 
const findAnagrams = async (inputWord) => {

  // start timer for processing input
  const anagramSearchStart = performance.now();

  // check for empty spaces in the input
  if (inputWord.trim().length === 0) {
    console.log('Please enter a word to search for its anagrams');
    return askInput('\nAnagramFinder> ', findAnagrams);
  }

  // if input is exit, then exit the program
  if (inputWord.toLowerCase() === 'exit') {
    console.log('Program ended!');
    inputRL.close();
    return;
  }

  try {
    let listOfAnagrams = [];
    const filePath = process.argv[2];
    const fileRL = readLine.createInterface({
      input: fs.createReadStream(filePath),
      crlfDelay: Infinity
    });

    fileRL.on('line', (line) => {
      // check if input word is an anagram of the dictionary word
      if (isAnagram(inputWord, line)) {
        listOfAnagrams.push(line);
      }
    });

    await events.once(fileRL, 'close');

    // console.log('Reading file line by line with readLine done.');
    // const used = process.memoryUsage().heapUsed / 1024 / 1024;
    // console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
    // stop timer for processing input
    const anagramSearchEnd = performance.now();
    if (listOfAnagrams.length > 0) {
      console.log(`${listOfAnagrams.length} Anagrams found for ${inputWord} in ${(anagramSearchEnd - anagramSearchStart).toFixed(2)}ms`);
      console.log(listOfAnagrams.join(', '));
    } else {
        console.log(`No anagrams found for ${inputWord} in ${(anagramSearchEnd - anagramSearchStart).toFixed(2)}ms`);
    }
    // ask for another word
    askInput('\nAnagramFinder> ', findAnagrams);

  } catch (err) {
    console.error(err);
  }
};

const isAnagram = (word1, word2) => {
  // check if words are the same length
  if (word1.length !== word2.length) {
    return false;
  }
  // create an sorted array of the letters in the word
  const word1Array = word1.toLowerCase().split('').sort();
  const word2Array = word2.toLowerCase().split('').sort();

  // compare the arrays
  return word1Array.join('') === word2Array.join('');
};

const askInput = (question, callback) => {
  inputRL.question(question, (answer) => {
    callback(answer);
  });
};

// Initial input
askInput('\nAnagramFinder> ', findAnagrams);