# F1-Swimmers-Overview

Swimming Overview desktop application
- ability to add events 
- ability to add swimmers for each series
- ability to rank all swimmers 
- ability to generate the ranking pdf report for each event

```bash

    // initial commands
    npm i -g @ionic/cli
    npm install

    // build commands after each change
    ionic build // build changes
    npx cap sync electron // sync changes from ionic build
    npx cap open electron // open elenctron app
    npx electron-packager . // build desktop executable
```


- https://stackoverflow.com/questions/31286924/how-to-deploy-an-electron-app-as-an-executable-or-installable-in-windows



If you want to execute ```npx electron-packager .```   you first have to run the following command: ```npm run build``` in the electron folder, it's ok to get some errors they dont affect the build(at least not from current tests.).

Other thing: if it gives an error at start you should go before you build it to the ```index.ts``` file in the electron folder and comment the ```autoUpdater``` function, as it generates some errors.