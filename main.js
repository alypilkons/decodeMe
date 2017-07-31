#!/usr/bin/env node

'use strict';

require('colors');
const prompt = require('prompt');
const crypto = require('crypto');

prompt.message = '*******'.rainbow;

if (process.argv[2] === 'encode') {
  prompt.start();
  prompt.get([
    {
      description: 'Enter your message'.blue,
      name: 'message',
      required: true
    },
    {
      description: 'Enter your key'.blue,
      name: 'key',
      required: true,
      hidden: true,
      replace: '*'
    }
  ], function (err, result) {
    if (err) {
      console.log('ERROR - try again'.red);
    }
    const cipher = crypto.createCipher('aes192', result.key);
    let encrypted = '';
    cipher.on('readable', () => {
      const data = cipher.read();
      if (data) {
        encrypted += data.toString('hex');
      }
    });
    cipher.on('end', () => {
      console.log(encrypted);
    });
    cipher.write(result.message);
    cipher.end();
  });
};

if (process.argv[2] === "decode") {
  prompt.start();
  prompt.get([
    {
      description: 'Enter encrypted message'.blue,
      name: 'message',
      required: true
    },
    {
      description: 'Enter your key'.blue,
      name: 'key',
      required: true,
      hidden: true,
      replace: '*'
    }
  ], function (err, result) {
    if (err) {
      console.log('ERROR - try again'.red);
    }
    const decipher = crypto.createDecipher('aes192', result.key);
    let decrypted = '';
    decipher.on('readable', () => {
      const data = decipher.read();
      if (data) {
        decrypted += data.toString('utf8');
      }
    });
    decipher.on('end', () => {
      console.log(decrypted);
    });
    decipher.write(result.message, 'hex');
    decipher.end();
  });
};
