## backend project
npm i -D nodemon use for node modulus download (if u save the code it direct run the server)
 "dev": "nodemon src/index.js" it add in package.json for run
if u want to create file cd path then touch file_name file_name 
controllers--all functions we do
db--database connection
middlewares--like cookies customer are valid to share data it verify
models--data models create
routes--path
utils--same function use repeatedly then store in utils
(all these folder create in src by mkdir folder_name )(all folder separately)
npm i -D prettier (use for  remove conflict when team work tabwidth ,space check)(-D use for devlopment dependency)(.prettierrc)file create by your own 

mongodb connection
npm i mongoose express dotenv

//api calling process ,api comes from json(limit gives),url 
npm i cookie-parser cors (cookie-parser -->middleware type && cors-->kisko data dena he like origin written here)

//npm i mongoose-aggregate-paginate-v2(use as plug in)(videomodel)
//npm i bcrypt jsonwebtoken(bcrypt -->used as passward hash (encrypted decrypted password convertion))
(jsonwebtoken --->password inside token present 64 bit add extra like ,import jwt(usermodel))

//file upload
express-fileupload,multer(data first store in localserver),cloudinary(then store in cloud server) (npm i cloudinary)(npm i multer)
1.server.2.local.3.cloud after complete all setps remove from server