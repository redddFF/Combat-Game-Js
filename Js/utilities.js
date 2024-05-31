function dice (nb,faces){
    let sum = 0;
    for (let i = 0; i < nb; i++) {
        sum += random(1,faces);
    }
    return sum;
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}