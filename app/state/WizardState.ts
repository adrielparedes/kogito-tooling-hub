import storage from 'electron-json-storage';
import { Container } from 'unstated';

export type WizardState = {
  activeStep: number;
  location: string;
};

export default class WizardContainer extends Container<WizardState> {
  state = {
    activeStep: 0,
    location: '',
    folder: ''
  };

  constructor() {
    super();
    this.resetStep();
  }

  setActiveStep = (activeStep: number) => {
    this.setState({ activeStep });
  };

  setFolder = (folder: string) => {
    this.setState({ folder });
  };

  resetStep = () => {
    this.setActiveStep(0);
    storage.get('vscode', (error, data) => {
      let location = '';
      if (!error && typeof data === 'string') {
        location = data;
      }

      console.log(location);
      this.setState({
        activeStep: 0,
        location,
        folder: ''
      });
    });
  };

  nextStep = () => {
    this.setActiveStep(this.state.activeStep + 1);
  };

  prevStep = () => {
    this.setActiveStep(this.state.activeStep - 1);
  };

  setLocation = (location: string) => {
    this.setState({ location });
    storage.set('vscode', location, err => {});
  };
}
