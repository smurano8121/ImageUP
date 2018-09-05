const express  = require('express');
const app      = express();
const multer   = require('multer'); // multerをrequire
const fs       = require('fs');
const upload   = multer({dest: 'photo'}); // プロジェクトルートの'uploads'ディレクトリにファイルを受け取るようにしている
const hostname = '192.168.0.18';
const port = 3000;

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static('views'));

app.get('/', function(req, res) {
  res.render('ui.ejs', {title: 'File Uploading Test'});
  //res.render('style.css');
});

// コントローラの第2引数に受け取る画像（ファイル）データの設定を渡す。
// 具体的にはmulter().single(), multer().fields, multer.any() などの実行結果を渡す
// 今回は複数のファイルを受け取るため、multer().fields()を設定してみた
app.post('/photo', upload.fields([ {name: 'base_img', maxCount: 1} ]), function(req, res) {
  console.log(req.files); //
});

app.listen(port, () =>{
  console.log(`Server running at http://${hostname}:${port}/`);
});

// リクエストの処理
// function doRequest(req, res) {
//   switch(req.url) {
//   case '/':
//       fs.readFile('./views/ui.ejs', 'UTF-8',
//           function (err, data) {
//               res.writeHead(200, {'Content-Type': 'text/html'});
//               res.write(data);
//               res.end();
//           }
//       );
//       break;
//   case '/style.css':
//       fs.readFile('./views/style.css', 'UTF-8',
//           function (err, data) {
//               res.writeHead(200, {'Content-Type': 'text/css'});
//               res.write(data);
//               res.end();
//           }
//       );
//       break;
//   case '/material/doshisha.png':
//       fs.readFile('./views/material/doshisha.png', 'binary',
//           function (err, data) {
//               res.writeHead(200, {'Content-Type': 'image/png'});
//               res.write(data, 'binary');
//               res.end();
//           }
//       );
//       break;
//   case '/material/album.png':
//       fs.readFile('./views/material/album.png', 'binary',
//           function (err, data) {
//               res.writeHead(200, {'Content-Type': 'image/png'});
//               res.write(data, 'binary');
//               res.end();
//           }
//       );
//       break;
//   case '/material/takephoto.jpg':
//       fs.readFile('./views/material/takephoto.jpg', 'binary',
//           function (err, data) {
//               res.writeHead(200, {'Content-Type': 'image/jpg'});
//               res.write(data, 'binary');
//               res.end();
//           }
//       );
//       break;
//     }
// }
