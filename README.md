# Pit-Info-Display

---
## Status: In development
This is an electron application for interfacing with the TBA API so that we can get relevant information in the pits such as next match, matches before our next one, etc.

---
## Documentation
### config.json
This is where all of your team and competition info will go. Most of the variable names are self-explanatory. The only thing you might get tripped up on is the event code. This can be found [here](https://frc-events.firstinspires.org/2018/events).
### SASS (Syntactically Awesome StyleSheets)
For styling, we decided to use SASS, or SCSS, more specifically, because it supports all default css code, while adding a whole new feature set, making it easier to maintain and configure.
All of the variables that you will likely want to change are all defined at the top of the file under ```electronUI/main/content/sass/main.scss```. However, this means that any changes made to sass code will need to be recompiled into plain CSS. Later, I will add a SASS interpreter, to do this for you in the runtime on start, but until then, please refer to [```https://sass-lang.com/install```](https://sass-lang.com/install) to install the precompiler, and [```https://sass-lang.com/guide#topic-1```](https://sass-lang.com/guide#topic-1) to compile. (This is something probably best done with guidance by your software team (unless you know your way around terminals :P))
### Other docs
If you would like to modify another part of the code, the comments should help guide you through my thought process when making this. However, if you cannot figure something out, feel free to open an issue asking for help.
