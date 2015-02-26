Package.describe({
  name: 'bigdata:logs',
  summary: 'Namespaced logs with style.',
  version: '1.0.2',
  git: 'https://github.com/meteorbigdata/logs.git'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.0');
  api.use([
    'check',
    'underscore'
  ]);
  api.addFiles('client.js', 'client');
  api.addFiles('server.js', 'server');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('bigdata:logs');
  api.addFiles('test.js');
});
