import {Router} from 'express'
const routerSystemInfo = Router()
import express from 'express'
const app = express()

//const args = process.argv
const ejecutable = process.execPath.split('/').pop()
const pid = process.pid
const platform = process.platform
const version = process.version
const proyecto = process.cwd()
const memory = (process.memoryUsage.rss() / 1024 /1024).toFixed(2) + ' Mb'

export const datos = {
    ejecutable,
    pid, 
    platform,
    version,
    proyecto,
    memory
}

routerSystemInfo.get('/', (req,res) => {
    res.render('systemInfo', {datos})
})

export default routerSystemInfo
