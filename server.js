
// ---------------------------------------------fist step-------------------------------
var express=require("express");
let mysql2=require("mysql2");
var fileuploader=require("express-fileupload");
var cloudinary=require("cloudinary").v2;

// ----------------------------------------------second step-------------------------
let app= express();
app.listen(2024,function(req,resp)
{
    console.log("Your server started --🟢");
})



// ----------------------------------------------third step------------------------
// let config={
//     host:"127.0.0.1",
//     user:"root",
//     password:"root@123",
//     database:"project",
//     dateString:true
// }

let config="mysql://avnadmin:AVNS_YnfKiDWylMEQEAZ9SeS@mysql-1d96df28-jaswindersingh026860-b338.e.aivencloud.com:11589/defaultdb"

var mysql=mysql2.createConnection(config);
mysql.connect(function(err){
    if(err==null) 
    {
        console.log("connected to database successfully--🛢");
    }
    else
     console.log(err.message); 
}) 
  
 
 cloudinary.config({ 
    cloud_name: 'dorkb3maa', 
    api_key: '952954397334735', 
    api_secret:  'qG5pEULVKQnsNjco53JNwHhP4Uo' // Click 'View Credentials' below to copy your API secret
});



// ----------------------------------------------fourth step----------------------------------
app.use(express.static("public"));
app.use(express.urlencoded("true"));
app.use(fileuploader());



// ---------------------------------------------page loders-------------------------------------

app.get("/",function(req,resp){
    let path=__dirname+"/public/index.html";
    resp.sendFile(path);
})

app.get("/inf-desh",function(req,resp){
    let path=__dirname+"/public/inf-desh.html";
    resp.sendFile(path);
})

app.get("/inf-form",function(req,resp){
    let path=__dirname+"/public/inf-form.html";
    resp.sendFile(path);
})


app.get("/admin-dash",function(req,resp){
    let path=__dirname+"/public/admin-dash.html";
    resp.sendFile(path);
})

app.get("/admin-users",function(req,resp){
    let path=__dirname+"/public/admin-users.html";
    resp.sendFile(path);
})

app.get("/admin-influ",function(req,resp){
    let path=__dirname+"/public/admin-all-influ.html";
    resp.sendFile(path);
})

app.get("/admin-all-clients",function(req,resp){
    let path=__dirname+"/public/admin-all-clients.html";
    resp.sendFile(path);
})



app.get("/influ-finder",function(req,resp){
    let path=__dirname+"/public/influ-finder.html";
    resp.sendFile(path);
})

app.get("/client-desh",function(req,resp){
    let path=__dirname+"/public/client-desh.html";
    resp.sendFile(path);
})

app.get("/client-form",function(req,resp){
    let path=__dirname+"/public/client-form.html";
    resp.sendFile(path);
})


// -------------------------------------------------------------action area-------------------------------------------------------
//AJAX CAll response
// app.get("/check-user-existance",function(req,resp)
// {
//     let email= req.query.txtEmail;
    
    
//     mysql.query("select * from users where email=?",[email],function(err,resultJsonAry){
//         if(err!=null)
//             {
//                 resp.send(err.message);
//                 return;

//             }
//         if(resultJsonAry.length==0) 
//             resp.send("Yes!! Available :-)");
//         else
//             resp.send(":Sorrryy Alreadyy Taken... :-(");
//     })


// })







app.get("/signup-process",function(req,resp)                                                                           //singup
{
    console.log(req.query);
     

     
    let email=req.query.txtEmail;
    let pwd=req.query.pwd;
    let utype=req.query.combo;

    if(email && pwd && utype)
    {
        //  console.log("ok");
         mysql.query("insert into users values(?,?,?,1)",[email,pwd,utype,],function(err)
         
       {
        // console.log("ok1");
          if(err==null) 
           {
            // console.log("ok2");
            resp.send(" &nbsp; &nbsp; SignedUp Successfullyy")
          }
            else{
                  resp.send(err.message);
                //    console.log("ok3");
                                         }
        })
         
    }

    else
    {
        // console.log("ok4");
        resp.send(" fill all values");
    }

    // console.log("ok5");

       })
    

    


