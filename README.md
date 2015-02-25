## Getting Started

**Install**

```
meteor add bigdata:logs
```
**Example**

First, add a `type` to Logger. Usually we do this in a file named `logconfig.js` inside of our `/lib` folder.

```javascript
Logger.addType(/*namespace*/, /*color (shows on the server-side only)*/);
```

For example: 
```javascript
if (Meteor.isClient) {
 Logger.addType('accounts');
}

if (Meteor.isServer) {
  Logger.addType('roles', 'yellow');
}

// This works, too--the color will only show on the server-side console.
Logger.addType('comments', 'blue');
```

Then, log something!

```javascript
Logger.log(/*type*/, /*text*/, /*data*/);
```

For example:
```javascript
if (Meteor.isClient) {
 Logger.log('accounts', 'User has loaded the page', Meteor.user());
}

if (Meteor.isServer) {
  Logger.log('roles', 'User is now an admin', user);
}
```

You can also disable all logs of a given `type` at any time:

```javascript
Logger.disableType(/*namespace*/);
```

For example, to disable all logs for the `accounts` type we created above:
```javascript
if (Meteor.isClient) {
  Logger.disableType('accounts');
}
```

That's all for now!

**Screenshots**

![alt tag](http://i.imgur.com/YtOs9sF.png)
![alt tag](http://i.imgur.com/YRRrf9i.png)
![alt tag](http://i.imgur.com/btzA3Pi.png)


Contributors
------------

* [Jon James](http://github.com/jonjamz)
* [Andrew Reedy](http://github.com/andrewreedy)
* [Jeff James](http://github.com/jwjames)
