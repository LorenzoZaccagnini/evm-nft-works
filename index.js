var http = require("http"); //create a server object:
const https = require('https');
http
  .createServer(function (req, res) {
    // http headervar url = req.url;
    url = req.url;
    if (url === "/nft/mars/1") {
      getSole(res);
    } else {
      res.write("<h1>Hello World!<h1>"); //write a response
      res.end(); //end the response
    }
  })
  .listen(3000, function () {
    console.log("server start at port 3000"); //the server object listens on port 3000
  });


  const getSole = async (rs) => {
    https
    .get("https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json", (res) => {
      let data = [];
      const headerDate =
        res.headers && res.headers.date
          ? res.headers.date
          : "no response date";
      console.log("Status Code:", res.statusCode);
      console.log("Date in Response header:", headerDate);

      res.on("data", (chunk) => {
        data.push(chunk);
      });

      res.on("end", () => {
        console.log("Response ended: ");
        const resData = JSON.parse(Buffer.concat(data).toString());
        console.log("last sole: ", resData.soles[0]);
        const lastSole = resData.soles[0];
        rs.statusCode = 200;

        const osmJson = {
          "description": "News from mars", 
          "image": "https://github.com/LorenzoZaccagnini/evm-nft-works/blob/main/data/rover.png?raw=true", 
          "name": "Tokenosity",
          "attributes": [
            {
              "trait_type": "Min Temp", 
              "value": resData.soles[0].min_temp
            }, 
            {
              "trait_type": "Max Temp", 
              "value": resData.soles[0].max_temp
            }, 
            {
              "trait_type": "Pressure", 
              "value": resData.soles[0].pressure
            }, 
            {
              "trait_type": "Pressure String", 
              "value": resData.soles[0].pressure_string
            }, 
            {
              "trait_type": "Atmospheric Opacity", 
              "value": resData.soles[0].atmo_opacity
            }
          ]
        }
        rs.setHeader("Content-Type", "application/json");
        rs.end(JSON.stringify({ osmJson }));
      });
    })
    .on("error", (err) => {
      console.log("Error: ", err.message);
    });
  }