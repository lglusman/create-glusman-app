using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using WebApi.Models;
using WebApi.Models.DTOs;
using WebApi.Models.Helper;
using WebApi.Models.Entities;


namespace WebApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TiposDeObrasController : ControllerBase
    {

        private readonly DbInfraestructura _context;

        public TiposDeObrasController(DbInfraestructura context)
        {
            _context = context;
        }

        // GET: api/TiposDeObras
        [HttpGet]
        public wsResponse GetTiposDeObras([FromQuery] string inc = "", [FromQuery] int cant = 0, [FromQuery] int pag = 0, [FromQuery] string orden = "")
        {
            var ws = new wsResponse();
            try
            {
                var query = _context.TiposDeObras;

                if (orden == "")
                    orden = "Id";

                QueryHelper<TipoDeObra> qh = new(_context, query, inc, orden, pag, cant);
                ws.Data = qh.Data;

            }
            catch (Exception ex)
            {
                ws.ResultadoOk = false;
                ws.Mensaje = ex.Message;
                ws.Data = new Paginacion();
            }
            return ws;
        }

        // GET: api/TiposDeObras/5
        [HttpGet("{id:int}")]
        public wsResponse GetTipoDeObra(int id, [FromQuery] string inc = "", [FromQuery] int cant = 0, [FromQuery] int pag = 0, [FromQuery] string orden = "")
        {
            var ws = new wsResponse();
            try
            {
                var query = _context.TiposDeObras.Where(x => x.Id == id);

                if (orden == "")
                    orden = "Id";

                QueryHelper<TipoDeObra> qh = new(_context, query, inc, orden, pag, cant);
                ws.Data = qh.Data;
            }
            catch (Exception ex)
            {
                ws.ResultadoOk = false;
                ws.Mensaje = ex.Message;
                ws.Data = new Paginacion();
            }
            return ws;

        }

        [HttpGet("{busqueda}")]
        public wsResponse GetTiposDeObrasBusqueda(string busqueda, [FromQuery] string inc = "", [FromQuery] int cant = 0, [FromQuery] int pag = 0, [FromQuery] string orden = "")
        {
            var ws = new wsResponse();
            try
            {
                if (busqueda.EndsWith("__ax"))
                {
                    var buscar = busqueda.Replace("__ax", "");
                    var query = _context.TiposDeObras.Where(x => x.Tipo.ToUpper().Contains(buscar));

                    if (orden == "")
                        orden = "Id";

                    QueryHelper<TipoDeObra> qh = new(_context, query, inc, orden, pag, cant);
                    ws.Data = qh.Data;
                }
                else
                {
                    ws.ResultadoOk = false;
                    ws.Data = new Paginacion();
                    ws.Mensaje = "Busqueda erronea";
                }
            }
            catch (Exception ex)
            {
                ws.ResultadoOk = false;
                ws.Mensaje = ex.Message;
                ws.Data = new Paginacion();
            }
            return ws;

        }

        // PUT: api/TiposDeObras/5
        [HttpPut]
        public async Task<wsResponse> PutTipoDeObra(TipoDeObraDTO entidadDTO)
        {
            var ws = new wsResponse();
            try
            {
                entidadDTO.validar();
                bool success = int.TryParse(HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value, out int iduaurio);
                if (success)
                    entidadDTO.UsuarioModificacionId = iduaurio;
                entidadDTO.FechaModificacion = DateTime.Now.ToString("yyyy-MM-ddTHH:mm:ss.fffZ");
                var entidad = entidadDTO.ToEntity();
                _context.Entry(entidad).State = EntityState.Modified;
                _context.Entry(entidad).Property(x => x.FechaAlta).IsModified = false;
                _context.Entry(entidad).Property(x => x.UsuarioAltaId).IsModified = false;
                try
                {
                    await _context.SaveChangesAsync();
                    ws.Data.Data = entidad.ToDTO();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!TipoDeObraExists(entidad.Id))
                    {
                        ws.ResultadoOk = false;
                        ws.Mensaje = "NotFound";
                    }
                    else
                    {
                        throw;
                    }
                }
            }
            catch (Exception ex)
            {

                ws.ResultadoOk = false;
                ws.Mensaje = ex.Message;
                ws.Data = new Paginacion();
            }

            return ws;
        }

        // POST: api/TiposDeObras
        [HttpPost]
        public async Task<wsResponse> PostTipoDeObra(TipoDeObraDTO entidadDTO)
        {
            var ws = new wsResponse();
            try
            {
                entidadDTO.FechaAlta = DateTime.Now.ToString("yyyy-MM-ddTHH:mm:ss.fffZ");
                bool success = int.TryParse(HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value, out int iduaurio);
                if (success)
                    entidadDTO.UsuarioAltaId = iduaurio;
                entidadDTO.validar();
                var entidad = entidadDTO.ToEntity();
                _context.TiposDeObras.Add(entidad);
                await _context.SaveChangesAsync();
                ws.Data.Data = entidad.ToDTO();
            }
            catch (Exception ex)
            {
                ws.ResultadoOk = false;
                ws.Mensaje = ex.Message;
                ws.Data = new Paginacion();
            }
            return ws;
        }

        // DELETE: api/TiposDeObras/5
        [HttpDelete("{id}")]
        public async Task<wsResponse> DeleteTipoDeObra(int id)
        {
            var ws = new wsResponse();
            try
            {
                var entidad = await _context.TiposDeObras.FindAsync(id);
                if (entidad == null)
                {
                    ws.ResultadoOk = false;
                    ws.Mensaje = "NotFound";
                }
                else
                {
                    _context.TiposDeObras.Remove(entidad);
                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                ws.ResultadoOk = false;
                ws.Mensaje = ex.Message;
                ws.Data = new Paginacion();
            }
            return ws;
        }

        private bool TipoDeObraExists(int id)
        {
            return _context.TiposDeObras.Any(e => e.Id == id);
        }
    }
}

