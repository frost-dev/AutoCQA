# These are the main files for the AutoCQA figma plugin of Frost!

## Setup the plugin on figma (For testing or development):

1. Clone repository

   <img src="https://github.com/lxpocampoFrost/AutoCQA/assets/117623161/b2b6dff2-7a73-45ac-baa6-8981980e6cd0" alt="Image description" height="400">

3. On your terminal, navigate to **plugin** directory
4. Run  `npm install`
   
   <img src="https://github.com/lxpocampoFrost/AutoCQA/assets/117623161/368571d4-bfed-4cd7-bc91-459d3cddef46" alt="Image description" height="50">

6. After installing run typescript compilation with `Ctrl-Shift-B in Windows`, or `Command-Shift-B for Mac`.
7. Select `npm watch - plugin`. Typescript will now watch for changes in plugin code.
   
   <img src="https://github.com/lxpocampoFrost/AutoCQA/assets/117623161/b6db0d3f-8311-4594-8bcb-1e5938d642c7" alt="Image description" height="100">
   
9. Go to Figma, open menu got to **Plugins > Development > Import** plugin from manifest
10. Head over to where you cloned the autoCQA project.
11. Select `manifest.json`.
12. You can now run the plugin! Select AutoCQA or start it from **Plugins > Development > AutoCQA**


## Start the plugin's server:

The plugin's core functionalites are handled on the backend. Finding the text on the website, Asking GPT to correct mistakes. 
Make sure to run this server or autoCQA won't work. Especially if you plan to test or add new features.
To run the server: 

1. After cloning repository, on the terminal, navigate to the **server** directory.
2. Run `npm install`
3. Start the server with `npm start`
4. Server should be ready to receive requests from the plugin!
##### Note: Plugin fetches from localhost by default, make sure fetch() is pointed to local server.
##### Note: Console.logs are left so that you can see if server is receiving requests! check them out on the terminal.

