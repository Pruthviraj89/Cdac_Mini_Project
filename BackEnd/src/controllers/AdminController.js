import { hashSync } from "bcrypt";
import StatusCodes from 'http-status-codes';
import { createDbConnection } from "../config/DbConfig.js";
import jwt from 'jsonwebtoken';


 const conn=createDbConnection();

export function registerAdmin(req,res){

    try {
        var data=req.body;
        var encryptedpass=hashSync(data.password,10);
        data.password="";
        const qry= `insert into admin values(${data.id},'${data.name}','${data.username}','${encryptedpass}')`;

        conn.query(qry,(err,result)=>{
            if(err){
                console.log({database_error: err});
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:"Something went wrong !"});

            }else{
                console.log({Query:result});
                res.status(StatusCodes.OK).send(result[0]);
            }
        });
      
    } catch (error) {
        console.log({server_message:error})
    }

}

export function adminLogin(req,res){
    try {
        const requestData= req.body;
        const qry=`select * from admin where username='${requestData.username}'`;
        conn.query(qry,(error,result)=>{
            if(error){
                console.log(error);
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:"Something went wrong"});
            }else{
                if(result.length==0){
                    res.status(StatusCodes.BAD_REQUEST).send({message:"USername or password is Invalid"});
                }else{
                    if(compareSync(requestData.password,result[0].password)){
                        const token=jwt.sign({adminId: result[0].id},"hello123");
                        requestData.password="";
                        res.status(StatusCodes.OK).send({message:"Login Successful",token});
                    }else{
                        res.status(StatusCodes.BAD_REQUEST).send({message:"USername or password is Invalid"});
                    }
                }
            }
        })

    } catch (error) {
        console.log({m:error});
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:"Something went wrong"});
    }
}