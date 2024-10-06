# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

```
alx-weather-app
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ config
│  ├─ description
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  ├─ sendemail-validate.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ objects
│  │  ├─ 06
│  │  │  ├─ b684ac3030153cd33ccd336ea6263f20d950b7
│  │  │  └─ ec1a9702ad23fa1571b72efb81318a0099fa2a
│  │  ├─ 0c
│  │  │  └─ 589eccd4d48e270e161a1ab91baee5e5f4b4bc
│  │  ├─ 0d
│  │  │  └─ c108bdbbb5a8194ffff6574d34263a5094a2d5
│  │  ├─ 0f
│  │  │  ├─ 1fb5b21a3832eae2005b541994179a5ed03c27
│  │  │  └─ 7909b4f7a72260bd11ceb420dc7919b6777781
│  │  ├─ 11
│  │  │  └─ 8de02f4745ee6a55612689a35496509cc900e9
│  │  ├─ 17
│  │  │  ├─ 9f484237ac3e270f2d4c7dcc5d2e7df1b16293
│  │  │  └─ f6e9fa8ade4c03c84cdbdbb0cdb6460c289761
│  │  ├─ 1a
│  │  │  └─ ad42a7b522ad2d8fd89fbcd7380d9a0c8429b5
│  │  ├─ 23
│  │  │  └─ 8d2e4e6436b353404369d9a59fda5f1f980657
│  │  ├─ 26
│  │  │  └─ 1ee0c472f4ca2510c3bffb78a31075b0e88711
│  │  ├─ 2a
│  │  │  └─ 5f55247b56fbc220ac139c56c116611e5b4cde
│  │  ├─ 2e
│  │  │  └─ 7af2b7f1a6f391da1631d93968a9d487ba977d
│  │  ├─ 31
│  │  │  └─ 3af67fc37b71a7119e66f46ee7e10f6861eb58
│  │  ├─ 32
│  │  │  └─ 0db7939569b67c098257a60c1d872ac7cb0aad
│  │  ├─ 36
│  │  │  └─ 9b2d8e1cf4adde8b3f46c0aab3e309ef6c45e1
│  │  ├─ 3b
│  │  │  └─ 769ddf74406b74d8f21531f679f2f3124df960
│  │  ├─ 3f
│  │  │  └─ 4e0250239de302fdfe15d78cc0eabbc0b3636e
│  │  ├─ 40
│  │  │  └─ bdb24499b7eb71465846bcd73b6fc235374a93
│  │  ├─ 42
│  │  │  └─ d4b271d61613c8cf0dee07b9b559781cba1daa
│  │  ├─ 4e
│  │  │  └─ 5f6915d85d97797b7abef6cdcde758346fc72b
│  │  ├─ 51
│  │  │  ├─ 1e0e87c19293f6b5bb99b5a2a4b4375797a621
│  │  │  ├─ 5acb9219000cac0bee9f163aba631d7bda95b9
│  │  │  └─ e2c4991fb88a9a3ce279b67f38fe95f9afc2f8
│  │  ├─ 52
│  │  │  └─ 424885f1c8122c133cc4f8a2474953ead68ee0
│  │  ├─ 53
│  │  │  ├─ 0173e56e5f2c762d25422c32dcd3f9a2485212
│  │  │  └─ 4d310de84f2052c7bd4384e615cd6e6ceb39a0
│  │  ├─ 55
│  │  │  └─ 7b37c44d5cb352ff331f90e7fba0189cdfa65e
│  │  ├─ 57
│  │  │  └─ d5661d202f008e9309ab51cbad3cb379d35efb
│  │  ├─ 5d
│  │  │  ├─ 4b354395c3506f5eff9a4ee9406c4da43f2da3
│  │  │  └─ d66362ff910cbe351ec1770ea56cecd1600e68
│  │  ├─ 61
│  │  │  └─ 4c86b487fa1bb02b80dcf725f9438d772f010a
│  │  ├─ 62
│  │  │  └─ 07703962962d1f3504b0c2d1b42c923703e7d7
│  │  ├─ 67
│  │  │  └─ 7bc96b6cca89208b5929366be93b9693074a86
│  │  ├─ 6c
│  │  │  └─ 87de9bb3358469122cc991d5cf578927246184
│  │  ├─ 6e
│  │  │  └─ 4f5c13efece9cf590e5c845fa79d70951b5480
│  │  ├─ 72
│  │  │  └─ d9596950de69a7084e324252f0bd2848f4f3df
│  │  ├─ 78
│  │  │  └─ b45f36e7ef6d352b31826827318a5cf561a5bf
│  │  ├─ 7f
│  │  │  └─ 04811252662264b333fdf7a46921db9235809d
│  │  ├─ 86
│  │  │  └─ 1b04b35601de92787a1a0db6c9fa190975d220
│  │  ├─ 89
│  │  │  └─ f91e54dc6f03e3953a071b1e217e6ed9dd4f0a
│  │  ├─ 8a
│  │  │  ├─ 2405d6b01e47b892d59dba5b44d1d26a638ba1
│  │  │  └─ 5590417dfa6a49f73b7d0f6dc071593231add6
│  │  ├─ 8d
│  │  │  └─ 071c947115d67cb008c81c8a5166cf0e862526
│  │  ├─ 90
│  │  │  ├─ 2b6978594d82e53fb74b61628eb45e5e9db38a
│  │  │  └─ 81968d300301f1ba3b65be86c8ae5461718d79
│  │  ├─ 94
│  │  │  └─ c0b2fc152a086447a04f62793957235d2475be
│  │  ├─ 95
│  │  │  └─ 43d455df912bef9731706516dcc186f7a5725b
│  │  ├─ 96
│  │  │  └─ 8fba7a92f4412c6ee3bb7a59eebed23a2d72c6
│  │  ├─ 9b
│  │  │  └─ df65b897a888b9b64e829020ea0b3391694eb4
│  │  ├─ a2
│  │  │  ├─ a43742ff1c6feaa586f9227c17ea9fa0024956
│  │  │  └─ cab900c73261963dc8a34ca7983c12184ea85d
│  │  ├─ a4
│  │  │  └─ c37e12103389b9c11b35c23ebc928822c01e8a
│  │  ├─ a5
│  │  │  └─ 47bf36d8d11a4f89c59c144f24795749086dd1
│  │  ├─ b2
│  │  │  └─ 0bf017182a344cc7cd55ce40eb2e19752a42df
│  │  ├─ b6
│  │  │  └─ 63b4f77a2a0eb2d3f571348cf262033af55b6d
│  │  ├─ b9
│  │  │  └─ d355df2a5956b526c004531b7b0ffe412461e0
│  │  ├─ bc
│  │  │  └─ 566d0903a4c8aefa50842581055ad4d3bde168
│  │  ├─ bd
│  │  │  └─ 68b38afdb6ddc0f770d9a5c5a4b97b7574d268
│  │  ├─ c1
│  │  │  └─ 5f10caa66e44eba62b9cbb7d3735ee7afde05d
│  │  ├─ c3
│  │  │  ├─ 14e22dcc31285b3b964fcba5d9b31e1a1826b2
│  │  │  └─ 57ea6c28894562202c5a2acbb72b6378ffa7a4
│  │  ├─ ca
│  │  │  └─ b3f842c5d3df5b1a5c6fb5c60a4b60db64f94d
│  │  ├─ d5
│  │  │  └─ 59132b1566208fe59923dd579f9a9db023c84b
│  │  ├─ da
│  │  │  └─ 327e8c56fe15442b43f17fd693a6776cbf9098
│  │  ├─ df
│  │  │  └─ 6c461173d29e111fdac33185c9bfe7455ba063
│  │  ├─ e4
│  │  │  └─ b4fcd4dc0e4b3edfa3ba483c809e473a2a7c33
│  │  ├─ e6
│  │  │  └─ 9de29bb2d1d6434b8b29ae775ad8c2e48c5391
│  │  ├─ e7
│  │  │  ├─ 91082286ab1405fa830019984a91464c255b22
│  │  │  ├─ 94c1f95d238107043a095797a53f2862bb4b4c
│  │  │  └─ b8dfb1b2a60bd50538bec9f876511b9cac21e3
│  │  ├─ f0
│  │  │  └─ c26a22c6ab52ec3a849b79c457c3af5a7c89dd
│  │  ├─ f1
│  │  │  └─ 15560b6f79ac5c29dbda40550605507502719e
│  │  ├─ f3
│  │  │  └─ 090fd7b9b0ddea868ba92f12a409763f092b31
│  │  ├─ f4
│  │  │  └─ a72405264ceb7677dbc712a681bc03710f6d6a
│  │  ├─ f7
│  │  │  └─ 68e33fc946e6074d6bd3ce5d454853adb3615e
│  │  ├─ f9
│  │  │  ├─ aeb01baf5288a111ba038b75642cb2dfaa694d
│  │  │  └─ b7da8f1c9a95a03ae7c3fbc7f364de39e328cb
│  │  ├─ fb
│  │  │  ├─ 4426ce8c17a9b9992ff382c89b3813f30d28d1
│  │  │  └─ b1adf230cb91a56d4f58c5474a922402f02d9c
│  │  ├─ fc
│  │  │  └─ 32d81d76f50aa742e5f098ff7ed5c4ad560c6a
│  │  ├─ info
│  │  └─ pack
│  └─ refs
│     ├─ heads
│     │  └─ master
│     ├─ remotes
│     │  └─ origin
│     │     └─ master
│     └─ tags
├─ .gitignore
├─ components.json
├─ eslint.config.js
├─ index.html
├─ jsconfig.json
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ App.css
│  ├─ App.jsx
│  ├─ assets
│  │  ├─ Icons
│  │  │  ├─ cloud.svg
│  │  │  ├─ cloudy.svg
│  │  │  ├─ heavy-rain.svg
│  │  │  ├─ humidity.svg
│  │  │  ├─ partly cloudy.png
│  │  │  ├─ partly cloudy.svg
│  │  │  ├─ rain.svg
│  │  │  ├─ react.svg
│  │  │  ├─ search.svg
│  │  │  ├─ snow.svg
│  │  │  ├─ sun and rain.svg
│  │  │  ├─ sun.svg
│  │  │  ├─ sunrise.svg
│  │  │  ├─ sunset.svg
│  │  │  ├─ thunderstorm.svg
│  │  │  └─ wind.svg
│  │  └─ images
│  │     └─ Nairobi-Default.jpg
│  ├─ components
│  │  └─ ui
│  │     └─ button.jsx
│  ├─ index.css
│  ├─ lib
│  │  └─ utils.js
│  └─ main.jsx
├─ tailwind.config.js
└─ vite.config.js

```