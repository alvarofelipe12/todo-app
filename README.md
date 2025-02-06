# Ionic To-Do App
## How to add cordova to an existing Ionic (with Capacitor) project

If you have an Ionic project that currently uses Capacitor and you wish to switch to Cordova, follow these steps:

1. Disable Capacitor Integration
First, disable the Capacitor integration within your Ionic project.

```sh
ionic integrations disable capacitor
```
2. Enable Cordova Integration
Next, enable the Cordova integration.
```sh
ionic integrations enable cordova
```
3. Clean Up Dependencies
Remove the existing node_modules directory and the package-lock.json file to ensure a clean start.
```sh
rm -rf node_modules
rm package-lock.json
npm cache clean --force
```
4. Reinstall Dependencies
Reinstall the dependencies using the --legacy-peer-deps flag to avoid peer dependency conflicts.
```sh
npm install --legacy-peer-deps
```
5. Add Cordova Platform for Android
Add the Cordova platform for Android.
```sh
ionic cordova platform add android
```
6. Add Cordova Platform for iOS
Add the Cordova platform for iOS.
```sh
ionic cordova platform add ios
```
7. Install Cordova Resources
Globally install cordova-res, a tool for generating Cordova resources such as splash screens and icons.
```sh
npm i -g cordova-res
```
8. Generate Android Resources
Generate the necessary resources for your Android project.
```sh
ionic cordova resources android --force
```
9. Add Cordova Builders
Add the Cordova builders to your project, enabling Cordova-specific build configurations.
```sh
ng add @ionic/cordova-builders
```
10. Build the Android Project
Build your Android project using Cordova.
```sh
ionic cordova build android
```

## To run the app in android

To run the app on an Android device or emulator, follow these steps:

1. Open an Emulator
Open any project in Android Studio and start an emulator. If you haven't set up an emulator yet, follow the instructions on the [Android Developer website](https://developer.android.com/studio/run/emulator-launch-without-app). 

2. Run the App
Once the emulator is running, you can deploy your app to the emulator or a connected Android device.

```sh
ionic cordova run android
```
## To run the app in ios

To run the app on an iOS device or simulator, follow these steps:

1. Check for the Xcode Workspace
Verify if you have the `xcworkspace` folder for your app:
```sh
ls platforms/ios/MyApp.xcworkspace
```

2. Open the Workspace in Xcode
If the workspace folder exists, open it in Xcode, replacing MyApp with your app's name.

```sh
open platforms/ios/Todo-app.xcworkspace
```
3. Build and Run the App (Optional)
You can optionally try building the iOS app from the command line. Note that in some cases, the default target might not work as expected.

```sh
ionic cordova build ios
```

## Optional: Remove Capacitor Capabilities and Libraries

If you wish to remove all Capacitor capabilities and libraries, run the following commands:

1. Uninstall Capacitor Libraries
Remove the Capacitor libraries from your project.
```sh
npm uninstall @capacitor/android @capacitor/app @capacitor/core @capacitor/haptics @capacitor/ios @capacitor/keyboard @capacitor/status-bar @capacitor/cli
```
2. Remove Capacitor Platforms
Delete the Capacitor platform directories if they exist.

```sh
rm -rf ios 
```
```sh
rm -rf android 
```

**🎉 Your Ionic app is now ready to run on Android & iOS! 🚀**



## 📌 Prerequisites
- Node.js installed (v20.11.0) (https://nodejs.org/)
- Ionic CLI installed (v7.2.0) (`npm install -g @ionic/cli`)
- Java installed (Tested on v21.0.6) (https://www.oracle.com/java/technologies/downloads/#java21)
- Android Studio for Android builds (Tested on Ladybug - v2024.2.2) (https://developer.android.com/studio)
- Xcode for iOS builds (Mac only) (Tested on v16.2) (https://developer.apple.com/xcode/)

---

## 📹 Demo

<div align="center">
  <a href="https://www.youtube.com/watch?v=4VD1-aAuDoc"><img src="https://img.youtube.com/vi/4VD1-aAuDoc/0.jpg" alt="IMAGE ALT TEXT"></a>
</div>

