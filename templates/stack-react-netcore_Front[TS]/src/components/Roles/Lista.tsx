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
import { useRolesStore } from '../../services/Stores/useRolesStore'
export const Lista = () => {
  const ListaRoles = useRolesStore((state) => state.Lista)
  const Selecionar = useRolesStore((state) => state.Selecionar)

  if (!ListaRoles?.data.length) return <Typography variant="h6">No se encontraron datos</Typography>

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Sel.</TableCell>
            <TableCell>id</TableCell>
            <TableCell>descripcionRol</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ListaRoles?.data.map((rol) => (
            <TableRow key={rol.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>
                <IconButton onClick={() => Selecionar(rol)} size="medium" sx={{ p: 0 }}>
                  <SearchIcon />
                </IconButton>
              </TableCell>
            <TableCell>{rol.id}</TableCell>
            <TableCell>{rol.descripcionRol}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
