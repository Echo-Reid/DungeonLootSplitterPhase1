let loot = [];

const addButton = document.getElementById('submitButton');
const nameInput = document.getElementById('nameInput');
const valueInput = document.getElementById('valueInput');
const displayMessage = document.getElementById('lootValue');
const validationMessage = document.getElementById('validationMessage');
const splitButton = document.getElementById('splitButton');
const partySize = document.getElementById('partyInput');
const lootSplitValidationMessage = document.getElementById('lootSplitValidationMessage');
const finalSplitMessage = document.getElementById('finalSplitMessage');

addButton.addEventListener('click', function() //When to button to add loot is clicked
{
    addLoot();
    renderLoot();
});


splitButton.addEventListener('click', function() //When the button to split loot is clicked
{
    splitLoot();
});

function addLoot() //Validates, then adds the loot to the array if it passes validation
{
    let userValue = parseFloat(valueInput.value);
    if (Number.isNaN(userValue))
    {
        validationMessage.innerHTML = "Error. Please enter an integer, and only that integer. "
    }
    else if (userValue < 0)
    {
        validationMessage.innerHTML = "Error. Please enter a positive integer. "
    }
    else if (nameInput.value === "")
    {
        validationMessage.innerHTML = "Error. Please enter a name for the loot. "
    }
    else
    {
        loot.push({name: nameInput.value, value: userValue});
        validationMessage.innerHTML = " "
    }
}

function renderLoot() //populates the display messages.
{
    let lootValueTotal = 0;
    let buildingDisplayMessage = "";

    for (let i = 0; i < loot.length; i++)
        {
            lootValueTotal += loot[i].value;
        }
        for (let i = 0; i < loot.length; i++) //This needs to be 2 loops because of design specifications
        {
            buildingDisplayMessage += (`${loot[i].name}<br>`)
        }

        buildingDisplayMessage += `Total value of all loot: ${(Math.round(lootValueTotal).toFixed(2))}`;
        displayMessage.innerHTML =  buildingDisplayMessage;
}

function splitLoot() //gets the loot total value, then splits it after validation
{
    let userInt = parseInt(partySize.value);
    let displayMessage = "";
    let finalTotalLootValue = 0;
    let individualLootTotal = 0;

    //initial validation that required input is present and valid. 
    if (Number.isNaN(userInt))
    {
        lootSplitValidationMessage.innerHTML = "Error. Please enter an integer, and only that integer for party size. "
    }
    else if (userInt < 0)
    {
        lootSplitValidationMessage.innerHTML = "Error. Please enter a positive integer for party size. "
    }
    else if (loot.length === 0) //this ensures no 0 values
    {
        lootSplitValidationMessage.innerHTML = "Error. Please enter loot to be split. "
    }
    else //passes validation
    {
        lootSplitValidationMessage.innerHTML = ""
        
        //getting loot total
        for (let i = 0; i < loot.length; i++)
        {
            finalTotalLootValue += loot[i].value;
        }
        individualLootTotal = finalTotalLootValue / userInt;

        //writing display message
        displayMessage = `Total Loot: $${(Math.round(finalTotalLootValue).toFixed(2))} Loot Per Party Member: $${(Math.round(individualLootTotal).toFixed(2))}`;
        finalSplitMessage.innerHTML = displayMessage;
    }
}