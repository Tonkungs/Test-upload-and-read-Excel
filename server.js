const express = require('express')
const fileUpload = require('express-fileupload');
const app = express()
const XLSX = require('xlsx');
app.use(fileUpload());
let data =''
app.get('/', function (req, res) {
//   res.send('Hello World!')
res.sendFile(__dirname+"/public/index.html")
})
app.get('/read', function (req, res) {
//   res.send('Hello World!')
  var workbook = XLSX.readFile(data);
  // console.log(workbook);
  res.json(workbook)
// res.sendFile(__dirname+"/public/index.html")
})

app.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
  let sampleFile = req.files.sampleFile;
  console.log('====================================');
  console.log(sampleFile.name);
  console.log(sampleFile.mimetype);
  console.log(sampleFile.data);
  console.log('====================================');
  data = './upload/'+sampleFile.name
  // Use the mv() method to place the file somewhere on your server 
  sampleFile.mv(data, function(err) {
    if (err)  
      return res.status(500).send(err);
    res.redirect('/read');
    // res.send('File uploaded!');
  });
});

// app.use(express.static('public'))
app.use('/static', express.static('public'))
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})