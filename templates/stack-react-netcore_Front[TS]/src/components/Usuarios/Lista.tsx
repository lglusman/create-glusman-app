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
import { useUsuariosStore } from '../../services/Stores/useUsuariosStore'
export const Lista = () => {
  const ListaUsuarios = useUsuariosStore((state) => state.Lista)
  const Selecionar = useUsuariosStore((state) => state.Selecionar)

  if (!ListaUsuarios?.data.length) return <Typography variant="h6">No se encontraron datos</Typography>

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Sel.</TableCell>
            <TableCell>id</TableCell>
            <TableCell>nombre</TableCell>
            <TableCell>userName</TableCell>
            <TableCell>password</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ListaUsuarios?.data.map((usuario) => (
            <TableRow key={usuario.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>
                <IconButton onClick={() => Selecionar(usuario)} size="medium" sx={{ p: 0 }}>
                  <SearchIcon />
                </IconButton>
              </TableCell>
            <TableCell>{usuario.id}</TableCell>
            <TableCell>{usuario.nombre}</TableCell>
            <TableCell>{usuario.userName}</TableCell>
            <TableCell>{usuario.password}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
