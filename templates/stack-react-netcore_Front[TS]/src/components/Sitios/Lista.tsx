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
import { useSitiosStore } from '../../services/Stores/useSitiosStore'
export const Lista = () => {
  const ListaSitios = useSitiosStore((state) => state.Lista)
  const Selecionar = useSitiosStore((state) => state.Selecionar)

  if (!ListaSitios?.data.length) return <Typography variant="h6">No se encontraron datos</Typography>

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Sel.</TableCell>
            <TableCell>id</TableCell>
            <TableCell>descripcionSitio</TableCell>
            <TableCell>url</TableCell>
            <TableCell>icono</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ListaSitios?.data.map((sitio) => (
            <TableRow key={sitio.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>
                <IconButton onClick={() => Selecionar(sitio)} size="small" sx={{ p: 0 }}>
                  <SearchIcon />
                </IconButton>
              </TableCell>
            <TableCell>{sitio.id}</TableCell>
            <TableCell>{sitio.descripcionSitio}</TableCell>
            <TableCell>{sitio.url}</TableCell>
            <TableCell>{sitio.icono}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
