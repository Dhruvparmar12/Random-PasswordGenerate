const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    generator = require('generate-password'),
    cors = require('cors');
const uname = require('username');
const random_name = require('node-random-name');

app.use(cors());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Use generate-password Library
const password = generator.generateMultiple(3, {
    length: 10,
    numbers: false,
    excludeSimilarCharacters: false,
    exclude: 'Dhruv',
    uppercase: false,

});


//Create a custome Genrate Method
const chars = "01234!@#$";
const string_length = 3;
var randomstring = '';
for (var i = 0; i < string_length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
}

const char = "56789!@#$";
const string_length1 = 2;
var randomstring1 = '';
for (var i = 0; i < string_length1; i++) {
    var rnum = Math.floor(Math.random() * char.length);
    randomstring1 += char.substring(rnum, rnum + 1);
}
const username = 'Dhruv';
const passName = username.substring(0, 3);

var temp = passName + randomstring + randomstring1;
const len = temp.length

if (8 > len) {
    const char = "56789";
    const string_length3 = 8 - len;
    var randomstring3 = '';
    for (var i = 0; i < string_length3; i++) {
        var rnum = Math.floor(Math.random() * char.length);
        randomstring3 += char.substring(rnum, rnum + 1);
        }
    temp = temp + randomstring3;
}

//Finshed Custome generate method

console.log('PassWord Pattern', temp);
console.log(uname.sync());
console.log('Random Name:', random_name());

const auth=async (req,res,next)=>{
    const name=await uname.sync();
    req.name=name;
    next();
}

app.get('/',auth,(req, res) => {

    console.log('API LOGGER',req.name)
    res.render('index', { pass: temp });
});

app.listen(3000, () => {
    console.log('server Connected ::: PORT 3000');

})