import { Request, ResponseToolkit } from '@hapi/hapi';
import { compare, hash, genSalt } from 'bcrypt';
import jwt  from 'jsonwebtoken';


export const validateJWT = async (request: Request, _h: ResponseToolkit) => {
    var user = null
    user = jwt.verify(request.headers.accessToken, 'TOP_SECRET');
    if (!user){
       // user?['token'] =  null;
        return { isValid: false };
    } else {
        return { isValid: true, credentials: request.headers.accessToken  };;
    }
    
};

// export const validateBasic = async (request: Request, _h: ResponseToolkit) => {
//     const user = await UserModel.findOne(request.params.email);
//     if (!user){
//        // user?['token'] =  null;
//         return { isValid: false };
//     } else {
//         return { isValid: true, credentials: { user } };;
//     }
// };