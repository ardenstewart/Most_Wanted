/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
    searchByName(people);
    break;
    case 'no':
    searchByTraits(people);
    break;
    default:
    alert("Wrong! Please try again, following the instructions dummy. :)");
    app(people); // restart app
    break;
  }
}

function searchByTraits(people) {
  let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.");
  let filteredPeople;
  console.log(userSearchChoice);
  switch(userSearchChoice) {
    case "height":
      filteredPeople = searchByHeight(people);
      break;
    case "weight":
      filteredPeople = searchByWeight(people);
      break;
    case "eye color":
      filteredPeople = searchByEyeColor(people);
      break;
      case "gender":
      filteredPeople = searchByGender(people);
      break;
      case "age":
      filteredPeople = searchByAge(people);
      break;
      case "occupation":
      filteredPeople = searchByOccupation(people);
      break;
    default:
      alert("You entered an invalid search type! Please try again.");
      searchByTraits(people);
      break;
  }  

  let foundPerson = filteredPeople[0];

  mainMenu(foundPerson, people);

}

function searchByWeight(people) {
  let userInputWeight = prompt("How much does the person weigh?");

  let newArray = people.filter(function (el) {
    if(el.weight == userInputWeight) {
      return true;
    }
    // return true if el.weight matches userInputWeight
  });

  return newArray;
}
// Menu function to call once you find who you are looking for
function searchByHeight(people) {
  let userInputHeight = prompt("How tall is the person?");

  let newArray = people.filter(function (el) {
    if(el.height == userInputHeight) {
      return true;
    }
    // return true if el.height matches userInputHeight
  });

  return newArray;
}
// Menu function to call once you find who you are looking for

function searchByEyeColor(people) {
  let userInputEyeColor = prompt("What is thier eye color?");

  let newArray = people.filter(function (el) {
    if(el.eyeColor == userInputEyeColor) {
      return true;
    }
    // return true if el.eyeColor matches userInputeyeColor
  });

  return newArray;
}
// Menu function to call once you find who you are looking for

function searchByGender(people) {
  let userInputGender = prompt("What is the person's gender?");

  let newArray = people.filter(function (el) {
    if(el.gender == userInputGender) {
      return true;
    }
    // return true if el.gender matches userInputGender
  });

  return newArray;
}
// Menu function to call once you find who you are looking for

function searchByAge(people) {
  let userInputAge = prompt("What is the person's age?");

  let newArray = people.filter(function (el) {
    if(el.age == userInputAge) {
      return true;
    }
    // return true if el.age matches userInputAge
  });

  return newArray;
}
// Menu function to call once you find who you are looking for

function searchByOccupation(people) {
  let userInputOccupation = prompt("What is the person's occupation?");

  let newArray = people.filter(function (el) {
    if(el.occupation == userInputOccupation) {
      return true;
    }
    // return true if el.height matches userInputHeight
  });

  return newArray;
}
// Menu function to call once you find who you are looking for
function findFamily (person, people){
// let parents
// let siblings
// let children
// let spouse 

   let family = [];

    let parents = findParents(person, people);
    family = family.concat(parents);
    let spouse = findSpouse(person, people);
    family = family.concat(spouse);
    let siblings = findSiblings(person, people);
    family = family.concat(siblings);
    let children = findChildren(person, people);
    family = family.concat(children);

    let familyString = "";
    for(let i = 0; i < family.length; i++) {
      familyString += family[i].firstName + " " + family[i].lastName + "\n";
    }
    return familyString;
    }

function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */


  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    alert("Gender: " + person[0].gender + "\n" + "Height: " + person[0].height + " inches" + "\n" + "Weight: " + person[0].weight + " pounds" + "\n" + "Eye Color: " + person[0].eyeColor)
    // TODO: missing age, will include once we figure that out.
    break;
    case "family":
   let familyString = findFamily(person, people);
    alert(familyString);
    
    break;
    case "descendants":
    // TODO: get person's descendants
    alert(" Descendants: " + "");
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}
// Still fiddling with finding  family members- trying this for now.


function findParents (person, people){
  let parentsCode1 = person[0].parents[0];
  let parentsCode2 = person[0].parents[1];

  let newArray = people.filter(function(el){
    if (el.id === parentsCode1 || el.id === parentsCode2){
      return true;
    }
  });
  return newArray;
}

  function findSpouse (person, people) {
    let spouseCode = person[0].currentSpouse;
    let newArray = people.filter(function (el) {
    if (el.id === spouseCode) {
       return true;
    }
    });
    return newArray;
  }


  function findSiblings (person, people) { 
    let parentsCode1 = person[0].parents[0];
    let parentsCode2 = person [0].parents[1];

    let newArray = people.filter(function (el) {
      if (el.parents[0] === parentsCode1 || el.parents[0] === parentsCode2 || el.parents[1] === parentsCode1 || el.parents[1] === parentsCode2) {
        return true;
      } 
    });
    return newArray;
  }


  function findChildren (person, people) {
    let idCode = person[0].id;

    let newArray = people.filter(function (el) {
      if (el.parents[0] === idCode || el.parents[1] === idCode ){
        return true;
      }
    });
    return newArray;
  }

// End of fiddling with family

function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);

  let filteredPerson = people.filter(function (el) {
  	if(el.firstName == firstName && el.lastName == lastName){
  		return true;
  	}
  });

  let foundPerson = filteredPerson;
  mainMenu(foundPerson, people);
}
  // TODO: find the person using the name they entered


// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  // personInfo += "Age: " + TODO- add in here once age is calculated
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true;
}// default validation only

