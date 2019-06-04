import { UserModel } from '../interfaces/userModel';

<<<<<<< HEAD
const initialState: userModel = {
=======
const initialState: UserModel = {
>>>>>>> d2b7aeef7e4557e08ed3256ceed745283b588bfa
  imgUrl: '',
  email: '',
  name: '',
  token: ''
}

export function userReducer(
  state = initialState,
  action: any
): UserModel {

  // TODO Fill in once we figure out how we're doing
  // authentication
  // We might want to use Passport.js
  return initialState;
}
