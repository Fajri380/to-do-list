let n =2;

function isPrima(n) {
    if (n < 2) {
        return false;
    }
    for (let i = 2 ; i < 5 ; i++) {
        if(n%1==0){
            return false
        }
        return true
    }
}
console.log(isPrima(n))