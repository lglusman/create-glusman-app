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
import { useNivelesEducativosStore } from '../../services/Stores/useNivelesEducativosStore'
export const Lista = () => {
  const ListaNivelesEducativos = useNivelesEducativosStore((state) => state.Lista)
  const Selecionar = useNivelesEducativosStore((state) => state.Selecionar)

  if (!ListaNivelesEducativos?.data.length) return <Typography variant="h6">No se encontraron datos</Typography>

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Sel.</TableCell>
            <TableCell>id</TableCell>
            <TableCell>descripcionNivelEducativo</TableCell>
            <TableCell>orden</TableCell>
            <TableCell>motivoBajaId</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ListaNivelesEducativos?.data.map((niveleducativo) => (
            <TableRow key={niveleducativo.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>
                <IconButton onClick={() => Selecionar(niveleducativo)} size="medium" sx={{ p: 0 }}>
                  <SearchIcon />
                </IconButton>
              </TableCell>
            <TableCell>{niveleducativo.id}</TableCell>
            <TableCell>{niveleducativo.descripcionNivelEducativo}</TableCell>
            <TableCell>{niveleducativo.orden}</TableCell>
            <TableCell>{niveleducativo.motivoBajaId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
