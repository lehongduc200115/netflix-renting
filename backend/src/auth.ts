import { Request, ResponseToolkit } from '@hapi/hapi';
import { compare, hash, genSalt } from 'bcrypt';
import jwt  from 'jsonwebtoken';


export const validateJWT = async (request: Request, _h: ResponseToolkit) => {
    try {
        jwt.verify(request.headers.accessToken, 'TOP_SECRET');
        return { isValid: true};
    }
    catch {

        return { isValid: false };

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