import { remote } from 'electron';
import React from 'react';

const { dialog } = remote;

const openDialog = (select: (location: string) => void) => {
  return () =>
    dialog
      .showOpenDialog({ properties: ['openFile'] })
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

interface FileSelectorProps {
  location: string;
  select: (location: string) => void;
}

const FileSelector = (
  props: FileSelectorProps
): React.FC<FileSelectorProps> => {
  const { location, select } = props;
  return (
    <div className="fileselector">
      <h1>File Selector</h1>
      <div className="wizard__content fileselector__dialog">
        <input
          id="name"
          label="Location"
          type="text"
          value={location}
          onChange={select}
          className="fileselector__dialog__text"
        />
        <button
          type="button"
          onClick={openDialog(select)}
          className="fileselector__dialog__button btn btn-primary"
        >
          Explore
        </button>
      </div>
    </div>
  );
};

export default FileSelector;
