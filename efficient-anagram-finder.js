const fs = require('fs');
const readLine = require('readline');
const { performance } = require('perf_hooks');
const inputRL = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const dictionaryMap = {};

// Show welcome message
console.log('Welcome to the Anagram Finder!');
console.log('----------------------------------------------------');

// Ask for a word from the user
// TODO: The readLine module is built in module, if given a choice we could replace it by prompt-sync module from npm instead of callback based approach
const askInput = (question, callback) => {
  inputRL.question(question, (answer) => {
    callback(answer);
  });
};

// load dictionary file
const readFile = async (filePath) => {
  try {
    const data = await fs.promises.readFile(filePath, 'utf8');
    return data;
  } catch (err) {
    console.log(err);
  }
};

const loadDictionary = (data) => {
  // start dictionary loading timer
  const dictionaryLoadStart = performance.now();
  const dictionary = data.split('\n');

  // map each word in dictionary array
  dictionary.forEach((word) => {
    // check for empty spaces in the dictionary file
    if (word.trim().length === 0) {
      return;
    }
    // split words into an array of letters and sort then join the sorted letters into a string
    const sortedWordString = word.toLowerCase().split('').sort().join('');
    // add the sorted word to the dictionary map as a key and the original word as the value
    if (!dictionaryMap[sortedWordString]) {
      dictionaryMap[sortedWordString] = [word];
    } else {
      dictionaryMap[sortedWordString].push(word);
    }
  });

  // stop dictionary loading timer
  const dictionaryLoadEnd = performance.now();
  console.log(`Dictionary loaded in ${(dictionaryLoadEnd - dictionaryLoadStart).toFixed(2)}ms`);
};

// process the input to find anagrams
const findAnagrams = (input) => {
  // start timer for processing input
  const anagramSearchStart = performance.now();

  // check for empty spaces in the input
  if (input.trim().length === 0) {
    console.log('Please enter a word to search for its anagrams');
    return askInput('\nAnagramFinder> ', findAnagrams);
  }

  // if input is exit, then exit the program
  if (input.toLowerCase() === 'exit') {
    console.log('Program ended!');
    inputRL.close();
  } else {
    // sortedWordString input
    const sortedWordString = input.toLowerCase().split('').sort().join('');

    // check if the input is in the dictionary
    let listOfAnagrams = [];
    if (dictionaryMap[sortedWordString]) {
      listOfAnagrams = dictionaryMap[sortedWordString];
    }

    // stop timer for processing input
    const anagramSearchEnd = performance.now();
    if (listOfAnagrams.length > 0) {
      console.log(`${listOfAnagrams.length} Anagrams found for ${input} in ${(anagramSearchEnd - anagramSearchStart).toFixed(2)}ms`);
      console.log(listOfAnagrams.join(', '));
    } else {
      console.log(`No anagrams found for ${input} in ${(anagramSearchEnd - anagramSearchStart).toFixed(2)}ms`);
    }

    // ask for another word
    askInput('\nAnagramFinder> ', findAnagrams);
  }
};

// 2nd arg will be file name of the dictionary
readFile(process.argv[2])
  .then((data) => {
    loadDictionary(data);
    // Initial input
    askInput('\nAnagramFinder> ', findAnagrams);
  })
  .catch((err) => {
    console.log('Failed to load the dictionary file with err: ', err);
  });
