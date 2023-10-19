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
import { usePermisosStore } from '../../services/Stores/usePermisosStore'
export const Lista = () => {
  const ListaPermisos = usePermisosStore((state) => state.Lista)
  const Selecionar = usePermisosStore((state) => state.Selecionar)

  if (!ListaPermisos?.data.length) return <Typography variant="h6">No se encontraron datos</Typography>

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Sel.</TableCell>
            <TableCell>id</TableCell>
            <TableCell>descripcionPermiso</TableCell>
            <TableCell>sitioId</TableCell>
            <TableCell>url</TableCell>
            <TableCell>posicion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ListaPermisos?.data.map((permiso) => (
            <TableRow key={permiso.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>
                <IconButton onClick={() => Selecionar(permiso)} size="small" sx={{ p: 0 }}>
                  <SearchIcon />
                </IconButton>
              </TableCell>
            <TableCell>{permiso.id}</TableCell>
            <TableCell>{permiso.descripcionPermiso}</TableCell>
            <TableCell>{permiso.sitioId}</TableCell>
            <TableCell>{permiso.url}</TableCell>
            <TableCell>{permiso.posicion}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
