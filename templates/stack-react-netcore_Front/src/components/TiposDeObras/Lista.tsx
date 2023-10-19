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
import { useTiposDeObrasStore } from '../../services/Stores/useTiposDeObrasStore'
export const Lista = () => {
  const ListaTiposDeObras = useTiposDeObrasStore((state) => state.Lista)
  const Selecionar = useTiposDeObrasStore((state) => state.Selecionar)

  if (!ListaTiposDeObras?.data.length) return <Typography variant="h6">No se encontraron datos</Typography>

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Sel.</TableCell>
            <TableCell>id</TableCell>
            <TableCell>tipo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ListaTiposDeObras?.data.map((tipodeobra) => (
            <TableRow key={tipodeobra.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>
                <IconButton onClick={() => Selecionar(tipodeobra)} size="small" sx={{ p: 0 }}>
                  <SearchIcon />
                </IconButton>
              </TableCell>
            <TableCell>{tipodeobra.id}</TableCell>
            <TableCell>{tipodeobra.tipo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
