import * as child from 'child_process';
import { remote } from 'electron';
import os from 'os';
import path from 'path';
import React from 'react';

const { dialog } = remote;

const extensionLocation = path.join(
  __dirname,
  '../resources/vscode_extension_kogito_kie_editors_1.0.0.vsix'
);

const installDarwin = location => {
  child.exec(
    `'${location}/Contents/Resources/app/bin/code' --install-extension ${extensionLocation}`,
    (err, stdout, stderr) => {
      console.log(stdout);
      console.log(err);
      console.log(stderr);
    }
  );
};
const installWindows = location => {};
const installLinux = location => {};

const installExtension = (location: string) => () => {
  const platform = os.platform();

  switch (platform) {
    case 'darwin':
      installDarwin(location);
      break;
    case 'win32':
      installWindows(location);
      break;
    case 'linux':
      installLinux(location);
      break;
    default:
      console.log('Platform not supported');
      break;
  }
};

interface InstallVsCodeExtensionProps {
  location: string;
}

const InstallVsCodeExtension = (
  props: InstallVsCodeExtensionProps
): React.FC<InstallVsCodeExtensionProps> => {
  const { location, select } = props;
  return (
    <div className="installvscode">
      <h1>Install Extension</h1>
      <div className="wizard__content installvscode__location">
        Extension will be installed in:
        <b>{location}</b>
      </div>
      <button
        type="button"
        onClick={installExtension(location)}
        className="installvscode__button btn btn-primary"
      >
        Install
      </button>
    </div>
  );
};

export default InstallVsCodeExtension;
