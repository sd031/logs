Package.describe({
  name: 'templates:logs',
  summary: 'Namespaced logs.',
  version: '1.0.0',
  git: 'https://github.com/meteortemplates/logs.git'
});

Npm.depends({
  "clivas": "0.1.4",
  "util": "0.10.3",
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.0');
  api.use([
    'check',
    'underscore'
  ]);
  api.addFiles('templates:logs-client.js', 'client');
  api.addFiles('templates:logs-server.js', 'server');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('templates:logs');
  api.addFiles('templates:logs-tests.js');
});
