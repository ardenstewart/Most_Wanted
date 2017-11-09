 function app(people){
   var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
   switch(searchType){
     case 'yes':
     searchByName(people);
     break;
     case 'no':
     searchByTraits(people, people);
     break;
     default:
     alert("Wrong! Please try again, following the instructions dummy. :)");
     app(people); 
     break;
   }
 
 }

 function searchByName(people){
   var firstName = promptFor("What is the person's first name?", chars).toLowerCase();
   var lastName = promptFor("What is the person's last name?", chars).toLowerCase();
   firstName = capitalizeFirstName(firstName);
   lastName = capitalizeLastName(lastName);
   let filteredPerson = people.filter(function (el) {
   	if(el.firstName == firstName && el.lastName == lastName){
   		return true;
   	}
   });
 
   let foundPerson = filteredPerson;
   mainMenu(foundPerson, people);
 }

 function searchByTraits(people, foundPeople) {
   let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.");
   let searchAgain;
   let filteredPeople;
   switch(userSearchChoice) {
     case "height":
       filteredPeople = searchByHeight(foundPeople);
       break;
     case "weight":
       filteredPeople = searchByWeight(foundPeople);
       break;
     case "eye color":
       filteredPeople = searchByEyeColor(foundPeople);
       break;
     case "gender":
       filteredPeople = searchByGender(foundPeople);
       break;
     case "age":
       filteredPeople = searchByAge(foundPeople);
       break;
     case "occupation":
       filteredPeople = searchByOccupation(foundPeople);
       break;
     default:
       alert("You entered an invalid search type! Please try again.");
       searchByTraits(people);
        break;
    }  
    foundPeople = filteredPeople;
    (displayPeople(filteredPeople));
    while(foundPeople.length > 1 ){
    searchAgain = promptFor("Would you like to refine your search?", yesNo).toLowerCase();
  	  if(searchAgain === "yes"){
  	  	return searchByTraits(people, filteredPeople);
    	  }
    	  else{
    	  	foundPeople = (selectPerson(filteredPeople));
    	  	break;
    	  }
    }
    mainMenu(foundPeople, people);
  }


function searchByHeight(people) {
  let userInputHeight = prompt("How tall is the person?");

  let newArray = people.filter(function (el) {
    if(el.height == userInputHeight) {
      return true;
    }

  });

  return newArray;
}

function searchByWeight(people) {
  let userInputWeight = prompt("How much does the person weigh?");


  let newArray = people.filter(function (el) {
    if(el.weight == userInputWeight) {
      return true;
    }
  });

  return newArray;
}

function searchByEyeColor(people) {
  let userInputEyeColor = prompt("What is thier eye color?");

  let newArray = people.filter(function (el) {
    if(el.eyeColor == userInputEyeColor) {
      return true;
    }

  });

  return newArray;
}

function searchByGender(people) {
  let userInputGender = prompt("What is the person's gender?");

  let newArray = people.filter(function (el) {
    if(el.gender == userInputGender) {
      return true;
    }
  });

  return newArray;
}

function searchByAge(people) {
  people = people.map(function(el) {
    let age = getAge(el.dob);
    el.age = age;
    return el;
  })

  let userInputAge = prompt("What is the persons age?");
  let newArrayAge = people.filter(function (el) {
    if (el.age == userInputAge) {
      return true;
    }

  });
  return newArrayAge
}


function getAge(dob) {
    let date = new Date();
    date = date.getFullYear();
    dob = dob.split("/");
    let age = date - dob[2];
    return age;
}


function searchByOccupation(people) {
  let userInputOccupation = prompt("What is the person's occupation?");

  let newArray = people.filter(function (el) {
    if(el.occupation == userInputOccupation) {
      return true;
    }
  });

  return newArray;
}

