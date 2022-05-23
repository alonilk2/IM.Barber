import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import useUser from '../../../Hooks/useUser';
import useWindowSize from '../../../Hooks/useWindowSize';

export function UserAvatar() {
  const user = useUser();
  const size = useWindowSize();
  return (
    <div className='categories-btn-col'>
      <a href={user ? '/profile' : '/signin'} id='profile-link'>
        <Avatar
          sx={size.width > 768
            ? { bgcolor: deepOrange[500], width: '40px', height: '40px' }
            : { bgcolor: deepOrange[500], width: '25px', height: '25px' }}
          alt={user ? user.data.user.firstname : null}
          src='/broken-image.jpg'
        ></Avatar>
        <p>{user ? 'שלום ' + user.data.user.firstname : `שלום אורח/ת!`}</p>
      </a>
    </div>
  );
}
