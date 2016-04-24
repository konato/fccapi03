#Konato FreeCodeCamp URL Shortenr Microservice
Should replicate the following URL Shortenr microservice https://little-url.herokuapp.com/

##User stories:
 I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.

 If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.

 When I visit that shortened URL, it will redirect me to my original link.
 
 *Bonus* I've added a stats capability. It return the number of time the url has been redirected and the last time.
 *Bonus* Shortened links are save in a database and it's id is unique to you.
 
##Example usage:
https://freecodecampapi03-stephaner.c9users.io/new/https://www.adiaccelerator.com
https://freecodecampapi03-stephaner.c9users.io/UURbDCiAh7oNLi7i
https://freecodecampapi03-stephaner.c9users.io/stats/UURbDCiAh7oNLi7i


##Example outputs:
{"dest":"http://www.picglu.com","counter":4,"lastSeenAt":"2016-04-23T11:27:30.847Z","_id":"UURbDCiAh7oNLi7i"}
{"error":"This is not a valid URL"}