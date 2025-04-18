import { Skeleton } from '@mui/material';

export const ProductSkeleton = () => (
  <TableRow>
    <TableCell>
      <Skeleton variant="rectangular" width={50} height={50} />
    </TableCell>
    <TableCell>
      <Skeleton variant="text" />
    </TableCell>
    <TableCell>
      <Skeleton variant="text" />
    </TableCell>
    <TableCell>
      <Skeleton variant="text" />
    </TableCell>
    <TableCell>
      <Skeleton variant="text" />
    </TableCell>
    <TableCell>
      <Skeleton variant="rectangular" width={100} />
    </TableCell>
  </TableRow>
);