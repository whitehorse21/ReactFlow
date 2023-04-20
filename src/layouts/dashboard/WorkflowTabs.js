import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import Page from '../../components/Page';
import { StyledTab, StyledTabs } from '../../components/_dashboard/workflow/Tabs';

const TabsContainer = styled('div')(() => ({
  height: 25,
  display: 'flex'
}));

const TabActions = styled('div')(({ theme }) => ({
  flexGrow: 1,
  paddingLeft: theme.spacing(1),
  border: '1px solid currentColor',
  borderLeft: 'none',
  cursor: 'pointer'
}));

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  tabs: {
    height: 25,
    display: 'flex'
  },
  children: {
    flexGrow: 1
  }
}));

function a11yProps(index) {
  return {
    id: `workflow-tab-${index}`,
    'aria-controls': `workflow-tabpanel-${index}`
  };
}

const WorkflowTabs = ({ children, flows, currentFlow, changeCurrentFlow, addNewFlow, deleteFlow }) => {
  const classes = useStyles();
  const [tabs, setTabs] = React.useState([]);
  const [tabIndex, setTabIndex] = React.useState(0);
  const changeTab = (tab) => {
    changeCurrentFlow(tab);
  };
  const closeTab = (tabId) => {
    deleteFlow(tabId);
    if (tabs.length > 1) setTabs(tabs.filter(({ id }) => id !== tabId));
  };

  useEffect(() => {
    setTabs(flows);
  }, [flows]);

  useEffect(() => {
    if (tabs && Array.isArray(tabs) && tabs.length && currentFlow) {
      const newIndex = tabs.findIndex(({ id }) => currentFlow === id);
      setTabIndex(newIndex);
    }
  }, [currentFlow, tabs]);

  return (
    <Page className={classes.root}>
      <TabsContainer>
        <StyledTabs value={tabIndex}>
          {tabs.map((tab, index) => (
            <StyledTab
              label={<span>{tab.name}</span>}
              {...a11yProps(index)}
              key={tab.id}
              onClick={() => changeTab(tab.id)}
              onClose={
                tabs.length < 2
                  ? null
                  : () => {
                      closeTab(tab.id);
                    }
              }
            />
          ))}
        </StyledTabs>
        <TabActions className={classes.tabActions} onClick={addNewFlow}>
          +
        </TabActions>
      </TabsContainer>
      <div className={classes.children}>{children}</div>
    </Page>
  );
};

WorkflowTabs.propTypes = {
  children: PropTypes.node
};

export default WorkflowTabs;
