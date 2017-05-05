const users = [{
  email: 'gal@hagever.com',
  password: '123456',
}, {
  email: 'omritzek@hagever.com',
  password: '654321'
}]

const userByEmail = email => users.find(x => x.email === email)

export const emailExists = email => Promise.resolve(Boolean(userByEmail(email)))
export const auth = (email, password) => Promise.resolve(userByEmail(email).password === password)
