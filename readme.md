## Usage

To start the website you must first install all dependencies, then you can just start the server

```sh
npm install
npm start
```

On Linux systems port 80 might be restricted to normal users, and as such you should run it as root.

## Developers

### Formatting

After saving your code please run `npm run format` to format the code as per the configuration in `package.json`

### File structure

**DO NOT** put any sensitive information in the `public/` folder as that folder is visable to everyone accessing the server.

- `views/`
  - This is where `.pug` files go, like the layout and navigation bar.
- `routes/`
  - This is where the server side code goes for each page. These must be defined in `app.js` to be accessible from the browser.

## FAQ

### Why nodejs and not a static website?
A nodejs website allows for the developer to do much more with a website. For example this website uses it to save logs about who uses the website, fancy urls (`www.example.com/dogs` instead of `/dogs.html`) and server side tasks that improve the website' appearence, such as dynamic background picture, navbar that changes the colour depending on which page you are on and a consistent layout.

### Why SCSS and not CSS
Since this website uses nodejs it can use SCSS without having to manually compiling the code. And this makes css a lot more painless to write. 

### Why does this project break a few of the criterias?
[The criterias](/criteria.pdf) are written with a static webpage in mind. This makes them un-practical for a nodejs website. So let's go over what should you not do.
- Relative paths
  - Relative paths are great for a static website which should be ran as html files. But when you run a webserver absolute paths are relative to the root of the project. As such a `/dogs` link doesn't look for the dogs file in your root system, but in the root of the `public/` folder. This makes copy pasting code incredibily easy and is why relative paths are a no-go
- Folder structure
  - As you can guess, the folder structure isn't made with a webserver in mind either. As such we have to adapt it a bit. Anything server only does not touch the `public/` folder and if it has to it goes through server side JavaScript.
- No inline style
  - I couldn't figure out how to do the background picture to be random with just css so I resorted to inline css. Desperate times require desperate mesures.

### Why random puppies?
All puppies are good boys. It would be a crime to rank them. So chance shall decide and I will hope that no puppies know about this.

### Why JavaScript and not PHP?
I wish I knew my friend, I wish I knew.