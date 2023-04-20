import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { List } from '@material-ui/core';
import SearchInput from '../../SearchInput';
import CollapseList from './CollapseList';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: 10
  },
  list: {
    width: '100%',
    maxWidth: 300
  }
}));

const ElementsList = ({ elementsConfig }) => {
  const classes = useStyles();
  const [filteredList, setFilteredList] = useState(elementsConfig);
  const [searchText, setSearchText] = useState('');

  React.useEffect(() => {
    if (searchText === '') {
      setFilteredList(elementsConfig);
    } else {
      const newList = elementsConfig.map(({ subheader, items }) => {
        const newItems = items.filter(({ title }) => title.includes(searchText));
        return { subheader, items: newItems };
      });
      setFilteredList(newList);
    }
  }, [searchText, elementsConfig]);

  return (
    <div className={classes.root}>
      <SearchInput value={searchText} onChange={(e) => setSearchText(e.target.value)} />
      <List component="nav" className={classes.list}>
        {filteredList.map(({ subheader, items }) => (
          <CollapseList header={subheader} key={`elements-${subheader}`} items={items} initialState />
        ))}
      </List>
    </div>
  );
};

ElementsList.propTypes = {
  elementsConfig: PropTypes.array
};

export default ElementsList;
