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
    public class RolesPermisosController : ControllerBase
    {

        private readonly DbContexto _context;

        public RolesPermisosController(DbContexto context)
        {
            _context = context;
        }

        // GET: api/RolesPermisos
        [HttpGet]
        public wsResponse GetRolesPermisos([FromQuery] string inc = "", [FromQuery] int cant = 0, [FromQuery] int pag = 0, [FromQuery] string orden = "")
        {
            var ws = new wsResponse();
            try
            {
                var query = _context.RolesPermisos;

                if (orden == "")
                    orden = "Id";

                QueryHelper<RolPermiso> qh = new(_context, query, inc, orden, pag, cant);
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

        // GET: api/RolesPermisos/5
        [HttpGet("{id:int}")]
        public wsResponse GetRolPermiso(int id, [FromQuery] string inc = "", [FromQuery] int cant = 0, [FromQuery] int pag = 0, [FromQuery] string orden = "")
        {
            var ws = new wsResponse();
            try
            {
                var query = _context.RolesPermisos.Where(x => x.Id == id);

                if (orden == "")
                    orden = "Id";

                QueryHelper<RolPermiso> qh = new(_context, query, inc, orden, pag, cant);
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
        //public wsResponse GetRolesPermisosBusqueda(string busqueda, [FromQuery] string inc = "", [FromQuery] int cant = 0, [FromQuery] int pag = 0, [FromQuery] string orden = "")
        //{
        //    var ws = new wsResponse();
        //    try
        //    {
        //        if (busqueda.EndsWith("__ax"))
        //        {
        //            var buscar = busqueda.Replace("__ax", "");
        //            var query = _context.RolesPermisos.Where(x => x.RolId.ToUpper().Contains(buscar));

        //            if (orden == "")
        //                orden = "Id";

        //            QueryHelper<RolPermiso> qh = new(_context, query, inc, orden, pag, cant);
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

        // PUT: api/RolesPermisos/5
        [HttpPut]
        public async Task<wsResponse> PutRolPermiso(RolPermisoDTO entidadDTO)
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
                    if (!RolPermisoExists(entidad.Id))
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

        // POST: api/RolesPermisos
        [HttpPost]
        public async Task<wsResponse> PostRolPermiso(RolPermisoDTO entidadDTO)
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
                _context.RolesPermisos.Add(entidad);
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

        // DELETE: api/RolesPermisos/5
        [HttpDelete("{id}")]
        public async Task<wsResponse> DeleteRolPermiso(int id)
        {
            var ws = new wsResponse();
            try
            {
                var entidad = await _context.RolesPermisos.FindAsync(id);
                if (entidad == null)
                {
                    ws.ResultadoOk = false;
                    ws.Mensaje = "NotFound";
                }
                else
                {
                    _context.RolesPermisos.Remove(entidad);
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

        private bool RolPermisoExists(int id)
        {
            return _context.RolesPermisos.Any(e => e.Id == id);
        }
    }
}