app.get("/login-process",function(req,resp)                                                                            //login
{
    //console.log("login-process"); 
    let emaill=req.query.txtEmaill;
    let txtPwd=req.query.txtPwd;

    mysql.query("select * from users where email=? and pwd=?",[emaill,txtPwd],function(err,result)
    {
        if(err!=null)
        {
            resp.send(err.message); return;
        }
        if(result.length==0)
        {
            resp.send("Invalid Id or Password");return;''
        }
        if(result[0].status==1)
        {
            resp.send(result[0].utype); return;
        }
        else{
            resp.send("U R Blocked!!!"); return;
        }

    })

})




                                                                                                                     
app.post("/isave",async function(req,resp){                                                                                  //influencer form data save

    // console.log(req.body);
    // resp.send(req.body);



    let fileName="";
    if(req.files!=null)
        {
             fileName=req.files.iprofilePic.name;
            let path=__dirname+"/public/uploads/"+fileName;
            // req.files.iprofilePic.mv(path);

           await cloudinary.uploader.upload(path)
            .then(function(result){
                fileName = result.url;

            })
        }
        else
        fileName="nopic.jpg";

    mysql.query("insert into influ values(?,?,?,?,?,?,?,?,?,?)",[req.body.iemail,req.body.iname,req.body.icontact,req.body.iaddress,req.body.istate,req.body.icity,req.body.izcode,fileName,req.body.iurl,req.body.icategory],function(err){

        if(err==null)
            resp.send("done .....");
        else
            resp.send(err.message);
    } )
}); 

                                                                                                                       
app.post("/csave", async function(req,resp){                                                                                     //client  form data save

    console.log(req.body);
    // resp.send(req.body);



    let fileName="";
    if(req.files!=null)
        {
             fileName=req.files.cprofilePic.name;
            let path=__dirname+"/public/uploads/"+fileName;
            // req.files.cprofilePic.mv(path);
            await cloudinary.uploader.upload(path)
            .then(function(result){
                fileName = result.url;

            })
        }
        else
        fileName="nopic.jpg";

    mysql.query("insert into client values(?,?,?,?,?,?,?,?,?)",[req.body.cemail,req.body.cname,req.body.ccontact,req.body.caddress,req.body.cstate,req.body.ccity,req.body.czcode,fileName,req.body.coccupation],function(err){

        if(err==null)
            resp.send("done .....");
        else
            resp.send(err.message);
    } )
}); 

// -------------------------------------------------------------------------------------
app.get("/search-iprofile", function (req, resp) {                                                                     //influcer  data  fetch for form
    var apemail = req.query.iemail;
    // console.log(apemail);

    mysql.query("select * from influ where iemail=?", [apemail], function (err, resultJsonAry) {
        // console.log(resultJsonAry)
        if (err != null)
        {
            resp.send(err.message);
               return;
        }       
    
            resp.json(resultJsonAry);
    })
}); 

// ------------------------------------------------------------------
app.post("/ipupdate", async function (req, resp) {                                                                          //influcer data update in form 
  
    let fileName="";
    if(req.files!=null)
        {
             fileName=req.files.iprofilePic.name;
            let path=__dirname+"/public/uploads/"+fileName;
            // req.files.iprofilePic.mv(path);
            await cloudinary.uploader.upload(path)
            .then(function(result){
                fileName = result.url;

            })
            console.log("pic update success....");
        }
        else
        {
            fileName=req.body.pphidn;
        }

// [req.body.iemail,req.body.iname,req.body.icontact,req.body.iaddress,req.body.istate,req.body.icity,req.body.izcode,fileName,req.body.iurl,req.body.icategory]
mysql.query("update influ set iname=?,icontact=?,iaddress=?,istate=?,icity=?,izcode=?,picpath=?,iurl=?,icategory=? where iemail=?",
    [req.body.iname,req.body.icontact,req.body.iaddress,req.body.istate,req.body.icity,req.body.izcode,fileName,req.body.iurl,req.body.icategory,req.body.iemail]
, function (err, result) {

        if (err != null) {
            resp.send(err.toString());
        }
        else if (result.affectedRows == 1) {
            console.log("Updated Successfully")
            resp.send("update Done");
        }
        else if (result.affectedRows == 0) {
            console.log("Invalid ID");
        }
        else {
            console.log(err.toString());
        }

    }); 
});

