import {sign} from '../../services/jwt';
import {success} from '../../services/response/';
import User from '../user/model';

export const login = ({user}, res, next) => {
  let token;
  return sign(user.id)
    .then((tokenValue) => {
      token = tokenValue;
      return User.update({_id: user.id}, {token});
    })
    .then(()=>({token, user: user}))
    .then(success(res, 201))
    .catch(next);
};
