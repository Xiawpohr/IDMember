export const fetchAll = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([{ name: 'Arthur' }, { name: 'Robert' }, { name: 'Charlie' }])
    }, 500)
  })
}