app.post("/cpupdate", async function (req, resp) {                                                                        //client data update throgh form

    let fileName="";
    if(req.files!=null)
        {
             fileName=req.files.cprofilePic.name;
            let path=__dirname+"/public/uploads/"+fileName;
            // req.files.cprofilePic.mv(path);
            await cloudinary.uploader.upload(path)
            .then(function(result){
                fileName = result.url;

            })
            console.log("pic update success....");
        }
        else
        {
            fileName=req.body.pphidn;
        }


mysql.query("update client set cname=?,ccontact=?,caddress=?,cstate=?,ccity=?,czcode=?,picpath=?,coccupation=? where cemail=?",
    [req.body.cname,req.body.ccontact,req.body.caddress,req.body.cstate,req.body.ccity,req.body.czcode,fileName,req.body.coccupation,req.body.cemail]
, function (err, result) {

        if (err != null) {
            resp.send(err.toString());
        }
        else if (result.affectedRows == 1) {
            console.log("Updated Successfully")
            resp.send("update Done");
        }
        else if (result.affectedRows == 0) {
            console.log("Invalid ID");
            return
        }
        else {
            console.log(err.toString());
        }

    });
});


app.get("/search-cprofile", function (req, resp) {                                                                 //client data serch for form
    var apemail = req.query.cemail;
    // console.log(apemail);

    mysql.query("select * from client where cemail=?", [apemail], function (err, resultJsonAry) {
        // console.log(resultJsonAry)
        if (err != null)
        {
            resp.send(err.message);
               return;
        }       
    
            resp.json(resultJsonAry);
    })
});


              
app.get("/booking-process",function(req,resp)                                                                  //influser shows booking
{
    // console.log(req.query);
    let rid=req.query.rid;
    let eemail=req.query.eemail;
    let etitle=req.query.etitle;
    let edate=req.query.edate;
    let etime=req.query.etime;
    let ecity=req.query.ecity;
    let evenue=req.query.evenue;
    
    mysql.query("insert into events values(?,?,?,?,?,?,?)",[rid,eemail,etitle,edate,etime,ecity,evenue],function(err)
    {
        if(err==null) 
        { 
            resp.send("booked Successfullyy")
        }
        else
            resp.send(err.message);
    })
})


                                                                                                          
app.get("/change-password", function (req, resp) {                                                           //Change password of influencer
    // console.log(req.query);
    var e = req.query.femail;
    var o = req.query.fopass;
    var n = req.query.fnpass;

    mysql.query("select * from users where email=? and pwd=?", [e, o], function (err, result) {
        if (err != null)
            resp.send(err.toString());

        else if (result.length == 1) {
            if (n) {
                if (result[0].utype == "Influencer") {
                    mysql.query("update users set pwd=? where email=?", [n, e], function (err, result) {
                        if (err != null)
                            resp.send(err.toString());
                        else
                            resp.send("Change Pasword success.....");
                    });
                }
                else {
                    resp.send("U R Not influencer");
                } 
            }
            else {
                resp.send("Fill new password")
            } 
        }
        else
            resp.send("Invalid (plz check email or old_password)");

    })



    
    
});

app.get("/change-password-c", function (req, resp) {                                                                     //Change password of client
    // console.log(req.query);
    var e = req.query.femail;
    var o = req.query.fopass;
    var n = req.query.fnpass;

    mysql.query("select * from users where email=? and pwd=?", [e, o], function (err, result) {
        if (err != null)
            resp.send(err.toString());

        else if (result.length == 1) {
            if (n) {
                if (result[0].utype == "Client") {
                    mysql.query("update users set pwd=? where email=?", [n, e], function (err, result) {
                        if (err != null)
                            resp.send(err.toString());
                        else
                            resp.send("Change Pasword success.....");
                    });
                }
                else {
                    resp.send("U R Not Client");
                } 
            }
            else {
                resp.send("Fill new password")
            } 
        }
        else
            resp.send("Invalid (plz check email or old_password)");

    })



    
    
});




