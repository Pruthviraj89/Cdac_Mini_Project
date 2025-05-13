import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';


export function verifyToken(req,res,next){
    const authHeader=req.get('Authorization');
   
    if(authHeader){
        const token= authHeader.split(' ')[1];
        jwt.verify(token,"hello123",(error,payload)=>{
            if(error){
                res.status(StatusCodes.UNAUTHORIZED).send({msg:"Unathorized Access"});
            }else{
                next();
            }
        })

        next();
    }else{
        res.status(StatusCodes.UNAUTHORIZED).send({msg:"Unathorized Access"});
    }
}