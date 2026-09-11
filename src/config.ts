const editorUrl = import.meta.env.VITE_EDITOR_URL ?? 'http://localhost:3000'
const loginUrl = import.meta.env.VITE_LOGIN_URL ?? 'http://localhost:3000/login'

export const site = {
  name: 'Getdraft',
  editorUrl,
  loginUrl,
}
