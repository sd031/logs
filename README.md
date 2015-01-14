## Getting Started

Installation:

```
meteor add templates:logs
```

--------------------------------------------------------------------------------

Create a file named publish.js inside of your lib folder. 
Inside of this file, you can add a logger namespace and assign it a color. 
You can also disable all logs with that namespace with `Logger.disableType();` 

In publish.js: 
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
for example: 
```javascript
if (Meteor.isClient) {
 Logger.addType('accounts', 'blue');
 Logger.disableType('accounts');
}

if (Meteor.isServer) {
  Logger.addType('notifications', 'yellow');
}
```
If you want to disable a log namespace, simply type: 
```javascript
Logger.disableType('[namespace]');
```
for example: 
```javascript
if (Meteor.isServer) {
  Logger.addType('notifications', 'yellow');
  Logger.disableType('notifications');
}
```
