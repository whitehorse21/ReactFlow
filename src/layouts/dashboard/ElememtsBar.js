import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import ReactFlow, { ReactFlowProvider } from 'react-flow-renderer';
import Page from '../../components/Page';
import { ElementsList } from '../../components/_dashboard/home';
import elementsConfig from './ElementsConfig';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%'
  },
  children: {
    flexGrow: 1,
    height: '100%'
  }
}));

const ElementsBar = ({ children, showElements }) => {
  const classes = useStyles();

  return (
    <Page className={classes.root}>
      <ReactFlowProvider>
        {showElements && <ElementsList elementsConfig={elementsConfig} />}
        <div className={classes.children}>{children}</div>
      </ReactFlowProvider>
    </Page>
  );
};

ElementsBar.propTypes = {
  children: PropTypes.node,
  showElements: PropTypes.bool
};

export default ElementsBar;
