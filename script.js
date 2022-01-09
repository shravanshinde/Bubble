var arr = [];  //create empty array
var n =25;
for(var i = 0; i< 121; i++){ //initialize the array
    arr.push(n);
    n+=1;
}

function draw(n, color) {
      if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var width = 5;
        var currX = 10;
        ctx.clearRect(0, 0, canvas.width, canvas.height);	
        for(var i = 0; i < n.length; i++){
            if(i == color){
                ctx.fillStyle = 'red';
            }else{
                ctx.fillStyle = 'blue';
            }
            var h = n[i];
            ctx.fillRect(currX, canvas.height - h, width, h);
            currX += width + 1;
        }
      }
}

function* bubbleSort(array, b) { // * is magic
    var swapped;
    var step = 0;
    var pass = 1;
    if(b==1){
        do{
            swapped = false;
            for (var i = array.length; i >=0; i--) {//bobble sort in revarse
                if (array[i] < array[i + 1]) {
                    var temp = array[i];
                    array[i] = array[i + 1];
                    array[i + 1] = temp;
                    swapped = true;
                    step++;
                    draw(array, i);
                    yield swapped; // pause here
                }
            }
            pass++
        } while (swapped);
    }else{
        do{
            swapped = false;
            for (var i = 0; i < array.length - 1; i++) {
                if (array[i] > array[i + 1]) {
                    var temp = array[i];
                    array[i] = array[i + 1];
                    array[i + 1] = temp;
                    swapped = true;
                    step++;
                    draw(array, i);
                    yield swapped; // pause here
                }
            }
            pass++
        } while (swapped);
    }
}

function start(option){
    canvas = document.getElementById('myCanvas');
    var sort = bubbleSort(arr, option);
      // an anim function triggered every 60th of a second
      function anim(ar){
        requestAnimationFrame(anim);
        //draw(ar);
        sort.next(); // call next iteration of the bubbleSort function
      }
      setTimeout(anim(arr), 7000);
}

//function ref(){ //Refreshes the page
//	location.reload();
//}

function ref(){ //Refreshes the page
    shuffle(arr);
    draw(arr, 0);
}

function shuffle(array) {//shuffles the array
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

window.onload = function(){
    canvas = document.getElementById('myCanvas');
    draw(arr, 0);
}
document.getElementById("sort").onclick = function() {start(2);};
document.getElementById("ref").onclick = function() {ref();};
document.getElementById("rev").onclick = function() {start(1);}; 