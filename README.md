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
