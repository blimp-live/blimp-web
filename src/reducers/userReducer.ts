import { UserModel } from '../interfaces/userModel';

const initialState: userModel = {
  imgUrl: '',
  email: '',
  name: '',
  token: ''
}

export function userReducer(
  state = initialState,
  action: any
): userModel {
  // TODO Fill in once we figure out how we're doing
  // authentication
  // We might want to use Passport.js
}
