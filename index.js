const bitcoin = require('bitcoinjs-lib');
const bigi = require('bigi');
const wif = require('wif');
const bip39 =  require('bip39');
const fs = require('fs')

if (process.argv.length < 3 || process.argv[2].indexOf('--keys=') === -1) {
    throw 'Missing the --keys parameter. i.e --keys=20'
}

const numberOfKeysToGenerate = process.argv[2].split('--keys=')[1];

function generate (phrase) {
    const hash = bitcoin.crypto.sha256(phrase);
    const d = bigi.fromBuffer(hash);
    const address = new bitcoin.ECPair(d).getAddress();
    const privateKey = wif.encode(128, hash, true);

    return { address, privateKey, phrase }
}

let keys = []

for (let i = 0; i < numberOfKeysToGenerate; i++) {
    const phrase = bip39.generateMnemonic()
    keys.push(generate(phrase))
}

fs.writeFile(__dirname + '/keys.json', JSON.stringify(keys), { encoding: 'utf-8' }, err => {
    if ( err) {
        throw err
    }
})