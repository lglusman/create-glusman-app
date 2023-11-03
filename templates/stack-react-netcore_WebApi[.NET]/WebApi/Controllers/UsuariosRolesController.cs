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
    public class UsuariosRolesController : ControllerBase
    {

        private readonly DbContexto _context;

        public UsuariosRolesController(DbContexto context)
        {
            _context = context;
        }

        // GET: api/UsuariosRoles
        [HttpGet]
        public wsResponse GetUsuariosRoles([FromQuery] string inc = "", [FromQuery] int cant = 0, [FromQuery] int pag = 0, [FromQuery] string orden = "")
        {
            var ws = new wsResponse();
            try
            {
                var query = _context.UsuariosRoles;

                if (orden == "")
                    orden = "Id";

                QueryHelper<UsuarioRol> qh = new(_context, query, inc, orden, pag, cant);
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

        // GET: api/UsuariosRoles/5
        [HttpGet("{id:int}")]
        public wsResponse GetUsuarioRol(int id, [FromQuery] string inc = "", [FromQuery] int cant = 0, [FromQuery] int pag = 0, [FromQuery] string orden = "")
        {
            var ws = new wsResponse();
            try
            {
                var query = _context.UsuariosRoles.Where(x => x.Id == id);

                if (orden == "")
                    orden = "Id";

                QueryHelper<UsuarioRol> qh = new(_context, query, inc, orden, pag, cant);
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

        //[HttpGet("{busqueda}")]
        //public wsResponse GetUsuariosRolesBusqueda(string busqueda, [FromQuery] string inc = "", [FromQuery] int cant = 0, [FromQuery] int pag = 0, [FromQuery] string orden = "")
        //{
        //    var ws = new wsResponse();
        //    try
        //    {
        //        if (busqueda.EndsWith("__ax"))
        //        {
        //            var buscar = busqueda.Replace("__ax", "");
        //            var query = _context.UsuariosRoles.Where(x => x.UsuarioId.ToUpper().Contains(buscar));

        //            if (orden == "")
        //                orden = "Id";

        //            QueryHelper<UsuarioRol> qh = new(_context, query, inc, orden, pag, cant);
        //            ws.Data = qh.Data;
        //        }
        //        else
        //        {
        //            ws.ResultadoOk = false;
        //            ws.Data = new Paginacion();
        //            ws.Mensaje = "Busqueda erronea";
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        ws.ResultadoOk = false;
        //        ws.Mensaje = ex.Message;
        //        ws.Data = new Paginacion();
        //    }
        //    return ws;

        //}

        // PUT: api/UsuariosRoles/5
        [HttpPut]
        public async Task<wsResponse> PutUsuarioRol(UsuarioRolDTO entidadDTO)
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
                    if (!UsuarioRolExists(entidad.Id))
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

        // POST: api/UsuariosRoles
        [HttpPost]
        public async Task<wsResponse> PostUsuarioRol(UsuarioRolDTO entidadDTO)
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
                _context.UsuariosRoles.Add(entidad);
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

        // DELETE: api/UsuariosRoles/5
        [HttpDelete("{id}")]
        public async Task<wsResponse> DeleteUsuarioRol(int id)
        {
            var ws = new wsResponse();
            try
            {
                var entidad = await _context.UsuariosRoles.FindAsync(id);
                if (entidad == null)
                {
                    ws.ResultadoOk = false;
                    ws.Mensaje = "NotFound";
                }
                else
                {
                    _context.UsuariosRoles.Remove(entidad);
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

        private bool UsuarioRolExists(int id)
        {
            return _context.UsuariosRoles.Any(e => e.Id == id);
        }
    }
}

