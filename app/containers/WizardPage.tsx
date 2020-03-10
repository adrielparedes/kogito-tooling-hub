import { Step, StepLabel, Stepper } from '@material-ui/core';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Subscribe } from 'unstated';
import FileSelector from '../components/FileSelector';
import InstallVsCodeExtension from '../components/InstallVsCodeExtension';
import OpenVSCode from '../components/OpenVSCode';
import WizardContainer, { WizardState } from '../state/WizardState';

function getSteps() {
  return ['VSCode location', 'Install extension', 'Open VSCode'];
}

function getStepContent(container: WizardContainer) {
  switch (container.state.activeStep) {
    case 0:
      return (
        <FileSelector
          location={container.state.location}
          select={container.setLocation}
        />
      );
    case 1:
      return <InstallVsCodeExtension location={container.state.location} />;
    case 2:
      return (
        <OpenVSCode
          location={container.state.location}
          folder={container.state.folder}
          select={container.setFolder}
        />
      );
    default:
      return 'Unknown stepIndex';
  }
}

const steps = getSteps();

const WizardPage = (
  props: WizardState & RouteComponentProps
): React.FC<WizardState & RouteComponentProps> => {
  return (
    <Subscribe to={[WizardContainer]}>
      {(container: WizardContainer) => (
        <div className="container wizard">
          <Stepper activeStep={container.state.activeStep} alternativeLabel>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {container.state.activeStep === steps.length ? (
              <div>
                <h1>All steps completed</h1>
                <button type="button" onClick={container.resetStep}>
                  Reset
                </button>
              </div>
            ) : (
              <div className="wizard__main">
                <div>{getStepContent(container)}</div>
                <div className="wizard__actions">
                  <button
                    className="btn btn-primary"
                    type="button"
                    disabled={container.state.activeStep === 0}
                    onClick={container.prevStep}
                  >
                    Back
                  </button>

                  {container.state.activeStep === steps.length - 1 ? (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        props.history.push('/');
                        container.resetStep();
                      }}
                    >
                      Finish
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={container.nextStep}
                    >
                      Next
                    </button>
                  )}

                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      props.history.push('/');
                      container.resetStep();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Subscribe>
  );
};

export default WizardPage;
