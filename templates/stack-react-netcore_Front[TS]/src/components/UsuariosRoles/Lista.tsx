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
import { useUsuariosRolesStore } from '../../services/Stores/useUsuariosRolesStore'
export const Lista = () => {
  const ListaUsuariosRoles = useUsuariosRolesStore((state) => state.Lista)
  const Selecionar = useUsuariosRolesStore((state) => state.Selecionar)

  if (!ListaUsuariosRoles?.data.length) return <Typography variant="h6">No se encontraron datos</Typography>

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Sel.</TableCell>
            <TableCell>id</TableCell>
            <TableCell>usuarioId</TableCell>
            <TableCell>rolId</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ListaUsuariosRoles?.data.map((usuariorol) => (
            <TableRow key={usuariorol.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>
                <IconButton onClick={() => Selecionar(usuariorol)} size="small" sx={{ p: 0 }}>
                  <SearchIcon />
                </IconButton>
              </TableCell>
            <TableCell>{usuariorol.id}</TableCell>
            <TableCell>{usuariorol.usuarioId}</TableCell>
            <TableCell>{usuariorol.rolId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
