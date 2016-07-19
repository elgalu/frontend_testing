#!/usr/bin/env bash

# Node version manager
export NVM_DIR="${HOME}/.nvm"
if [ "$(uname)" = 'Darwin' ]; then
  . "$(brew --prefix nvm)/nvm.sh"
else
  [ -s "${NVM_DIR}/nvm.sh" ]
  . "${NVM_DIR}/nvm.sh"
fi

sleep 1.5
cd diego_test
nvm use $(cat .nvmrc)
node --version
browser=chrome npm test
browser=chrome npm test
browser=chrome npm test
browser=chrome npm test
browser=chrome npm test
cd ..

sleep 999999
