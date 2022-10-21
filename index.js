//?variatic function
// function a(...b) {
//     return b.reduce((a,b)=>a+b,0)
// }
// console.log(a(10,20,30,40));

function a(num,tar){
    b={}
for(i=0;i<num.length;i++){
    let v=num[i]
    // console.log(v);
    let c=tar-v
    console.log(b[c],'im');
    if(b[c]!==undefined){
        console.log(b[c],'im');
        console.log(c,'imc');
        return [b[c],i]

    }
    else{
        b[v]=i
        console.log(b);
    }
}
}

console.log(a([1,5,9],10));