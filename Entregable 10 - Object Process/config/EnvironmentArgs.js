
import parseArgs from 'minimist'
const options = {
    alias: {
        m: 'modo',
        p: 'puerto',
        d: 'debug'
    },
    default: {
        modo: 'prod',
        puerto: 8080,
        debug: false
    }
}

const commandLineArgs = process.argv.slice(2)

export const {puerto, _} = parseArgs(commandLineArgs, options)
export const {modo} = parseArgs(commandLineArgs, options)
export const {debug} = parseArgs(commandLineArgs, options)