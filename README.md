Türkçe açıklama aşağıdadır!

## The Setup 

### Firebase Setup
First, you need to go to the [Firebase Console](https://console.firebase.google.com/) and create a new project. With done that, you should go to the project settings from top-left. You can manually enter this link by changing PROJECT_NAME section with your project name: 
[https://console.firebase.google.com/project/PROJECT_NAME/settings/general](https://console.firebase.google.com/project/PROJECT_NAME/settings/general ) . You will find the project's special key from the service account section. This needs to be downloaded and to be kept private as all firebase transactions are being done with this file ( database, storage, auth ). We are done with firebase for now. Let's start with the Node.JS!



### Server Setup
We will start by creating a new folder named ' sampleapp ' and run ``` $ npm init -y ```
(-y is providing all settings default ) to create a **package.json** file. We can install our dependencies now. We will use **express** for the server. Run ``` $ npm install express ``` to download **express**.  After that you should create an **index.js** file which looks similar to this: 
```sh 
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Listening 5000'));
```



### Connect server and firebase
We need to install dependencies first.  
```sh
$ npm install firebase
$ npm install firebase-admin
```



Now we can connect to the firebase.To do that, we need to create **fbConfig.js** file . It needs to look similar to this: 
```sh 
require("firebase/auth");
const firebase = require('firebase')
const admin = require('firebase-admin')
const serviceAccount = require('./YOUR_PROJECT_SPECIAL_KEY.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://FIREBASE_PROJECT_NAME.firebaseio.com"
});

module.exports = { firebase, admin };
```


Our app is ready to be used! Next section we will cover Token Authentication by using firebase! 


Source Code: [Firebase Node.js Auth](https://github.com/suleymanekmekci/firebase_nodejs_auth )


## Kurulum


### Firebase Kurulumu
Öncelikle  [Firebase Console](https://console.firebase.google.com/) linkine gitmeli ve yeni bir proje oluşturmalısınız. Bunu yaptıktan sonra sol üst köşeden proje ayarlarına girmeniz gerekiyor. Proje ayarlarına manuel olarak yandaki linki PROJECT_NAME kısmını kendi projenizin ismiyle değiştirerek girebilirsiniz.: 
[https://console.firebase.google.com/project/PROJECT_NAME/settings/general](https://console.firebase.google.com/project/PROJECT_NAME/settings/general ) .Projenin özel anahtarını hizmet hesapları kısmından bulacaksınız. Bu dosya indirilmeli ve kesinlikle gizli tutulmalıdır çünkü tüm firebase işlemleri ( veritabanı, depolama, oturum yönetimi) bu dosya ile yapılmaktadır. Şimdilik firebase ile işimiz bitti. Node.JS kısmına geçebiliriz !



### Sunucu Kurulumu
Sunucu kurulumuna ' sampleapp' isimli dosya oluşturup, **package.json** isimli dosyayı oluşturmak için ``` $ npm init -y ``` (-y tüm özellikleri varsayılan şekilde oluşturulmasına yardımcı oluyor ) komutunu çalıştırarak başlayacağız. Şimdi ise gerekli paketleri indirebiliriz.  Sunucu için  **express** paketini kullanacağız. **express** sunucusunu indirmek için ``` $ npm install express ``` komutunu çalıştırın.  Sonrasında **index.js** isimli dosyayı oluşturmanız gerekiyor. İçeriği aşağıdaki gibi olmalıdır. 
```sh 
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Listening 5000'));
```



### Sunucu ile firebase'i bağlamak
Öncelikle gerekli paketleri indirelim.
```sh
$ npm install firebase
$ npm install firebase-admin
```

Şimdi firebase'e bağlanabiliriz .Bunu yapmak için  **fbConfig.js** isimli bir dosya oluşturmamız gerekiyor. İçeriği aşağıdaki gibi olmalıdır: 
```sh 
require("firebase/auth");
const firebase = require('firebase')
const admin = require('firebase-admin')
const serviceAccount = require('./YOUR_PROJECT_SPECIAL_KEY.json');


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://FIREBASE_PROJECT_NAME.firebaseio.com"
});

module.exports = { firebase, admin };
```



Uygulamamız kullanıma hazır! Bir sonraki kısımda firebase kullanarak token ( jeton ) ile oturum yönetimini ele alacağız


Source Code: [Firebase Node.js Auth](https://github.com/suleymanekmekci/firebase_nodejs_auth )


# Verify Clients Firebase Token at Node.js Server & Firebase İstemciden Gelen Tokeni Node.js Sunucusunda Doğrulama




Türkçe açıklama aşağıdadır!

Once we have done the [setup](http://suleymanekmekci-blog.herokuapp.com/articles/nodejs-firebase-authentication-using-firebase-auth-with-a-custom-nodejs-server-and-nodejs-firebase-oturum-yonetimi-firebase-ile-nodejs-sunucusu-kullanarak-oturum-yonetimi-), we can verify ID token which comes from the client-side of the project.  We will write a function for verifying and use the verifying function as middleware function so that our code will look clean and open to change easily.  

We can receive the user's firebase uid by verifying the token. After receiving this, we can access the informations of the user. Our program will only return the user's email and displayName by using admin.auth function which comes from firebase. 

##Verify function
We will create a file named as **verifyToken.js** inside the application folder ( if not exists, create ). This will be exported and used by endpoints in order to verify the user / verify id token.The file should look like this. **Client should send the token from headers when it sends request!**
```javascript
const { admin } = require('../fbConfig');

module.exports = async function (req, res, next) {
    let idToken = req.headers.authorization
    if (!idToken) return res.status(401).send('Access Denied');
    // check token, if doesn't exist, return access denied.
    try {
        idToken = idToken.replace("Bearer ", "")

        admin.auth().verifyIdToken(idToken)
            .then(function (decodedToken) {
                // if token matches, returns uid of the owner of token
                let uid = decodedToken.uid;
                req.uid = uid
                next();

            }).catch(function (error) {
                res.status(400).send('An error occured' + error.message)
            });
    } catch (err) {
        console.log(err.message)
        res.status(400).send('Invalid Token ' + err)
    }
}
```

Our program will decode the token and set the req.uid as the current uid. Since this function will be used as middleware, we should add **next()** to the file so that when the middleware is executed and finished, it can be returned to the current function after the function is done.

We will add a custom endpoint to our API to test the function. By adding that, **index.js** should look like this:
```javascript

const express = require('express');
const app = express();
const { admin } = require('./fbConfig');
const verify = require('./application/verifyToken');

app.get('/secretPage', verify, async (req, res) => {

    const uid = await req.uid;
    admin.auth().getUser(uid)
        .then(function (userRecord) {

            res.status(200).send("email: " + userRecord.email + "\nname: " + userRecord.displayName)
        })
        .catch(function (error) {
            console.log('Error fetching user data:', error);
        });

});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Listening 5000'));
```
We are accessing the verify function by requiring it like this : ```const verify = require('./application/verifyToken');```. We can set our route as **secretPage**. In this case, the complete URL will be **http://localhost:5000/secretPage** . Once a request is sent to this endpoint, it will call **verify** function and decode the token which is sent from client-side. With done that, we will be available to access the uid. We can get user information by using the **admin.auth().getUser()** function. It takes uid as an argument. If the token is valid, the program sends email and displayName as a response. 

That's all with verifying tokens. You can access the source code by clicking [here](https://github.com/suleymanekmekci/firebase_nodejs_auth)

[Kurulum](http://suleymanekmekci-blog.herokuapp.com/articles/nodejs-firebase-authentication-using-firebase-auth-with-a-custom-nodejs-server-and-nodejs-firebase-oturum-yonetimi-firebase-ile-nodejs-sunucusu-kullanarak-oturum-yonetimi-) tamamlandıktan sonra, istemci (client) tarafından gelen ID tokeni doğrulayabiliriz. Doğrulama için fonksiyon yazacağız ve bu fonksiyonu middleware ( ara katman ) fonksiyon olarak kullanacağız böylece kodumuz daha temiz gözükecek ve endpoint'lere eklenmesi rahat olacak.

Kullanıcının uid'sini, tokeni doğrulayarak elde edebiliriz. Tokeni aldıktan sonra kullanıcının bilgilerine direkt olarak erişebiliyoruz. Programımız ise firebaseden gelen admin.auth fonksiyonunu kullanarak sadece kullanıcının emailini ve displayName özelliğini döndürecek.

## Verify (doğrulama) fonksiyonu
Application dosyasının içerisinde (yoksa kurmanız gerekecek) **verifyToken.js** isimli bir dosya kuracağız. Bu dosya endpoint tarafından, kullanıcıyı / id tokeni doğrulamak için kullanılacak. Dosya şu şekilde gözükmelidir: **İstemci endpointe istek atarken tokeni headers kısmında yollamalıdır**

```javascript
const { admin } = require('../fbConfig');

module.exports = async function (req, res, next) {
    let idToken = req.headers.authorization
    if (!idToken) return res.status(401).send('Access Denied');
    // check token, if doesn't exist, return access denied.
    try {
        idToken = idToken.replace("Bearer ", "")

        admin.auth().verifyIdToken(idToken)
            .then(function (decodedToken) {
                // if token matches, returns uid of the owner of token
                let uid = decodedToken.uid;
                req.uid = uid
                next();

            }).catch(function (error) {
                res.status(400).send('An error occured' + error.message)
            });
    } catch (err) {
        console.log(err.message)
        res.status(400).send('Invalid Token ' + err)
    }
}
```

Programımız token'i çözecek (decode) ve req.uid ' i şimdiki uid 'e eşitleyecek. Fonksiyon arakatman (middleware) olarak kullanılacağından dolayı **next()** i dosyamıza eklememiz gerekecek böylece arakatman bittiğinde normal fonksiyona geri dönebilsin.

Fonksiyonu test etmek için programımıza özel endpoint ekleyeceğiz. Bunu ekledikten sonra **index.js** şu şekilde gözükmelidir:
```javascript

const express = require('express');
const app = express();
const { admin } = require('./fbConfig');
const verify = require('./application/verifyToken');

app.get('/secretPage', verify, async (req, res) => {

    const uid = await req.uid;
    admin.auth().getUser(uid)
        .then(function (userRecord) {

            res.status(200).send("email: " + userRecord.email + "\nname: " + userRecord.displayName)
        })
        .catch(function (error) {
            console.log('Error fetching user data:', error);
        });

});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Listening 5000'));
```

Doğrulama (verify function) fonksiyonuna şu şekilde erişiyoruz: ```const verify = require('./application/verifyToken');```. Endpointimizin route'unu **secretPage** diye belirleyebiliriz. Bu durumda, URL şu şekilde olacaktır **http://localhost:5000/secretPage** . Buraya istek atıldığı zaman, **verify** fonksiyonu çağırılacak ve istemci tarafından gelen tokeni çözecek. Bunu da yaptıktan sonra, uid ' e erişim sağlayabileceğiz. Kullanıcının bilgilerine **admin.auth().getUser()** fonksiyonunu kullanarak erişebiliriz. Bu fonksiyon arguman olarak içine uid almaktadır. Eğer tokenimiz geçerli ise, program cevap olarak kullanıcının emailini ve displayName özelliklerini döndürecektir

Token doğrulama ile ilgili her şey bu kadar. Uygulamanın kaynak koduna [buraya](https://github.com/suleymanekmekci/firebase_nodejs_auth) tıklayarak erişebilirsiniz.

