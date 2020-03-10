import { TextField } from '@material-ui/core';
import * as child from 'child_process';
import { remote } from 'electron';
import os from 'os';
import React from 'react';

const { dialog } = remote;

const openDialog = (select: (location: string) => void) => {
  return () =>
    dialog
      .showOpenDialog({ properties: ['openFile', 'openDirectory'] })
      .then(res => {
        if (res.filePaths.length > 0) {
          select(res.filePaths[0]);
        }
        return res.filePaths;
      })
      .catch(err => {
        console.log(err);
      });
};

const openDarwin = (location: string, folder: string) => {
  child.execSync(
    `'${location}/Contents/Resources/app/bin/code' --args --enable-proposed-api kiegroup.vscode-extension-pack-kogito-kie-editors ${folder}`
  );
};

const openWindows = (location: string, folder: string) => {
  child.execSync(
    `'${location}' --args --enable-proposed-api kiegroup.vscode-extension-pack-kogito-kie-editors ${folder}`
  );
};

const openLinux = (location: string, folder: string) => {
  child.execSync(
    `'${location}' --args --enable-proposed-api kiegroup.vscode-extension-pack-kogito-kie-editors ${folder}`
  );
};

const openVSCode = (location: string, folder: string) => () => {
  const platform = os.platform();

  switch (platform) {
    case 'darwin':
      openDarwin(location, folder);
      break;
    case 'win32':
      openWindows(location, folder);
      break;
    case 'linux':
      openLinux(location, folder);
      break;
    default:
      console.log('Platform not supported');
      break;
  }
};

interface OpenVSCodeProps {
  location: string;
  folder: string;
  select: (folder: string) => void;
}

const OpenVSCode = (props: OpenVSCodeProps): React.FC<OpenVSCodeProps> => {
  const { location, folder, select } = props;
  console.log(folder);
  return (
    <div>
      <h1>Open Kogito VSCode</h1>
      <div className="wizard__content openvscode">
        <div className="openvscode__location">
          <TextField
            className="openvscode__location__text"
            margin="dense"
            id="name"
            label="Location"
            type="text"
            variant="outlined"
            value={folder}
            onChange={select}
          />
          <button
            type="button"
            className="openvscode__location__button btn btn-primary"
            onClick={openDialog(select)}
          >
            Explore
          </button>
        </div>
        <div className="openvscode__open">
          <button
            type="button"
            className="btn btn-primary"
            onClick={openVSCode(location, folder)}
          >
            Open
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpenVSCode;
