import React, { useRef, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Page from '../../components/Page';
import WorkflowHeader from '../../components/_dashboard/home/WorkflowHeader';
import WorkflowArea from './WorkflowArea';
import ElementsBar from '../../layouts/dashboard/ElememtsBar';
import WorkflowRightSide from '../../layouts/dashboard/WorkflowRightSide';
import WorkflowFooter from '../../layouts/dashboard/WorkflowFooter';
import { FlowsContext, FlowsProvider } from '../../contexts/FlowsContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%'
  },
  workflowArea: {
    flexGrow: 1
  }
}));

const Home = ({ showElements }) => {
  const classes = useStyles();
  const workflowRef = useRef(null);

  const saveFlow = useCallback(() => {
    if (workflowRef.current) workflowRef.current.saveToDb();
  }, [workflowRef]);

  const runFlow = useCallback(() => {
    if (workflowRef.current) workflowRef.current.run();
  }, [workflowRef]);

  return (
    <Page title="Home" className={classes.root}>
      <FlowsProvider>
        <WorkflowHeader saveFlow={saveFlow} runFlow={runFlow} />
        <div className={classes.workflowArea}>
          <ElementsBar showElements={showElements}>
            <WorkflowFooter>
              <WorkflowRightSide>
                <WorkflowArea ref={workflowRef} />
              </WorkflowRightSide>
            </WorkflowFooter>
          </ElementsBar>
        </div>
      </FlowsProvider>
    </Page>
  );
};

Home.propTypes = {
  showElements: PropTypes.bool
};

export default Home;
