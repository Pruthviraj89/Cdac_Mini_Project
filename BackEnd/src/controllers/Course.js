import { StatusCodes } from "http-status-codes";
import { createDbConnection } from "../DbConfig/dbconfig.js";


var conn=createDbConnection();


export function addCourse(req,res)    {

    try {
        var data=req.body;
        const qry= `INSERT INTO course (title, description, duration_weeks, level, price, teacher_name, teacher_phone, experience_year, specialization, location,schedule) VALUES ('${data.title}', '${data.description}', '${data.duration_weeks}', '${data.level}', '${data.price}', '${data.teacher_name}', '${data.teacher_phone}',${data.experience_year}, '${data.specialization}', '${data.location}', '${data.schedule}')`;

        conn.query(qry,(err,result)=>{
            if(err){
                console.log({database_error: err});
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:"Something went wrong !"});

            }else{
                console.log({Query:result});
                res.status(StatusCodes.CREATED).send(result[0]);
            }
        });
      
    } catch (error) {
        console.log({server_message:error})
    }
  


}


export function getCourse(req,res){
    try {

        var qry=`select * from course`;
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


export function getCourseBytitle(req,res){
    try {
        var title=req.params.title;

        var qry=`select * from course where title='${title}'`;
        conn.query(qry,(error,result)=>{
            if(error){
                console.log(error);
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:"Something went wrong"});
            }else{
                if(result.length===0){
                    res.status(StatusCodes.NO_CONTENT).send({message:`Records are empty`});
                   }else{
                    console.log(result);
                    res.status(StatusCodes.OK).send(result);
                   }
            }
        })

    } catch (error) {
        console.log({m:error});
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:"Something went wrong"});
    }
}


export function getCourseById(req,res){
    try {
        var id=req.params.id;

        var qry=`select * from course where course_id=${id}`;
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

export function putCourse(req,res){

    const course_id=req.params.course_id;
    const title=req.body.title;
    const description =req.body.description;
    const duration_weeks=req.body.duration_weeks;
    const level=req.body.level;
    const price=req.body.price;
    const teacher_name=req.body.teacher_name;
    const teacher_phone =req.body.teacher_phone;
    const experience_year =req.body.experience_year;
    const specialization =req.body.specialization;
    const location =req.body.location;
    const schedule =req.body.schedule;

    var qry=`UPDATE course
SET
  title = '${title}',
  description ='${description}' ,
  duration_weeks ='${duration_weeks}' ,
  level = '${level}',
  price = '${price}',
  teacher_name = '${teacher_name}',
  teacher_phone ='${teacher_phone}' ,
  experience_year = ${experience_year},
  specialization = '${specialization}',
  location = '${location}',
  schedule = '${schedule}'
WHERE course_id = ${course_id}`;

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


export function deleteCourse(req,res){
    try {
        var course_id= req.params.course_id;
        var qry=`delete from course where course_id=${course_id}`;
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