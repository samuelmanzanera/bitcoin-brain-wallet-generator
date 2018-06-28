# bitcoin-brain-wallet-generator

This script enable the creation of multi bitcoin brain address using generated passphrases.

## Use

```js
// Install the dependencies
npm install

//Will create 10 addresses
node index --keys=10 --mode=seed
```

Otherwise, I packaged it as .exe for windows using nexe.
So it's possible to use directly on the bash
```sh
bitcoin-brain-wallet-generator.exe --keys=10
```

## Options

Command parameters available

| Name | Description |Value |
|----|---|---|
| keys | Number of keys or address to generate|Numeric value |
| mode | Passphrase generation mode| seed,password,password-phrase |
 
##  Licence

MIT
