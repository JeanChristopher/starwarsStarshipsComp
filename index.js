document.getElementById("button").addEventListener('click',function(){
    run(gen).catch(function(err){
        alert(err.message);
    });
})

function run(genFunc){
    const genObject= genFunc(); //creating a generator object

    function iterate(iteration){ //recursive function to iterate through promises
        if(iteration.done) //stop iterating when done and return the final value wrapped in a promise
            return Promise.resolve(iteration.value);
        return Promise.resolve(iteration.value) //returns a promise with its then() and catch() methods filled
        .then(x => iterate(genObject.next(x))) //calls recursive function on the next value to be iterated
        .catch(x => iterate(genObject.throw(x))); //throws an error if a rejection is encountered
    }

    try {
        return iterate(genObject.next()); //starts the recursive loop
    } catch (ex) {
        return Promise.reject(ex); //returns a rejected promise if an exception is caught
    }
}

function *gen(){

    //fetch the film
var Star1Response = yield fetch("https://swapi.co/api/starships/" + document.getElementById("select_1").value);
var Star2Response = yield fetch("https://swapi.co/api/starships/" + document.getElementById("select_2").value);

var Star1 = yield Star1Response.json();
var Star2 = yield Star2Response.json();

    //star 1 params fetching
var name1 = Star1.name ;
var cost1 = Star1.cost_in_credits ;
var speed1 = Star1.max_atmosphering_speed ;
var cargo_size1 = Star1.cargo_capacity ;
var passengers1 = Star1.passengers ;

    //star 2 params fetching
var name2 = Star2.name ;
var cost2 = Star2.cost_in_credits ;
var speed2 = Star2.max_atmosphering_speed ;
var cargo_size2 = Star2.cargo_capacity ;
var passengers2 = Star2.passengers ;

    //Insertions for the star1 capacity

    document.getElementById("name1").innerHTML = name1;
    document.getElementById("cost1").innerHTML = cost1;
    document.getElementById("speed1").innerHTML = speed1;
    document.getElementById("cargo_size1").innerHTML = cargo_size1;
    document.getElementById("passengers1").innerHTML = passengers1;

     //Insertions for the star2 capacity

    document.getElementById("name2").innerHTML = name2;
    document.getElementById("cost2").innerHTML = cost2;
    document.getElementById("speed2").innerHTML = speed2;
    document.getElementById("cargo_size2").innerHTML = cargo_size2;
    document.getElementById("passengers2").innerHTML = passengers2;

}
