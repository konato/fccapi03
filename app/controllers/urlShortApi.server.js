'use strict';

var db = require('../db/database.js')
var urls = db.urls

function validUrl(url) {
  // rule 1: should begin with http:// or https://;
  // rule 2: then should contain at least one char followed by "." plus 2 or more char;
  var reg = /https?:\/\/\w+\.\w{2,}/
  var res = reg.exec(url)
  
  console.log(res)
  
  if (res){
    return true
  }else 
  {
    return false
  }
  
}




function UrlShortApi() {
   
   this.getCode = function (req, res) {
        console.log("getCode called")
        var url = req.params[0]
        var resJson = { "error" : "getCode url not valid. url: " + url};
        if (validUrl(url)){
            var docRedirect = { dest : url, 
				 counter: 0,
				 lastSeenAt : new Date()
               }
            urls.insert(docRedirect, function(err, doc){
            if (err) return res.json(400, err)
                return res.json(doc)
            })

        } else {
            res.status(500).json(resJson)
        }  
   }
   

   this.redirect2 = function (req, res) {
       var id = req.params.id
        console.log("redirect called " + id)

        urls.findOne( { _id: id }, 
                    function(err, url){
            if (err) return res.json(400, err)
                console.log("redirect to: " + url.dest)
                res.redirect(url.dest)
            })
      
   }
   
   this.redirect = function (req, res) {
       var id = req.params.id
        console.log("redirect called " + id)
        var date = new Date()
        urls.update( { _id: id }, 
                    {$inc: {"counter" : 1}, $set: {"lastSeenAt" : date }},
                    {multi: false, returnUpdatedDocs:true},
                    function(err, num,url){
            if (err) {
                console.log(err)
                return res.status(400).json({"error":"Db problem, try again later"})
            }
            console.log("Num of url updated: " + num );
            if (num === 0){
                console.log(err)
                return res.status(400).json({"error":"This is not a valid URL"}) 
            } 
                console.log("redirect to: " + url.dest)
                res.redirect(url.dest)
            })
      
   }
   
 
   
   this.getStats = function (req, res) {
        var id = req.params.id
        console.log("stats called for: " + id)

        urls.findOne( { _id: id }, 
                    function(err, url){
            if (err) {
                console.log(err)
                return res.status(400).json({"error":"This is not a valid URL"})
            }
            if (url) {
                console.log("Stats : " + url)
                res.status(200).json(url)
            } else {
                console.log("Stats id not present : " + url)
                res.status(400).json({"error":"This is not a valid URL"})
            }
            })   
       
   }

};

module.exports = UrlShortApi;