function selectPerson(filteredPeople){
  let userChoiceFirstName;
  let userChoiceLastName;
  let userPersonChoice = prompt("Please select a person:\n\n" + filteredPeople.map(function(person){
     return person.firstName + " " + person.lastName;
   }).join("\n"));
  userPersonChoice = userPersonChoice.split(" ");
  userChoiceFirstName = userPersonChoice[0].toString();
  userChoiceFirstName = userChoiceFirstName.charAt(0).toUpperCase() + userChoiceFirstName.slice(1);
  userChoiceLastName = userPersonChoice[1].toString();
  userChoiceLastName = userChoiceLastName.charAt(0).toUpperCase() + userChoiceLastName.slice(1);
  filteredPeople = filteredPeople.filter(function (el){
    if(userChoiceFirstName === el.firstName && userChoiceLastName === el.lastName){
      return true;
    }
  });
  return filteredPeople;
 }

function findFamily (person, people){

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


  if(!person){
    alert("Could not find that individual.");
    return app(people); 
  }

  var displayOption = prompt("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    alert("Gender: " + person[0].gender + "\n" + "Height: " + person[0].height + " inches" + "\n" + "Weight: " + person[0].weight + " pounds" + "\n" + "Eye Color: " + person[0].eyeColor + "\n" + 
      "Age: " + getAge(person[0].dob));

    break;
    case "family":
   let familyString = findFamily(person, people);
    alert("Family: " + familyString);
    break;
    case "descendants":
    let descendants = getDescendants(person, people, descendantsArray=[]);
    let descendantString = getDescendantsString(descendants);
    if (descendantString === ""){
      alert("They have no descendants")
    }else {
    alert(" Descendants: \n\n" + descendantString);
    }
    break;
    case "restart":
    app(people); 
    break;
    case "quit":
    return; 
    default:
    return mainMenu(person, people); 
  }
}



function findParents (person, people){
  if (person[0].parents[0] !== undefined) {

  let parentsCode1 = person[0].parents[0];
  let parentsCode2 = person[0].parents[1];

  let newArray = people.filter(function(el){
    if (el.id === parentsCode1 || el.id === parentsCode2){
      return true;
    }
  });
  return newArray;
} else {let emptyArray = []; return emptyArray;}
}

  function findSpouse (person, people) {
     if (person[0].spouse !== undefined) {
    let spouseCode = person[0].currentSpouse;
    let newArray = people.filter(function (el) {
      
    if (el.id === spouseCode) {
       return true;
    }
    });
    return newArray;
  }else {let emptyArray = []; return emptyArray;}
  }


  function findSiblings (person, people) { 
    if (person[0].parents[0] !== undefined) {
    let parentsCode1 = person[0].parents[0];
    let parentsCode2 = person[0].parents[1];
    if (!parentsCode1){
      return;
    }
    let newArray = people.filter(function (el) {
      if (el.parents[0] === parentsCode1 || el.parents[0] === parentsCode2 || el.parents[1] === parentsCode1 || el.parents[1] === parentsCode2) {
        return true;
      } 
    });
    return newArray;
  }else {let emptyArray = []; return emptyArray;}
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


function displayPeople(people){
	if(people.length === 0){
		return alert("Your search has returned the following results:\n\nNo Results!")
	}
  return alert("You search has returned the following results:\n\n" + people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Age: " + getAge(person[0].dob) + "\n"
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  alert(personInfo);
}

function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

function chars(input){
  return true; 
}

function capitalizeFirstName(firstName){
 	return firstName.charAt(0).toUpperCase() + firstName.slice(1);
}

function capitalizeLastName(lastName){
 	return lastName.charAt(0).toUpperCase() + lastName.slice(1);
}

function getDescendants(person, people, descendants=[]){
	let nextGeneration;

	for(let i = 0; i < person.length; i++){
		nextGeneration = people.filter(function(el){
	  	return(el.parents[0] === person[i].id || el.parents[1] === person[i].id)	
	  });
	}
	descendants = descendants.concat(nextGeneration);
	if (nextGeneration.length > 0){
		descendants = getDescendants(nextGeneration, people, descendants);
	}
	return descendants;
}

function getDescendantsString(descendants){
	let descendantString = "";
	for(let i = 0; i < descendants.length; i++) {
	   descendantString += descendants[i].firstName + " " + descendants[i].lastName + "\n";
	}
	return descendantString;
}

