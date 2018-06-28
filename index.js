const bitcoin = require('bitcoinjs-lib');
const bigi = require('bigi');
const wif = require('wif');
const bip39 =  require('bip39');
const fs = require('fs')
const generatePassword = require('generate-password')
const argv = require('yargs').argv
const Json2csvParser = require('json2csv').Parser;


if (process.argv.length < 3 || process.argv[2].indexOf('--keys=') === -1) {
    throw 'Missing the --keys parameter. i.e --keys=20'
}

if (!argv.keys) {
    throw 'Missing the --keys parameter. i.e --keys=20'
}


function generate (phrase) {
    const hash = bitcoin.crypto.sha256(phrase);
    const d = bigi.fromBuffer(hash);
    const address = new bitcoin.ECPair(d).getAddress();
    const privateKey = wif.encode(128, hash, true);

    return { address, privateKey, passphrase: phrase }
}

let keys = []


for (let i = 0; i < argv.keys; i++) {
    let phrase;
    if (argv.mode === "seed") {
        phrase = bip39.generateMnemonic()
    }
    else if (argv.mode === "password-phrase") {
        phrase = generatePassword.generateMultiple(12, {
            length: 10,
            uppercase: true,
            numbers: true,
            symbol: true
        }).join(' ')
    }
    else if (argv.mode === "password") {
        phrase = generatePassword.generate({
            length: 10,
            uppercase: true,
            numbers: true,
            symbol: true
        })
    }
    keys.push(generate(phrase))
}

    const json2csvParser = new Json2csvParser({ fields: ['address', 'privateKey', 'passphrase'] });
    fs.writeFile(__dirname + '/keys.csv', json2csvParser.parse(keys), { encoding: 'utf-8' }, err => {
        if ( err) {
            throw err
        }
    })
    fs.writeFile(__dirname + '/keys.json', JSON.stringify(keys), { encoding: 'utf-8' }, err => {
        if ( err) {
            throw err
        }
    })
