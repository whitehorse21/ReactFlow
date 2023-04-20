import React, { useContext } from 'react';
import { Breadcrumbs, Link, IconButton } from '@material-ui/core';
import { PlayArrow, Save, Undo, Redo, Adjust, CloudUploadOutlined } from '@material-ui/icons';
import { makeStyles, styled } from '@material-ui/styles';
import { Link as RouterLink } from 'react-router-dom';
import { MHidden } from '../../@material-extend';
import { FlowsContext } from '../../../contexts/FlowsContext';

const ActionButton = styled('div')(({ theme }) => ({
  display: 'inline-block',
  textAlign: 'center',
  fontSize: 10,
  lineHeight: 1,
  textTransform: 'capitalize',
  margin: '0 3px',
  padding: 2,
  '&:hover': {
    cursor: 'pointer',
    background: theme.palette.action.hover
  }
}));

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    borderTop: 'solid #c5c4c469 1px',
    borderTopColor: theme.palette.text.disabled,
    borderBottom: 'solid #0e0e0e96 1px',
    borderBottomColor: theme.palette.text.primary,
    padding: '0 15px'
  },
  path: {
    display: 'flex',
    alignItems: 'center'
  },
  actions: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

const WebflowHeader = ({ saveFlow, runFlow }) => {
  const classes = useStyles();
  const { data } = useContext(FlowsContext);

  const currentFlowName = data?.currentFlow?.name;

  return (
    <div className={classes.root}>
      <MHidden width="smDown">
        <div className={classes.path}>
          <Breadcrumbs aria-label="workflow-Flows">
            <LinkRouter color="inherit" to="/dashboard/home">
              Projects
            </LinkRouter>
            <LinkRouter color="inherit" to="/dashboard/home">
              {currentFlowName}
            </LinkRouter>
          </Breadcrumbs>
        </div>
      </MHidden>
      <div className={classes.actions}>
        <ActionButton className={classes.button} onClick={(event) => saveFlow()}>
          <Save color="action" />
          <p>save</p>
        </ActionButton>
        <ActionButton className={classes.button} onClick={(event) => runFlow()}>
          <PlayArrow color="action" />
          <p>run</p>
        </ActionButton>
        <ActionButton className={classes.button}>
          <Undo color="action" />
          <p>back</p>
        </ActionButton>
        <ActionButton className={classes.button}>
          <Redo color="action" />
          <p>forward</p>
        </ActionButton>
        <ActionButton className={classes.button}>
          <Adjust color="action" />
          <p>record</p>
        </ActionButton>
        <ActionButton className={classes.button}>
          <CloudUploadOutlined color="action" />
          <p>upload to cloud</p>
        </ActionButton>
      </div>
    </div>
  );
};

export default WebflowHeader;
