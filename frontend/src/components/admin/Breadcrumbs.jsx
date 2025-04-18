import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);
  
  return (
    <MuiBreadcrumbs sx={{ mb: 2 }}>
      <Link component={RouterLink} to="/admin">
        Админ панель
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        
        return isLast ? (
          <Typography key={name} color="text.primary">
            {name}
          </Typography>
        ) : (
          <Link key={name} component={RouterLink} to={routeTo}>
            {name}
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
};