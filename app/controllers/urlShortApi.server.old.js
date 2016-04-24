'use strict';

var store = require('../db/database.js');

function validUrl(url) {
  // rule 1: should begin with http:// or https://;
  // rule 2: then should contain at least one char followed by "." plus 2 or more char;
  var reg = /https?:\/\/\w+\.\w{2,}/;
  var res = reg.exec(url);
  
  console.log(res);
  
  if (res){
    return true;
  }else 
  {
    return false;
  }
  
}




function UrlShortApi() {
   
   this.getCode = function (req, res) {
        console.log("getCode called");
        var url = req.params[0];
        var resJson = { "error" : "getCode url not valid. url: " + url};
        if (validUrl(url)){
            store.addUrl(url, function (err, resJson){
                if (err){
                    res.status(500).send({ error: 'Something failed!' });
                }
                console.log(resJson);
                res.status(200).json(resJson);    
            });
        } else {
            res.status(500).json(resJson);
        }  

   }
   

   
   this.redirect = function (req, res) {
       var id = req.params.id;
        console.log("redirect called " + id);
        
        var url = store.getUrlRedirec(id);
        console.log("Retour de la bd:" + url);

        if (url.original_url){
            res.status(200).redirect(url);
        } else {
            res.redirect('/');
        }
   }
   
   this.getStats = function (req, res) {
        console.log("getStats called");
        var resJson = { "error" : "statistics not implemented yet." };

        res.json(resJson);
   }

};

module.exports = UrlShortApi;
