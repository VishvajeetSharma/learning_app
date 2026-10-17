# Little Learners — 3D redesign: status report

## Before you run it (2 required steps)
```bash
npx expo install react-native-svg @expo/vector-icons   # new imports used by Canvas.tsx / kit.tsx
npx expo start                                          # Expo Go is enough: no new custom native code
```
Android APK: `npx eas-cli@latest build -p android --profile preview` (set `"android": {"buildType": "apk"}` in eas.json),
or locally `npx expo run:android`. Package name / bundle id / app.json were NOT changed.

## Implemented in code (all 12 screens, existing project, no new app)
Splash · Home · Animals · Learn · Finger Trace · Finger Write · Correct · Wrong · Next Animal · Progress · Review · Settings+Reset.
- Theme: every colour in `src/theme/colors.ts` (no inline hex elsewhere); glossy `Btn`/`RoundBtn`, `Card`, `WoodSign`, `Logo`, `Header`.
- Canvas: react-native-svg paths; finished strokes memoised, only the live stroke re-renders; Clear + Undo.
- Trace: dotted guide, numbered start badges, direction arrows, auto-verify per stroke (coverage + on-path + start-point).
- Write: **real offline recognition** (`src/lib/recognizer.ts`): groups strokes into letters, matches each against letter templates
  (point-cloud matcher). Word passes only if letter count AND every letter match. Uppercase print only.
- Progress: correct/wrong/attempts/accuracy/stars/last-practiced, AsyncStorage, migration of old saves, confirmed reset.
- Review: every animal tappable; badge shows learned / not yet.

## Tested
- Recognizer logic in Node on SIMULATED handwriting (jittered letter templates, not real children): ~90% of correct words accepted,
  100% of unrelated same-length words rejected, ~98% of words with one wrong letter rejected, "LIN" for LION and a scribble rejected.
- All source files parse cleanly with `tsc` (syntax only).

## NOT tested / not done
- App was never launched: no emulator, no node_modules, no network here. Full `tsc`, lint, layout, touch feel and performance on a real
  Android phone are unverified. No screenshot-vs-reference comparison was possible.
- Recognizer has not seen real children's handwriting; thresholds (`TOLERANCE`, `verifyTrace` tolerances) will need tuning on-device.
- **No new 3D art exists.** Placeholders are used: built-in sky/foliage scene, text wordmark logo, CSS wood sign, Ionicons for category
  icons, base animal art for happy/sad/celebrating. Existing animal PNGs are only 300x300 (giraffe is cropped) — replace with 1024px art.
  `Little_Learners_3D_Assets.zip` was NOT created.
- Pronunciation is still on-device TTS (expo-speech), not bundled audio. Sound effects and background music have no audio yet
  (the toggles save but play nothing).
- Rounded display font not bundled (set `fontFamily.display` in `typography.ts` after adding one with expo-font).

## Where the art plugs in (no code changes needed beyond uncommenting)
`src/data/backgrounds.ts` — BACKGROUNDS (10 jungle scenes), DECOR (logo, wood board, finger, stars, confetti, category icons).
`src/data/animals.ts` — `expressions: { happy, sad, celebrating }` per animal; replace `assets/animals/*.png`.
