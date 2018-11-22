import faker from 'faker'
import { currentUserAccount, otherUserAccounts } from './accounts.js'

export const currentUser = {
  id: 1,
  account: currentUserAccount,
  firstName: 'Arthur',
  lastName: 'Hsiao',
  email: 'test@example.com',
  phone: '1234567890',
  bio: 'This is biography.',
  gender: 'male',
  birthday: '1993/06/23'
}

export const modifiedUser = {
  id: 1,
  account: currentUserAccount,
  firstName: 'Arthur',
  lastName: 'Hsiao',
  email: 'test12@example.com',
  phone: '0987654321',
  bio: 'This is biography. Hey!!',
  gender: 'male',
  birthday: '1993/06/23'
}

export const users = Array(10)
  .fill({})
  .map((user, index) => {
    const date = faker.date.past()
    return {
      id: faker.random.uuid(),
      account: otherUserAccounts[index],
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber('####-###-###'),
      bio: faker.lorem.paragraph(2),
      gender: faker.random.boolean() ? 'male' : 'female',
      birthday: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    }
  })