app.get("/fetch-all",function(req,resp)                                                                                   //angular function api
{
    mysql.query("select * from users",function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       resp.send(resultJsonAry);//sending array of json object 0-1
    })

})


app.get("/del-one",function(req,resp)                                                                                   //delet one users

{

    console.log(req.query);
    mysql.query("delete from users where email=?",[req.query.email],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
            resp.send("Deleted");
       
    })

})

app.get("/del-one-1",function(req,resp)                                                                               //delet one event

{

    console.log(req.query);
    mysql.query("delete from events where rid=?",[req.query.rid],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
            resp.send("Deleted");
       
    })

})




// app.get("/block-one",function(req,resp)

// {

//     console.log(req.query);

// })




app.get("/block-user", function (req, resp) {                                                                          //Block user
    var blockemail = req.query.email;

    mysql.query("update users set status=0 where email=?", [blockemail], function (err, result) {
        if (err != null)
            resp.send(err.toString());
        else if (result.affectedRows == 1)
            resp.send("Status update success.....");
        else
            resp.send("Invalid ID");

    })
});
 

app.get("/resume-user", function (req, resp) {                                                                           //resume user
    var actemail = req.query.email;
        //  console.log(req.query);
    mysql.query("update users set status=1 where email=?", [actemail], function (err, result) {
        if (err != null)
            resp.send(err.toString());
        else if (result.affectedRows == 1)
            resp.send("Status update success.....");
        else
            resp.send("Invalid ID");
    })
});


app.get("/fetch-all-i",function(req,resp)                                                                             //fetch all influcer
{
    console.log("ok");
    mysql.query("select * from influ",function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;
 
            }
       resp.send(resultJsonAry);//sending array of json object 0-1
    })

})



app.get("/fetch-all-u",function(req,resp)                                                                             //fetch all clients
{
    console.log("ok");
    mysql.query("select * from client",function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;
 
            }
       resp.send(resultJsonAry);//sending array of json object 0-1
    })

})


app.get("/fetch-all-bookings",function(req,resp)                                                                    //fetch all bookings
{
    
      
    console.log("ok")
    
    console.log(req.query ); 
    mysql.query("select * from events where  eemail = ? ",[req.query.eemail],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       resp.send(resultJsonAry);//sending array of json object 0-1
    })

})
   
 
//--------------------------------------------------

app.get("/do-find",function(req,resp)                                                                                //filter city
{

    console.log("lol");
    console.log(req.query);

    mysql.query("select * from influ where  icity like ? ",[req.query.icity+"%"],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       resp.send(resultJsonAry);
    })

})


app.get("/findInflu",function(req,resp)                                                                           //filter category
{

    // console.log("ok2");
    // console.log(req.query);

    mysql.query("select * from influ where icategory=? ",[req.query.icategory],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       resp.send(resultJsonAry);
    })

}) 




app.get("/do-findbyname",function(req,resp)                                                                          //filter  name
{

    // console.log("wmk");
    console.log(req.query);

    mysql.query("select * from influ where iname like ?",["%"+req.query.iname+"%"],function(err,resultJsonAry){
        if(err!=null)
            { 
                resp.send(err.message);
                return;
 
            }
       resp.send(resultJsonAry);
    })

})

app.get("/search-iprofile", function (req, resp) {                                                                    //influcer data fetch
    var apemail = req.query.iemail;
    // console.log(apemail);

    mysql.query("select * from influ where iemail=?", [apemail], function (err, resultJsonAry) {
        // console.log(resultJsonAry)
        if (err != null)
        {
            resp.send(err.message);
               return;
        }       
    
            resp.json(resultJsonAry);
    })
});


//AJAX CAll response                                                                                              //ajax call for chack user existance
app.get("/check-user-existance",function(req,resp)
{
    let email= req.query.txtEmail;
    
   
    mysql.query("select * from users where email=?",[email],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
        if(resultJsonAry.length==0) 
            resp.send("Yes!! Available :-)");
        else
            resp.send(":Sorrryy Alreadyy Taken... :-(");
    })

})


