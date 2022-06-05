# Online Shop


##  Start up the UI



* Navigate to the ui folder :

```sh

cd ui
```
* Download dependencies :
```sh

npm install

```

* Start :
```sh
npm start
```

##  Start up the Backend



* Navigate to the app folder :

```sh

cd app
```
* run maven build :
```sh

mvn package -DskipTests

```

* Start :
```sh
java -Djasypt.encryptor.password=progex -jar target\online-shop-0.0.1-SNAPSHOT.jar
```

