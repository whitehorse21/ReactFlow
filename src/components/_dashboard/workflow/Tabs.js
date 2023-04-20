import React from 'react';
import { withStyles } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CloseIcon from '@material-ui/icons/Close';

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(12),
    height: '100%',
    border: '1px solid currentColor !important',
    borderRadius: '0px !important',
    minWidth: '0px',
    padding: '0px !important',
    overflow: 'visible',
    paddingLeft: '20px !important',
    paddingRight: '20px !important',
    minHeight: 'inherit !important',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '0px !important'
  },
  selected: {
    color: 'white',
    backgroundColor: theme.palette.primary.main
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    padding: '0px',
    '& *:first-child': {
      margin: '5px'
    },
    '& *:last-child': {
      margin: '5px'
    }
  }
}))((props) => {
  const newProps = { ...props };
  delete newProps.onClose;
  return (
    <Tab
      disableRipple
      {...newProps}
      icon={
        props.onClose && (
          <CloseIcon
            fontSize="small"
            onClick={(e) => {
              e.stopPropagation();
              props.onClose();
            }}
          />
        )
      }
    />
  );
});

const StyledTabs = withStyles({
  root: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
    maxWidth: 'calc(100% - 100px)',
    width: 'fit-content',
    minHeight: 'inherit !important'
  },
  scroller: {
    height: '100%'
  },
  flexContainer: {
    height: '100%'
  },
  indicator: {
    display: 'none'
  }
})((props) => <Tabs {...props} TabIndicatorProps={{}} />);

export { StyledTab, StyledTabs };
