//take user input as coins
//collect amount of bet 
//build thier symbols
//spin the slot machine
//ifelse of winning situations  
//formaulate the wheels with the user input process
//symbols include stars,cards,bars,numbers,fruits,jackpot with three money symbol together and bar 

const prompt = require("prompt-sync")();

//spin slot machine 
const rows = 3;
const cols = 3;
const symbolcount = {
    "A":2,
    "B":4,
    "C":6,
    "D":8
}
const symbolval = {
    "A":5,
    "B":4,
    "C":3,
    "D":2
}



//input 
const deposit =()=>{
    while(true){
    
    const depositamt = prompt("Enter your deposit amount: ");
    const numberdepositamt = parseFloat(depositamt); 

    //parsefloat only for taking integer numbers
//here it will take valid numbers only 
    if(isNaN(numberdepositamt) || (numberdepositamt <= 0)){
        console.log("Invalid deposit amount, try again: ");
    } 
    else{
        return numberdepositamt;
    }
}
};

//get number of lines 
const getnumberoflines = () =>
{
    while(true){
    
        const lines = prompt("Enter the number of lines : ");
        const numberoflines = parseFloat(lines); 
    
         
        if(isNaN(numberoflines) || (numberoflines <= 0) || (numberoflines > 3)){
            console.log("Invalid number of lines, try again: ");
        } 
        else{
            return numberoflines;
        }
    }
};

//get the bet 

const getbet = (balance, lines) =>
{
    while(true){
    
        const bet  = prompt("Enter the total bet : ");
        const numberbet = parseFloat(bet); 
    
         
        if(isNaN(numberbet) || (numberbet <= 0) || (numberbet > balance/lines)){
            console.log("Invalid bet amount, try again: ");
        } 
        else{
            return numberbet;
        }
    }
};


const spin = () =>{
    const symbols = []; //built an 2d array 
    for (const [symbol,count] of Object.entries(symbolcount)){
       // console.log(symbol,count);
       for(let i=0; i<count; i++)
       {
        symbols.push(symbol); //push new element in the array 
       }
    }
    //console.log(symbols);
    const reels = [];
    for(let i =0; i<cols; i++)
    {
        reels.push([]);
        const reelsymbol = [...symbols]; //copy the real symbols into an array 
        for(let j=0; j<rows; j++){
            const randomIndex = Math.floor(Math.random() * reelsymbol.length); 
            const selectedSymbol = reelsymbol[randomIndex];
            reels[i].push(selectedSymbol);
            reelsymbol.splice(randomIndex,1);


        }
    }
    return reels;
}


//transposed matrix 
const transpose = (reels) =>{
    const row = [];
    for(let i=0; i<rows; i++)
    {
        row.push([]);
        for(let j=0; j<cols; j++)
        {
            row[i].push(reels[j][i]); //tranpose

        }
    }
    return row;
}

const printrows = (row) => {
    for(const roow of row){
        let rowstring = "";
        for(const [i, symbol] of roow.entries()){ //give [1,a] [2,b] and so on
            rowstring+=symbol;if(i!=roow.length-1){
                rowstring+= " | ";
            }
        }
        console.log(rowstring);
    }
}

//check if user wins 
const getwinnings = (row,bet,lines)=>{
    let winnings = 0;
    for(let roow=0; roow<lines; roow++) //if lines=1, index=0 
    {
        const symbols = row[roow];
        let allSame = true ;
        for(const symbol of symbols)
        {
            if(symbol!=symbols[0])
            {
                allSame = false;
                break;
            }
        }
        if (allSame){
            winnings+=bet*symbolval[symbols[0]];
        }
    }
    return winnings;
}

//give user their winnings and play again 
const game = ()=>{



let balance = deposit();
while(true){
console.log("You have a balance of $" + balance);
const numberoflines = getnumberoflines();

const reels = spin();
const bet = getbet(balance, numberoflines);
balance = bet*numberoflines;
const row = transpose(reels);
printrows(row);
const winnings = getwinnings(row,bet,numberoflines);
balance+=winnings;
console.log("You won, $" + winnings.toString());
if(balance<0)
{
    console.log("You ran out of money!");
    break;
}
const playagain = prompt("Do you want to play again  (y/n) " );
if(playagain != "y")
break;
}
}


game();