const fs = require('fs');
var path = require('path');

let version = '';

for (const args of process.argv) {
  if (args.startsWith('-appVersion=')) {
    version = args.split('=')[1];
    break;
  }
}

if (version) {
  const appInfoFilePath = path.join(__dirname, '..', 'app', 'app-info.json');

  const appInfo = JSON.parse(fs.readFileSync(appInfoFilePath, 'utf8'));
  appInfo.version = version;

  fs.writeFileSync(appInfoFilePath, JSON.stringify(appInfo), 'utf8');
  console.log(`App version was updated to: ${version}`);

  process.exit(0);
}

console.log('No version was passed. Script finished without version update.');
process.exit(0);
