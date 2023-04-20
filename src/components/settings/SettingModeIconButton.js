import { styled } from '@material-ui/core/styles';
import { Brightness2, WbSunny } from '@material-ui/icons';
// material
import { ToggleButton } from '@material-ui/core';
// hooks
import useSettings from '../../hooks/useSettings';

// ----------------------------------------------------------------------

const IconToogleButton = styled((props) => <ToggleButton {...props} />)({
  border: 'none !important',
  borderRadius: '50% !important',
  background: 'transparent !important',
  '& .MuiSvgIcon-root': {
    pointerEvents: 'none'
  }
});

export default function SettingMode() {
  const { themeMode, onChangeMode } = useSettings();

  return (
    <>
      {themeMode === 'light' ? (
        <IconToogleButton value="dark" onClick={onChangeMode}>
          <Brightness2 />
        </IconToogleButton>
      ) : (
        <IconToogleButton value="light" onClick={onChangeMode}>
          <WbSunny />
        </IconToogleButton>
      )}
    </>
  );
}
