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
    public class RolesController : ControllerBase
    {

        private readonly DbContexto _context;

        public RolesController(DbContexto context)
        {
            _context = context;
        }

        // GET: api/Roles
        [HttpGet]
        public wsResponse GetRoles([FromQuery] string inc = "", [FromQuery] int cant = 0, [FromQuery] int pag = 0, [FromQuery] string orden = "")
        {
            var ws = new wsResponse();
            try
            {
                var query = _context.Roles;

                if (orden == "")
                    orden = "Id";

                QueryHelper<Rol> qh = new(_context, query, inc, orden, pag, cant);
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

        // GET: api/Roles/5
        [HttpGet("{id:int}")]
        public wsResponse GetRol(int id, [FromQuery] string inc = "", [FromQuery] int cant = 0, [FromQuery] int pag = 0, [FromQuery] string orden = "")
        {
            var ws = new wsResponse();
            try
            {
                var query = _context.Roles.Where(x => x.Id == id);

                if (orden == "")
                    orden = "Id";

                QueryHelper<Rol> qh = new(_context, query, inc, orden, pag, cant);
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
        public wsResponse GetRolesBusqueda(string busqueda, [FromQuery] string inc = "", [FromQuery] int cant = 0, [FromQuery] int pag = 0, [FromQuery] string orden = "")
        {
            var ws = new wsResponse();
            try
            {
                if (busqueda.EndsWith("__ax"))
                {
                    var buscar = busqueda.Replace("__ax", "");
                    var query = _context.Roles.Where(x => x.DescripcionRol.ToUpper().Contains(buscar));

                    if (orden == "")
                        orden = "Id";

                    QueryHelper<Rol> qh = new(_context, query, inc, orden, pag, cant);
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

        // PUT: api/Roles/5
        [HttpPut]
        public async Task<wsResponse> PutRol(RolDTO entidadDTO)
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
                    if (!RolExists(entidad.Id))
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

        // POST: api/Roles
        [HttpPost]
        public async Task<wsResponse> PostRol(RolDTO entidadDTO)
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
                _context.Roles.Add(entidad);
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

        // DELETE: api/Roles/5
        [HttpDelete("{id}")]
        public async Task<wsResponse> DeleteRol(int id)
        {
            var ws = new wsResponse();
            try
            {
                var entidad = await _context.Roles.FindAsync(id);
                if (entidad == null)
                {
                    ws.ResultadoOk = false;
                    ws.Mensaje = "NotFound";
                }
                else
                {
                    _context.Roles.Remove(entidad);
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

        private bool RolExists(int id)
        {
            return _context.Roles.Any(e => e.Id == id);
        }
    }
}

