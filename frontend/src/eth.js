import Web3 from 'web3'

let web3

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider)
} else {
  const INFURA_PROJECT_ID = 'c6f97e7955574530bb47583ec32d5b3f'
  const provider = new Web3.providers.HttpProvider(
    `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`
  )
  web3 = new Web3(provider)
}

export const getBalance = async account => {
  const balance = await web3.eth.getBalance(account)
  return Math.round(web3.utils.fromWei(balance, 'ether') * 100) / 100
}
