## Getting Started

**Install**

```
meteor add templates:logs
```
**Example**

Create a file named `logconfig.js` inside of your lib folder. 
Inside of this file, you can add a logger namespace and assign it a color by using `Logger.addType('namespace', 'color');`
You can also disable all logs with that namespace by using `Logger.disableType('namespace');` 

In `logconfig.js`: 
```javascript
if (Meteor.isClient) {
 Logger.addType('namespace', 'color');
 Logger.disableType('namespace');
}

if (Meteor.isServer) {
  Logger.addType('namespace', 'color');
  Logger.disableType('namespace');
}
```
For example: 
```javascript
if (Meteor.isClient) {
 Logger.addType('accounts', 'blue');
}

if (Meteor.isServer) {
  Logger.addType('notifications', 'yellow');
}
```
If you want to disable a log namespace, simply type: 
```javascript
Logger.disableType('namespace');
```
This will disable all logs assigned to the `notifications` namespace: 
```javascript
if (Meteor.isServer) {
  Logger.addType('notifications', 'yellow');
  Logger.disableType('notifications');
}
```

In your application's server or client-specific javascript code:
```javascript
Logger.log('namespace', 'notification');
```
For example:
```javascript
Logger.log('users', 'User is now an admin');
```

![alt tag](http://i.imgur.com/YtOs9sF.png)
![alt tag](http://i.imgur.com/YRRrf9i.png)
![alt tag](http://i.imgur.com/btzA3Pi.png)


Contributors
------------

* [Jon James](http://github.com/jonjamz)
* [Andrew Reedy](http://github.com/andrewreedy)
* [Jeff James](http://github.com/jwjames)
