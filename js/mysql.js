// const mysql = require('mysql')
import mysql from 'mysql'

const conn = {  // mysql 접속 설정 - 회의실
  host: '180.68.206.218',
  port: '3306',
  user: 'root',
  password: '1qaz@WSX',
  database: 'dr_met'
};

const conn2 = {  // mysql 접속 설정 - 파트너포탈
    host: '192.168.0.204',
    port: '3306',
    user: 'root',
    password: '1qaz@WSX',
    database: 'dr_met'
  };
  
  


export default {

  gfn_query : function(sql_cmd){
    return new Promise(function(resolove, reject){

        let connection = mysql.createConnection(conn); // DB 커넥션 생성
        connection.connect();   // DB 접속
             
    
        connection.query(sql_cmd, function (err, results, fields) { 
          if (err) {
                //   console.log(err);
                reject(err)
          }
          //   console.log(results);
          resolove(results)
          connection.end(); // DB 접속 종료
        });
    })
  },

  gfn_query2 : function(sql_cmd){
    return new Promise(function(resolove, reject){

        let connection = mysql.createConnection(conn2); // DB 커넥션 생성
        connection.connect();   // DB 접속
             
    
        connection.query(sql_cmd, function (err, results, fields) { 
          if (err) {
                //   console.log(err);
                reject(err)
          }
          //   console.log(results);
          resolove(results)
          connection.end(); // DB 접속 종료
        });
    })
  },









  
  gfn_select_old : function(sql_cmd){
    let connection = mysql.createConnection(conn); // DB 커넥션 생성
    connection.connect();   // DB 접속

    connection.query(sql_cmd, function (err, results, fields) { 
      if (err) {
          console.log(err);
      }
      console.log(results);
    });
      
    connection.end(); // DB 접속 종료
  },
  

  
}




