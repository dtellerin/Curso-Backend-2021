import express from 'express'
import {fork}  from 'child_process'
const app = express()
import { Router } from 'express'
const routerCalculoRandom = Router()

function frecuenciaNumeros(arr) {
    const map = arr.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map())
    return [...map.entries()]
}

function calculo(reps) {
    //let sum = {}
    let arraysum = []
    for (let i = 0; i < reps; i++) {
        const sum = getRandomInt(1,1000)
        arraysum.push(sum)
    }
    return arraysum
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



process.on('message', resultado => {
    console.log(`mensaje del padre: ${resultado}`)
    console.log(`worker #${process.pid} iniciando su tarea`)
        let arr = calculo(resultado)
    //let n = arr.length;
    const result = frecuenciaNumeros(arr)
    process.send(result.sort())
    console.log(`worker #${process.pid} finalizó su trabajo`)
    process.exit()
})

process.send('listo')


routerCalculoRandom.get('/', (req, res) => {
    let rands = ''
    console.log('Randoms 1: ' + req.query.cant)
    if (req.query.cant == undefined || req.query.cant == '') {
        //console.log('Randoms 2: ' + req.query.cant) 
        rands = 100000000
    } else {
        //console.log('Randoms 3: ' + req.query.cant)
        rands = req.query.cant
    }
    const computo = fork('./src/router/calculo.js')
    computo.on('message', msg => {
        if (msg == 'listo') {
            computo.send(rands)
        } else {
            //console.log(`Mensaje del hijo: OK`)
            res.json({ msg })
        }
    })
    
})
 
export default routerCalculoRandom