import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  header: {
    fontSize: 12
  },
  subItemWrapper: {
    padding: 2
  },
  subItem: {
    backgroundColor: `${theme.palette.background.paper} !important`,
    borderRadius: '5px !important',
    border: `1px solid ${theme.palette.action.disabled}`,
    cursor: 'pointer',
    padding: '8px 4px 4px 8px !important',
    '& span': {
      fontSize: 14
    },
    '& svg': {
      fontSize: 18
    }
  }
}));

const CollapseList = ({ initialState, items, header }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(initialState);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleDrag = (event, nodeType, title) => {
    const data = JSON.stringify({
      type: nodeType,
      name: title
    });
    event.dataTransfer.setData('application/reactflow', data);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <>
      <ListItem dense button onClick={handleClick}>
        <ListItemText primary={header} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {items.map(({ title, type }) => (
            <div key={title} className={classes.subItemWrapper}>
              <ListItem
                className={clsx(classes.subItem, `dndnode ${type || ''}`)}
                onDragStart={(event) => handleDrag(event, type, title)}
                draggable
              >
                <DragIndicatorIcon />
                <ListItemText primary={title} />
              </ListItem>
            </div>
          ))}
        </List>
      </Collapse>
    </>
  );
};

CollapseList.propTypes = {
  initialState: PropTypes.bool,
  items: PropTypes.array,
  header: PropTypes.string
};

export default CollapseList;
