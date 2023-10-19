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
import { useEdificiosStore } from '../../services/Stores/useEdificiosStore'
export const Lista = () => {
  const ListaEdificios = useEdificiosStore((state) => state.Lista)
  const Selecionar = useEdificiosStore((state) => state.Selecionar)

  if (!ListaEdificios?.data.length) return <Typography variant="h6">No se encontraron datos</Typography>

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Sel.</TableCell>
            <TableCell>id</TableCell>
            <TableCell>nombre</TableCell>
            <TableCell>localidad</TableCell>
            <TableCell>domicilio</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ListaEdificios?.data.map((edificio) => (
            <TableRow key={edificio.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>
                <IconButton onClick={() => Selecionar(edificio)} size="small" sx={{ p: 0 }}>
                  <SearchIcon />
                </IconButton>
              </TableCell>
            <TableCell>{edificio.id}</TableCell>
            <TableCell>{edificio.nombre}</TableCell>
            <TableCell>{edificio.localidad}</TableCell>
            <TableCell>{edificio.domicilio}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
