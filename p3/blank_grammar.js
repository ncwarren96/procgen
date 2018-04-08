'use strict';
//Used Darius Kazemi's Corpora for vegetables and fruits
let rules ={
    "vegetables": [
        "acorn squash",
        "alfalfa sprout",
        "amaranth",
        "anise",
        "artichoke",
        "arugula",
        "asparagus",
        "aubergine",
        "azuki bean",
        "banana squash",
        "basil",
        "bean sprout",
        "beet",
        "black bean",
        "black-eyed pea",
        "bok choy",
        "borlotti bean",
        "broad beans",
        "broccoflower",
        "broccoli",
        "brussels sprout",
        "butternut squash",
        "cabbage",
        "calabrese",
        "caraway",
        "carrot",
        "cauliflower",
        "cayenne pepper",
        "celeriac",
        "celery",
        "chamomile",
        "chard",
        "chayote",
        "chickpea",
        "chives",
        "cilantro",
        "collard green",
        "corn",
        "corn salad",
        "courgette",
        "cucumber",
        "daikon",
        "delicata",
        "dill",
        "eggplant",
        "endive",
        "fennel",
        "fiddlehead",
        "frisee",
        "garlic",
        "gem squash",
        "ginger",
        "green bean",
        "green pepper",
        "habanero",
        "herbs and spice",
        "horseradish",
        "hubbard squash",
        "jalapeno",
        "jerusalem artichoke",
        "jicama",
        "kale",
        "kidney bean",
        "kohlrabi",
        "lavender",
        "leek ",
        "legume",
        "lemon grass",
        "lentils",
        "lettuce",
        "lima bean",
        "mamey",
        "mangetout",
        "marjoram",
        "mung bean",
        "mushroom",
        "mustard green",
        "navy bean",
        "new zealand spinach",
        "nopale",
        "okra",
        "onion",
        "oregano",
        "paprika",
        "parsley",
        "parsnip",
        "patty pan",
        "pea",
        "pinto bean",
        "potato",
        "pumpkin",
        "radicchio",
        "radish",
        "rhubarb",
        "rosemary",
        "runner bean",
        "rutabaga",
        "sage",
        "scallion",
        "shallot",
        "skirret",
        "snap pea",
        "soy bean",
        "spaghetti squash",
        "spinach",
        "squash ",
        "sweet potato",
        "tabasco pepper",
        "taro",
        "tat soi",
        "thyme",
        "topinambur",
        "tubers",
        "turnip",
        "wasabi",
        "water chestnut",
        "watercress",
        "white radish",
        "yam",
        "zucchini"
    ],
    "fruits": [
        "apple",
        "apricot",
        "avocado",
        "banana",
        "bell pepper",
        "bilberry",
        "blackberry",
        "blackcurrant",
        "blood orange",
        "blueberry",
        "boysenberry",
        "breadfruit",
        "canary melon",
        "cantaloupe",
        "cherimoya",
        "cherry",
        "chili pepper",
        "clementine",
        "cloudberry",
        "coconut",
        "cranberry",
        "cucumber",
        "currant",
        "damson",
        "date",
        "dragonfruit",
        "durian",
        "eggplant",
        "elderberry",
        "feijoa",
        "fig",
        "goji berry",
        "gooseberry",
        "grape",
        "grapefruit",
        "guava",
        "honeydew",
        "huckleberry",
        "jackfruit",
        "jambul",
        "jujube",
        "kiwi fruit",
        "kumquat",
        "lemon",
        "lime",
        "loquat",
        "lychee",
        "mandarine",
        "mango",
        "mulberry",
        "nectarine",
        "nut",
        "olive",
        "orange",
        "pamelo",
        "papaya",
        "passionfruit",
        "peach",
        "pear",
        "persimmon",
        "pineapple",
        "plum",
        "pomegranate",
        "purple mangosteen",
        "quince",
        "raisin",
        "rambutan",
        "raspberry",
        "redcurrant",
        "star fruit",
        "strawberry",
        "tamarillo",
        "tangerine",
        "tomato",
        "ugli fruit",
        "watermelon"
    ],
    "pre-meat":["sweet and sour", "fried", "deep-fried", "grilled", "stir-fried", "hawaiian", "baked"],
    "meat":["burger", "steak", "chicken", "filet-mingon", "pork", "tofu", "meatloaf", "sosyrizo", "seitan", "sausage"],

    "healthy":["vegan", "vegetarian", "non-GMO", "organic", "local", "cage-free", "gluten free", "halal", "fat-free", "kosher"],
    "sos":["salad", "soup"],
    "maindish":["#healthy# #pre-meat# #meat#"],
    "sidedish":["#healthy# #fruits# #vegetables# #sos#", "#healthy# #vegetables# #vegetables# #sos#", "french fries", "a side of #pre-meat# #vegetables.s#"],

    "collegedh":["Crown/Merrill", "College 9/10", "Porter/Kresge", "Rachel Carson/Oakes", "Cowell/Stevenson"],
    "college":["Crown", "Merrill", "College 9", "College 10", "Porter", "Kresge", "Rachel Carson", "Oakes", "Cowell", "Stevenson"],
    "collegenight":[""],

    "chirps":["Today we are serving #maindish# with #sidedish# at #collegedh# dining hall.",
               "#collegedh# dining hall is serving #maindish# and #sidedish# today!",
               "We have #maindish# and #sidedish# at #collegedh# dining hall this evening!",
               "[c:#college#] #c# dining hall is now closed for #c# college night!" ]
}

let grammar = tracery.createGrammar(rules);
grammar.addModifiers(baseEngModifiers);
grammar.clearState();


function getBotName(grammar_context) {
	return "UCSCDining_bot";
}

function getReplyName(grammar_context) {
	return "Student";
}

function makeChirp() {
	let chirp_text = grammar.flatten("#chirps#");
    console.log(chirp_text);
	return {"message" : chirp_text, "context" : [grammar, chirp_text]};
}

function makeReply(user_input_text, context) {
	let reply_grammar = context[0];
    let chirp_og = context[1];
    let reply_word = "";
    let reply = "Please come in and try for yourself!";

    for(let i = 0; i<rules["vegetables"].length; i++){
        let veg_word = rules["vegetables"][i]
        let fru_word = rules["fruits"][i]
        let me_word = rules["meat"][i]
        if (user_input_text.includes(veg_word)){
            reply_word = veg_word;
        }
        else if(user_input_text.includes(fru_word)){
            reply_word = fru_word;
        }
        else if(user_input_text.includes(me_word)){
            reply_word = me_word;
        }
    }

    if(reply_word != ""){
        if(chirp_og.includes(reply_word)){
            reply = "Sorry, we are all out of "+ reply_word+"."
        }else{
            reply = "We aren't serving any "+reply_word+" today!"
        }
        
    }
	
	return {"message": reply, "context": reply_grammar};
};
