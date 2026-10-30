Little Learners - logo + splash pack
Copy these into your project (same paths, overwrite):
  assets/images/*   app icon (1024), Android adaptive icon (fg/bg/mono), favicon, native splash image
  assets/branding/little_learners_logo_cutout.png   transparent logo used on Home
  app.json          points iOS + Android icons and the native splash at the new files
  src/app/index.tsx in-app animated splash (jungle art + loading bar)
Then rebuild native code: npx expo prebuild --clean (or a new EAS / dev build). Expo Go ignores custom icons/splash.
