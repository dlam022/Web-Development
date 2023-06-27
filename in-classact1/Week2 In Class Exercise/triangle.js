
/* TODO - Return the triangle calculations by calling your helper functions.
This function will be used in your eventListener
to print out the correct information about the triangle to your index.html page */

var x = 5;
let y = 15;
 
dostuff = (function(){
    y+=2;
    let x = 6;
    var z = 8;
    console.log("x: " + x + " y:" + y + " z:" + z);

    dostuff2 = (function() {
        x+=3;
        y+=5;
        console.log("x: " + x + " y:" + y);
    })();
})();

console.log("x: " + x);
console.log("y: " + y);
console.log("z: " + z);
function triangleOutput(){
    /* Fetches the values from the form. Notice that they have 
    id=value1, value2 and value3 in the HTML */
    const a = parseFloat(document.getElementById('value1').value);
    const b = parseFloat(document.getElementById('value2').value);
    const c = parseFloat(document.getElementById('value3').value);
    if (checkTriangle(a,b,c) === true ){
        /*TODO */
        getTriangleType(a,b,c);
        acuteRightObtuse(a,b,c);
        perimeter(a,b,c);
        getArea(a,b,c);

    }
    else{
        return "The given sides do not form a triangle";
    }
}


/* TODO - Below are suggested functions .
You do not have to use them, but it is recommended */

/*  Check if triangle */
function checkTriangle(side1, side2, side3){
    if (side1 + side2 > side3 && side2 + side3 > side1 && side1 + side3 > side2) {
        return true;
    }

    else{
        return false;
    }

}

/* Check if Equilateral, Isosceles or Scalene */
function getTriangleType(side1,side2,side3){
    if(side1 == side2 && side2 == side3) {
        console.log("Equilateral Triangle");
        document.getElementById("output1").innerHTML = "Equilateral Triangle";
    }

    else if(side1 == side2 || side2 == side3 || side3 == side1) {
        console.log("Isosceles Triangle");
        document.getElementById("output1").innerHTML = "Isosceles Triangle";
    }

    else if(side1 != side2 && side2 != side3 && side1 != side3){
        console.log("Scalene Triangle");
        document.getElementById("output1").innerHTML = "Scalene Triangle";
    }

    else{
        console.log("not a triangle");
        document.getElementById("output1").innerHTML = "not a triangle";
    }
}


/* Calculate perimeter */
function perimeter (side1, side2, side3) {
    let per = side1 + side2 + side3;
    document.getElementById("output3").innerHTML = "perimeter = " + per;

}
/* Check if acute, right or obtuse */
function acuteRightObtuse (side1, side2, side3) {
    let sidea = Math.floor(Math.pow(side1, 2));
    let sideb = Math.floor(Math.pow(side2, 2));
    let sidec = Math.floor(Math.pow(side3, 2));

    if(sidea == sidea + sideb || sidea + sidec == sideb || sidea + sideb == sidec) {
        console.log("right-angled triangle");
        document.getElementById("output2").innerHTML = "Right-angled triangle";
    }

    else if(sidea > sidec + sideb || sideb > sidea + sidec || sidec > sidea + sideb) {
        console.log("Obtused-angled Triangle");
        document.getElementById("output2").innerHTML = "Obtused-angled triangle";
    }

    else{
        console.log("Acute-angled Triangle");
        document.getElementById("output2").innerHTML = "Acute-angled triangle";
    }
}

/* Function that gets the triangle angles*/
function getTriangleAngles(side1, side2, side3){
  const angleA1 =  Math.acos(((b*b) + (c*c) - (a*a))/(2*b*c));
  const angleB2 =  Math.acos(((c*c) + (a*a) - (b*b))/(2*c*a));
  const angleC3 =  Math.acos(((a*a) + (b*b) - (c*c))/(2*b*a));

  angleA = angleA1*(180/Math.PI);
  angleB = angleB2*(180/Math.PI);
  angleC = angleC3*(180/Math.PI);

  return [angleA, angleB, angleC];
}

/* Calculate the area */
function getArea(side1, side2, side3){
    let s = (side1 + side2 + side3)/2
    s = Math.sqrt(s * (s - side1) * (s - side2) * (s - side3))
    document.getElementById("output4").innerHTML = "area = " + s.toPrecision(2);
}

/* TODO - Create the Event listener, which calls the result of triangleOutput() 
*/
document.querySelector("#my-form > input[type=submit]").addEventListener('click', (event)=>{
    event.preventDefault();
    triangleOutput();   
})


