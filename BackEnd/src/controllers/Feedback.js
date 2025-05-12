import { StatusCodes } from "http-status-codes";
import { createDbConnection } from "../DbConfig/dbconfig.js";

const conn = createDbConnection();


// add contactUs  details

   export function addFeedback(req,res){
   
       try {
           var data=req.body;
          
           const qry= `INSERT INTO feedback (name, email, phone, rating, suggestion) VALUES ('${data.name}', '${data.email}', '${data.phone}',${data.rating},'${data.suggestion}')`;
   
           conn.query(qry,(err,result)=>{
               if(err){
                   console.log({database_error: err});
                   res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:"Something went wrong !"});
   
               }else{
                   console.log({Query:result});
                   res.status(StatusCodes.CREATED).send({msg:"registered successfully"});
               }
           });
         
       } catch (error) {
           console.log({server_message:error})
       }
     
   
   
   }


   
// get contactUs  details

export function getFeedback(req,res){
   
    try {
       
       
        const qry= `select * from feedback`;

        conn.query(qry,(err,result)=>{
            if(err){
                console.log({database_error: err});
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:"Something went wrong !"});

            }else{
              
                if (result.length===0) {
                    res.status(StatusCodes.NO_CONTENT).send({ message: "Records are empty" });
                } else {
                    res.status(StatusCodes.OK).send(result);
                }
            
            }
        });
      
    } catch (error) {

        console.log({m:error});
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:"Something went wrong"});

    }
  


}
