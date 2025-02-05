# Ionic To-Do App - Build & Run Instructions

## 📌 Prerequisites
- Node.js installed (v20.11.0) (https://nodejs.org/)
- Ionic CLI installed (v7.2.0) (`npm install -g @ionic/cli`)
- Java installed (Tested on v21.0.6) (https://www.oracle.com/java/technologies/downloads/#java21)
- Android Studio for Android builds (Tested on Ladybug - v2024.2.2) (https://developer.android.com/studio)
- Xcode for iOS builds (Mac only) (Tested on v16.2) (https://developer.apple.com/xcode/)

## 🚀 Compiling & Running the App

### 1️⃣ Install Dependencies
```sh
npm install
```

### 2️⃣ Build the Application
```sh
ionic build
npx cap sync
```

### 3️⃣ Open the Native Projects
For Android:
```sh
npx cap open android
```
For iOS (Mac only):
```sh
npx cap open ios
```

### 4️⃣ Run the Application
For Android Emulator or Device:
```sh
npx cap run android
```
For iOS Simulator (Mac only):
```sh
npx cap run ios
```

---

**🎉 Your Ionic app is now ready to run on Android & iOS! 🚀**


## 📹 Demo

<div align="center">
  <a href="https://www.youtube.com/watch?v=4VD1-aAuDoc"><img src="https://img.youtube.com/vi/4VD1-aAuDoc/0.jpg" alt="IMAGE ALT TEXT"></a>
</div>


## How to add cordova to an existing Ionic (with Capacitor) project

```sh
ionic integrations disable capacitor
```
```sh
ionic integrations enable cordova
```

```sh
rm -rf node_modules
rm package-lock.json
npm cache clean --force
```

```sh
npm install --legacy-peer-deps
```

```sh
ionic cordova platform add android
```

```sh
npm i -g cordova-res
```

```sh
ionic cordova resources android --force
```

```sh
ng add @ionic/cordova-builders
```

```sh
ionic cordova build android
```

## To run the app in android

first open any other project in Android and do the following https://developer.android.com/studio/run/emulator-launch-without-app

after that you'll be able to run

```sh
ionic cordova run android
```
## To run the app in ios

Check if you have already the xcworkspace folder in `platforms/ios/MyApp.xcworkspace`, if you do run the following command replacing the name of the app with yours

```sh
open platforms/ios/Todo-app.xcworkspace
```
optionally you can try, even though, in my case didn't work since it will try to build with iphone 11 target 🤷🏻‍♂️

```sh
ionic cordova build ios
```

## Optional

You can also get rid of all the capacitor capabilities and libraries by running

```sh
npm uninstall @capacitor/android @capacitor/app @capacitor/core @capacitor/haptics @capacitor/ios @capacitor/keyboard @capacitor/status-bar @capacitor/cli
```
And remove the previously added platforms from capacitor, if these exist

```sh
rm -rf ios 
```
```sh
rm -rf android 
```
