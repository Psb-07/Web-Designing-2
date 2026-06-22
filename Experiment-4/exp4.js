function calculateresult(){
let n=document.getElementById("subjects").value;
let total=0;
for (let i=1;i<=n;i++){
let marks=parseFloat(prompt("enter marks for subject"+i));
total=total+marks;
}
let average=total/n;
let grade;
let result;
if(average>=90){
grade=" A+";
result=" Pass";
}
else if(average>=75){
grade=" A";
result=" Pass";
}
else if(average>=60){
grade=" B";
result=" Pass";
}
else if(average>=50){
grade=" C";
result=" Pass";
}
else if(average>=40){
grade=" D";
result=" Pass";
}
else {
result=" Fail";
}
document.getElementById("result").innerHTML="Total Marks :"+ total + "<br>" + "Average Marks:"
+ average.toFixed(2) + "<br>" + "grade" + grade + "<br>" + "result" + result;
}