import { StatusCodes } from "http-status-codes";
import { createDbConnection } from "../DbConfig/dbconfig.js";


var conn=createDbConnection();


export function addUsers(req,res)    {

    try {
        var data=req.body;
        const qry= `INSERT INTO user (name, email, password, phone, address) VALUES ('${data.name}', '${data.email}', '${data.password}', ${data.phone}, '${data.address}')`;

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


export function getUsers(req,res){
    try {

        var qry=`select * from user`;
        conn.query(qry,(error,result)=>{
            if(error){
                console.log(error);
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:"Something went wrong"});
            }else{
                if(result.length===0){
                    res.status(StatusCodes.NO_CONTENT).send({message:`Records are empty`});
                   }else{
                    res.status(StatusCodes.OK).send(result);
                   }
            }
        })

    } catch (error) {
        console.log({m:error});
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:"Something went wrong"});
    }
}


export function getUserById(req,res){
    try {
        var id=req.params.id;

        var qry=`select * from user where user_id=${id}`;
        conn.query(qry,(error,result)=>{
            if(error){
                console.log(error);
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:"Something went wrong"});
            }else{
                if(result.length===0){
                    res.status(StatusCodes.NO_CONTENT).send({message:`Records are empty`});
                   }else{
                    res.status(StatusCodes.OK).send(result);
                   }
            }
        })

    } catch (error) {
        console.log({m:error});
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:"Something went wrong"});
    }
}

export function putUsers(req,res){

    const user_id=req.params.id;
    const name=req.body.name;
    const email=req.body.email;
    const phone=req.body.phone;
    const address=req.body.address;

    var qry=`update user set  name="${name}",email="${email}",phone="${phone}", address="${address}" where user_id=${user_id}`;

    conn.query(qry,(err,result)=>{
        if(err){
            console.log(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:"went wrong"});
        }else{
          if(res.affectedRows===0){
           res.status(StatusCodes.OK).send({msg:"Not Found"});
          }else{
            res.status(StatusCodes.OK).send({msg:"Row Updated"});
          }
        }
    })

}


export function deleteUsers(req,res){
    try {
        var id= req.params.id;
        var qry=`delete from user where id=${id}`;
        conn.query(qry,(error,result)=>{
            if(error){
                console.log({msg:error});
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:"Database Error"});
            }else{
                if(result.affectedRows===0){
                res.status(StatusCodes.OK).send({Message :"Not Found"});}
                else{
                    res.status(StatusCodes.OK).send({Message :"Deleted Successfuly"})
                }
            }
        })
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:"something went wrong"});
    }
}