let X = 0
let Y = 0
let xOffset = 0
let yOffset = 0
let selectedCard
let cardDict = 
{
    "A":1,
    "J":11,
    "Q":12,
    "K":13
}
//let wholeSuite = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"] flash back to the time this pointed to a memory address :)))
let cardPool = 
[
    ["dA","d2","d3","d4","d5","d6","d7","d8","d9","d10","dJ","dQ","dK"],
    ["cA","c2","c3","c4","c5","c6","c7","c8","c9","c10","cJ","cQ","cK"],
    ["hA","h2","h3","h4","h5","h6","h7","h8","h9","h10","hJ","hQ","hK"],
    ["sA","s2","s3","s4","s5","s6","s7","s8","s9","s10","sJ","sQ","sK"]
]

let currentDraw = -1;
//DIAMOND,CLUBS,HEARTS,SPADES

//console.log(cardPool)
let board = document.getElementById("placeable_area")
let drawPile = document.getElementById("drawPile")
let drawCardDiv = document.getElementById("drawCard")
document.addEventListener("mousemove",function(e)
{
X = e.clientX
Y = e.clientY
if(selectedCard)
{
    selectedCard.style.left = (X-xOffset).toString() + "px"
    selectedCard.style.top = (Y-yOffset).toString() + "px"
}
})

function startDragging(card)
{
   selectedCard = card
   xOffset = X-selectedCard.offsetLeft
   yOffset = Y-selectedCard.offsetTop
   //alert(card.dataset.suite)
}



function stopDragging()
{
    selectedCard = null
}
function createCard(cardData,slot)
{
    let card = document.createElement("div")
    card.classList.add("cardDimension")
    card.classList.add("card")
    let tLN = document.createElement("div") //top left number
    tLN.classList.add("topLNumber")
    let bRN = document.createElement("div") //bottom right number
    bRN.classList.add("bottomRNumber")
    let chosenSuite = "report this bug please"
    //♠♦♣♥
    switch(cardData.charAt(0))
    {
        case "d":
            card.style.color = "red"
            chosenSuite = "♦"
            card.dataset.suite = "red"
        break;
        case "c":
            card.style.color = "black"
            chosenSuite = "♣"
            card.dataset.suite = "black"
        break;
        case "h":
            card.style.color = "red"
            chosenSuite = "♥"
            card.dataset.suite = "red"
        break;
        case "s":
            card.style.color = "black"
            chosenSuite = "♠"
            card.dataset.suite = "black"
        break;
    }
    card.id = cardData
    cardData = cardData.slice(1,cardData.length)
    let trueValue = cardData
    if(cardDict[cardData])
    {
        trueValue = cardDict[cardData]
    }
    card.dataset.trueValue = trueValue
    bRN.innerText = cardData + "\n" + chosenSuite
    tLN.innerText = cardData + "\n" + chosenSuite
    slot.appendChild(card)
    let suiteDiv = document.createElement("div")
    suiteDiv.classList.add("suite")
    suiteDiv.innerText = chosenSuite
    card.appendChild(suiteDiv)
    card.appendChild(tLN)
    card.appendChild(bRN)
    return card
}
function cardChooser()
{
    let max = 3
    let min = 0
    let suiteChoice = Math.round(Math.random() * (max - min) + min)
    let chosenCard = 0
    let cardChoice = 0
    while(cardPool[suiteChoice].length <= 0)
    {
        suiteChoice = Math.round(Math.random() * (max - min) + min)
    }
    cardChoice = Math.floor(Math.random() * cardPool[suiteChoice].length)
    chosenCard = cardPool[suiteChoice][cardChoice];
    //cardPool[suiteChoice][cardChoice] = 0
    cardPool[suiteChoice].splice(cardChoice,1)
    //console.log(cardPool[suiteChoice][cardChoice])
   // cardPool[suiteChoice].splice(cardChoice,1);
    return chosenCard
}

function generateGame()
{
   
    for(let i=1;i<=7;i++)
    {
        let card = document.createElement("div")
        card.classList.add("cardDimension")
        card.classList.add("card")
        let slot = document.getElementById("slot"+i.toString())
       createCard(cardChooser(),slot)
    }
    let newArr = [];


for(let i = 0; i < cardPool.length; i++)
{
    newArr = newArr.concat(cardPool[i]);
}
cardPool = newArr.slice()
cardPool.sort(() => Math.random() - 0.5); 
console.log(cardPool)
}
generateGame()

function drawCard()
{
    currentDraw++
    while(drawPile.childElementCount > 0)
    {
        drawPile.removeChild(drawPile.lastElementChild)
    }
    switch(currentDraw)
    {
        case cardPool.length-1:
        drawCardDiv.style.backgroundImage = "none";
        createCard(cardPool[currentDraw],drawPile)
        return
        case cardPool.length:
        drawCardDiv.style.backgroundImage = 'url("back.jpg")';
       // createCard(cardPool[currentDraw],drawPile)
        currentDraw = -1
        return
        
    }
    
    createCard(cardPool[currentDraw],drawPile)
}

/*
let cbox = document.querySelectorAll(".card");
cbox.forEach(box => {
  box.addEventListener('mousedown', () => alert(box));
  box.addEventListener('mouseup', () => stopDragging(box))
});
*/

document.addEventListener("mousedown",function(e)
{
    if(e.target.dataset.trueValue == "1" && e.target.parentElement.dataset.suite == "A")
    {
        e.target.style.pointerEvents = "none"
        return;
    }
    if(e.target.classList.contains("card"))
    {
        startDragging(e.target)
        e.target.style.pointerEvents = "none"
    }
})

document.addEventListener("mouseup",function(e)
{
    let cardRef = selectedCard
    stopDragging()

    switch(e.target.dataset.suite)
    {
        case "black":
            switch(cardRef.dataset.suite)
            {
                case "red":
                    alert("valid!")
                break;
                case "black":
                    alert("so bad")
                break;
            }
        break;
        case "red":
            switch(cardRef.dataset.suite)
            {
                case "black":
                    alert("valid!")
                break;
                case "red":
                    alert("so bad")
                break;
            }
        break;
        case "A":
            if(cardRef.dataset.trueValue == "1")
            {
                e.target.classList.remove("A")
                e.target.innerText = null
                let savedCardData = cardRef.id
                cardRef.remove()
                cardRef = createCard(savedCardData,e.target)
                e.target.appendChild(cardRef)
               
              //  cardRef.classList.remove("card")
               // cardRef.stye.left = e.target.style.left
               // cardRef.style.top = e.target.style.top
               // cardRef.style.left = (e.target.offsetLeft - cardRef.offsetLeft) + 'px';
                
                

            }
        break;

    }
    
    cardRef.style.pointerEvents = "auto"
    //run this last
   // alert(e.target.innerText)
})




//console.log(cardPool)
/*
function cardSlots()
{
    let blanks = ["drawPile","blank"]
    let slot = document.createElement("div")
        slot.classList.add("drawCard")
        slot.classList.add("cardDimension")
        board.appendChild(slot)
        for(let i=0;i<2;i++)
        {
            slot = document.createElement("div")
            slot.id = blanks[i]
            slot.classList.add("cardDimension")
            board.appendChild(slot)
        }
    for(let i=0;i<4;i++)
    {
        let slot = document.createElement("div")
        slot.classList.add("A")
        slot.classList.add("cardDimension")
        slot.innerText = 'A'
        board.appendChild(slot)
    }
    for(let i=0;i<7;i++)
    {
        slot = document.createElement("div")
        slot.classList.add("cardDimension")
        board.appendChild(slot)
    }
}

cardSlots()
*/