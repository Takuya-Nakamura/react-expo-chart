
import React from 'react';



export function hello(){
        console.log("Hello")
}

export function random(min, max){
    return Math.floor( Math.random() * (max + 1 - min) ) + min ;
}


