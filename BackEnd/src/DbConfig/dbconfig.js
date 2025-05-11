import{createConnection} from 'mysql2';


var conn=createConnection({
    host:"localhost",
    user:"root",
    password:"Pmane@89",
    database:"yoga",
    timezone:'local'
});
conn.connect((error)=>{
    if(error){
        console.log(error);
    }else{
            console.log("Db Connected !");
    }
});
export  function createDbConnection(){
    return conn;
}