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
    // .then(res.redirect("http://localhost:3000"))
    .catch(next);
};

// export const loginDebug = ({user}, res, next) => { /** TODO: ask V to go through the code one more time **/
//   let token;
//   return sign(user.id) //strange user, maybe beter {bodymen: body}?? it works though...
//     // .then((token) => ({token, user: user.view(true)}))
//     // .then(success(res, 201))
//     // .catch(next)
//     .then((tokenValue) => {
//         token = tokenValue;
//         return User.update({_id: user.id}, {token})
//     })
//     .then(()=> ({token, user: user.view()}))
//     .then(success(res, 201))
//     .catch(next)
// }
