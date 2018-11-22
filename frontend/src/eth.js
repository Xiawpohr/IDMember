import Web3 from 'web3'

let web3

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider)
} else {
  // const INFURA_PROJECT_ID = 'c6f97e7955574530bb47583ec32d5b3f'
  // const INFURA_HTTP_PROVIDER = `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}`
  const provider = new Web3.providers.HttpProvider('http://localhost:7545')
  web3 = new Web3(provider)
}

export const getBalance = async account => {
  const balance = await web3.eth.getBalance(account)
  return Math.round(web3.utils.fromWei(balance, 'ether') * 100) / 100
}

export const sendCoin = async (from, to, ether) => {
  // await web3.eth.personal.unlockAccount(from, privateKey, 600)
  const value = web3.utils.toWei(ether, 'ether')
  return web3.eth.sendTransaction({ from, to, value })
}
