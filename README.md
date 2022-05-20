# AnagramFinder

## Description:
Javascript program to find all anagrams for a given word from a given dictionary file. The program provides a command line prompt where a user can input a word of their choice. On hitting enter the program will find all anagrams, if any exist, of the *{word}* and print them out on the next line as a comma separated list. If no anagrams are found it will print out “No anagrams found for *{word}*”.

## System Requirement:
Node: 12+ (no external packages are used)

## Program description:
This repo includes two different version for anagram finder programs:
1. Basic Anagram Finder(basic-anagram-finder.js)
2. Efficient Anagram Finder(efficient-anagram-finder.js)

### Basic Anagram Finder(basic-anagram-finder.js):
- This program is will load the dictionary file line by line only when the user will search for all anagram words for a given word.
- For each word that it loads line by line it will sort and compare it against the imput word to see if its equal and add it to the resulting anagram list.
- This approach is more memory efficient as it does not load the dictionary in heap memory before hand and more suitable for a one time search only.

### Efficient Anagram Finder(efficient-anagram-finder.js):
- This program will load the dictionary file in memory during program startup itself.
- It will sort all the words in the dictionary alphabetically and store it in a hash map where the key is the sortedString and value is an array of all matching anagrams.
- This approach is faster for lookup and efficient to find many anagrams over and over. (_Note: This complexity of sorting of words is still efficient as it will be based on the length of words which assuming english character set won't be that much of a bottleneck)

## Steps to execute:
- `node basic-anagram-finder.js dictionary.txt`

  ![image](https://user-images.githubusercontent.com/26828014/169619440-f45a77e9-df4e-42d6-8acf-ae63a9d796ee.png)
  
- `node efficient-anagram-finder.js dictionary.txt`

  ![image](https://user-images.githubusercontent.com/26828014/169619569-20887e9d-9d0a-4770-8e6c-addbc868c366.png)
