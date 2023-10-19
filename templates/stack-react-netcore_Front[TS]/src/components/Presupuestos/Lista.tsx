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
import { usePresupuestosStore } from '../../services/Stores/usePresupuestosStore'
export const Lista = () => {
  const ListaPresupuestos = usePresupuestosStore((state) => state.Lista)
  const Selecionar = usePresupuestosStore((state) => state.Selecionar)

  if (!ListaPresupuestos?.data.length) return <Typography variant="h6">No se encontraron datos</Typography>

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Sel.</TableCell>
            <TableCell>id</TableCell>
            <TableCell>descripcion</TableCell>
            <TableCell>edificioId</TableCell>
            <TableCell>tipoDeObraId</TableCell>
            <TableCell>neto</TableCell>
            <TableCell>incluye</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ListaPresupuestos?.data.map((presupuesto) => (
            <TableRow key={presupuesto.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>
                <IconButton onClick={() => Selecionar(presupuesto)} size="small" sx={{ p: 0 }}>
                  <SearchIcon />
                </IconButton>
              </TableCell>
            <TableCell>{presupuesto.id}</TableCell>
            <TableCell>{presupuesto.descripcion}</TableCell>
            <TableCell>{presupuesto.edificioId}</TableCell>
            <TableCell>{presupuesto.tipoDeObraId}</TableCell>
            <TableCell>{presupuesto.neto}</TableCell>
            <TableCell>{presupuesto.incluye}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
