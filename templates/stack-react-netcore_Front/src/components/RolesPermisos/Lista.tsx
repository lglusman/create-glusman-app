import SearchIcon from '@mui/icons-material/Search'
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useRolesPermisosStore } from '../../services/Stores/useRolesPermisosStore'
export const Lista = () => {
  const ListaRolesPermisos = useRolesPermisosStore((state) => state.Lista)
  const Selecionar = useRolesPermisosStore((state) => state.Selecionar)

  if (!ListaRolesPermisos?.data.length) return <Typography variant="h6">No se encontraron datos</Typography>

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Sel.</TableCell>
            <TableCell>id</TableCell>
            <TableCell>rolId</TableCell>
            <TableCell>permisoId</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ListaRolesPermisos?.data.map((rolpermiso) => (
            <TableRow key={rolpermiso.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>
                <IconButton onClick={() => Selecionar(rolpermiso)} size="small" sx={{ p: 0 }}>
                  <SearchIcon />
                </IconButton>
              </TableCell>
            <TableCell>{rolpermiso.id}</TableCell>
            <TableCell>{rolpermiso.rolId}</TableCell>
            <TableCell>{rolpermiso.permisoId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
