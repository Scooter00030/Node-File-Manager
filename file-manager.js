var fs = require('fs');

var useStdin = function() {
	var input = process.stdin.read();
	console.log(input);
	if (input !== null) {
		var inputSplit = input.toString().trim().split(" ");
		if (inputSplit[0] == "cat") {
			//cat <filename>
			catFile(inputSplit[1]);
		} else if (inputSplit[0] === "touch") {
			//touch <filename>
			createNewFile(inputSplit[1]);
		} else if (inputSplit[0] === "rm"){
			delFile(inputSplit[1]);
		} else if (inputSplit[0] === "replace"){
			replaceWord(inputSplit[1], inputSplit[2], inputSplit[3]);
		} else if (inputSplit[0] === "findLine"){
			findLine(inputSplit[1], inputSplit[2]); 
		} else {
			console.log("No such command: " + inputSplit[0]);
		}
	};
};

//create a file (touch)
function createNewFile(fileName) {
	fs.writeFile(fileName, "", function(err){
		if (err) {
			console.log("Could not write to file");
		} else {
			console.log("File created and saved");
		}
	});
}

//read from a file (cat)
function catFile(fileName) {
	fs.readFile(fileName, function(err, data) {
		if (err) {
			console.log("Unable to read from file");
		} else {
			console.log(data.toString());
		}
	});
}

//delete a file
function delFile(fileName){
	fs.unlink(fileName, function(err) {
		if (err) {
			console.log("Unable to delete file");
		} else {
			console.log("The file was deleted");
		}
	});
}

function replaceWord(fileName, original, replacement){
	fs.readFile(fileName, function(err, data){
		if (err) {
			console.log("Unable to change text");
		} else {
			data = data.toString().split(original);
			data = data.join(replacement);
			fs.writeFile(fileName, data, function(err){
				if (err) {
					console.log("Could not write to file");
				} else {
					console.log("File created and saved");
				}
			});
		}
	});
}

function findLine(fileName, word){
	fs.readFile(fileName, function(err, data){
		if (err){
			console.log("Unable to select string");
		} 
		data = data.toString();
		data = data.split("\n");
		console.log(word);
		console.log(data[0]);
		for(var i = 0; i < data.length; i++){
			if(data[i].includes(word)){
				console.log(data[i]);
			}
		}
	});
}
	

process.stdin.on('readable', useStdin);

/*
Your assignment is to implement the following functionality:
	* remove a file
		"rm" <file name>
		> rm hello.txt
			entirely delete the file hello.txt

	* find and replace a word in the file
		"replace" <file to search> <word to replace> <replacement word>
		> replace hello.txt hello goodbye
			replace all instances of hello in hello.txt with goodbye
		> replace what.txt there their
			replace all instances of there in what.txt with their

	* find a line in a file
		"grep" <file name> <word to find>
		> grep hello.txt hello
			print out all of the lines in hello.txt that contain "hello"
		> grep what.txt there
			print out all of the lines in what.txt that contain "there"
			use more for loops because you're searching for specific words
			first split on line break, and then split each space, and then search for the words

	Bonus work:
		* Ask for confirmation before deleting a file
		* Don't let people delete files that are above the current working directory (i.e. disallow "../")
		* Have grep take a regular expression as the word to find
		* Create mkdir and rmdir
*/

