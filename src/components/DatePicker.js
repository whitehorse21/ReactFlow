import { alpha } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import { DesktopDatePicker } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'inherit',
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto'
    },
    '& .MuiOutlinedInput-root': {
      display: 'flex',
      flexDirection: 'row-reverse',
      padding: 0
    },
    '& input': {
      padding: '8px 8px 8px 16px',
      transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    },
    '& fieldset.MuiOutlinedInput-notchedOutline': {
      border: '1px solid !important',
      borderColor: `${alpha(theme.palette.action.active, 0.15)} !important`
    }
  }
}));

const CustomDatePicker = ({ ...props }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <DesktopDatePicker {...props} />
    </div>
  );
};

export default CustomDatePicker;
