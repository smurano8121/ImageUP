const express  = require('express');
const app      = express();
const multer   = require('multer'); // multerをrequire
const fs       = require('fs');
const hostname = '192.168.0.18';
const port = 3000;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 保存したいパス
    cb(null, 'C:/Users/smura/develop/Nodejs/img_up_smurano/photo')
  }
  ,
  filename: function (req, file, cb) {
    // アップロードしたときのファイル名で保存
    cb(null, file.originalname)
  }
});
const upload = multer({ storage: storage }); // プロジェクトルートの'photo'ディレクトリにファイルを受け取るようにしている

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
//views内のファイルを使用可能にしている
app.use(express.static('views'));

app.get('/', function(req, res) {
  res.render('ui.ejs', {title: 'File Uploading Test'});
  //res.render('style.css');
});

app.listen(port, () =>{
  console.log(`Server running at http://${hostname}:${port}/`);
});

// コントローラの第2引数に受け取る画像（ファイル）データの設定を渡す。
// 具体的にはmulter().single(), multer().fields, multer.any() などの実行結果を渡す
// 今回は複数のファイルを受け取るため、multer().fields()を設定してみた
app.post('/photo', upload.fields([ {name: 'base_img', maxCount: 1} ]), function(req, res) {
  // POSTされた画像の情報をJSONで取得
  const req_file_json = JSON.stringify(req.files);
  console.log(req.files); //
  res.json({'result': 'success!'});
});
