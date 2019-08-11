# simple_vote_system
### firebase config
- cd simple_vote_system/src/plugins
- cp firebase.js.org firebase.js
- [add info into firebase.js]

### firebase deploy
- docker exec -it [container name] sh
- npm install -g firebase-tools
- [add .firebaserc]
- firebase login --no-localhost
- npm run-script build
- firebase deploy
