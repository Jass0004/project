// ================= SEED FILE (FULL DATA) =================

const mysql = require("mysql2");

// DB config (same as your server)
let config = "mysql://avnadmin:AVNS_YnfKiDWylMEQEAZ9SeS@mysql-1d96df28-jaswindersingh026860-b338.e.aivencloud.com:11589/defaultdb";

let db = mysql.createConnection(config);

// connect DB
db.connect(function(err){
    if(err){
        console.log("❌ DB Connection Error:", err.message);
        return;
    }

    console.log("✅ Connected to DB");

    seedAll();
});

// ================= MAIN FUNCTION =================
function seedAll(){
    deleteOldData(() => {
        insertUsers(() => {
            insertInfluencers(() => {
                insertClients(() => {
                    insertEvents(() => {
                        console.log("🎉 ALL DUMMY DATA INSERTED");
                        db.end();
                    });
                });
            });
        });
    });
}


// ================= DELETE OLD DATA =================
function deleteOldData(callback){

    let queries = [
        "DELETE FROM events",
        "DELETE FROM influ",
        "DELETE FROM client",
        "DELETE FROM users"
    ];

    let i = 0;

    function run(){
        if(i < queries.length){
            db.query(queries[i], function(err){
                if(err){
                    console.log("❌ Delete Error:", err.message);
                } else {
                    console.log("🧹 Cleared:", queries[i]);
                }
                i++;
                run();
            });
        } else {
            callback();
        }
    }

    run();
}


// ================= USERS =================
function insertUsers(callback){

    let users = [
        ["admin@gmail.com", "123", "admin", 1],
        ["influ1@gmail.com", "123", "Influencer", 1],
        ["influ2@gmail.com", "123", "Influencer", 1],
        ["client1@gmail.com", "123", "Client", 1],
        ["client2@gmail.com", "123", "Client", 1]
    ];

    let query = "INSERT INTO users VALUES ?";

    db.query(query, [users], function(err){
        if(err){
            console.log("❌ Users Insert Error:", err.message);
        } else {
            console.log("✅ Users Inserted");
        }
        callback();
    });
}


// ================= INFLUENCERS =================
function insertInfluencers(callback){

    let influ = [
        ["influ1@gmail.com", "Rahul Sharma", "9876543210", "Delhi Street 1", "Delhi", "Delhi", "110001", "logo.jpg", "instagram.com/rahul", "Fashion"],
        ["influ2@gmail.com", "Simran Kaur", "9876543211", "Chandigarh Sec 22", "Punjab", "Chandigarh", "160022", "logo.jpg", "youtube.com/simran", "Tech"]
    ];

    let query = "INSERT INTO influ VALUES ?";

    db.query(query, [influ], function(err){
        if(err){
            console.log("❌ Influ Insert Error:", err.message);
        } else {
            console.log("✅ Influencers Inserted");
        }
        callback();
    });
}


// ================= CLIENTS =================
function insertClients(callback){

    let clients = [
        ["client1@gmail.com", "Aman Verma", "9999999991", "Mumbai Road", "Maharashtra", "Mumbai", "400001", "nopic.jpg", "Business"],
        ["client2@gmail.com", "Pooja Singh", "9999999992", "Jaipur City", "Rajasthan", "Jaipur", "302001", "nopic.jpg", "Startup"]
    ];

    let query = "INSERT INTO client VALUES ?";

    db.query(query, [clients], function(err){
        if(err){
            console.log("❌ Client Insert Error:", err.message);
        } else {
            console.log("✅ Clients Inserted");
        }
        callback();
    });
}


// ================= EVENTS =================
function insertEvents(callback){

    let events = [
        [1, "influ1@gmail.com", "Instagram Marketing Workshop", "2026-05-10", "10:00:00", "Delhi", "Hotel Taj"],
        [2, "influ2@gmail.com", "YouTube Growth Seminar", "2026-05-15", "14:00:00", "Mumbai", "JW Marriott"],
        [3, "influ1@gmail.com", "Brand Meetup", "2026-05-20", "11:30:00", "Chandigarh", "Hyatt"],
        [4, "influ2@gmail.com", "Social Media Bootcamp", "2026-06-01", "09:00:00", "Bangalore", "Tech Park"],
        [5, "influ1@gmail.com", "Networking Event", "2026-06-10", "17:00:00", "Jaipur", "City Palace"]
    ];

    let query = "INSERT INTO events VALUES ?";

    db.query(query, [events], function(err){
        if(err){
            console.log("❌ Events Insert Error:", err.message);
        } else {
            console.log("✅ Events Inserted");
        }
        callback();
    });
}