const https = require("https");

const url = "https://codequiz.azurewebsites.net/";
const params = process.argv[2]

https
  .get(url,{
    headers: {'Cookie': 'hasCookie=true'}
  }, (res) => {
    data = "";
    res.setEncoding('utf8');
    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      const posOfParams = data.indexOf(params)
      if(posOfParams === -1) {
        console.log('no info')
        return
      }
      const subStringData = data.substring(posOfParams)
      const dataArray = subStringData.split('</td><td>')
      console.log(dataArray[1])
    });
  })
  .on("error", function (error) {
    console.log("error");
  });
