using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using WebApi.Models;
using WebApi.Models.Custom;
using WebApi.Services;


namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAutorizacionService _autorizacionService;
        public AuthenticationController(IAutorizacionService autorizacionService)
        {
            _autorizacionService = autorizacionService;
        }

        [HttpPost]
        [Route("Autenticar")]
        public async Task<wsResponse> Autenticar([FromBody] AutorizacionRequest autorizacion)
        {
            var ws = new wsResponse();
            try
            {
                var resultado_autorizacion = await _autorizacionService.DevolverToken(autorizacion);
                if (resultado_autorizacion == null)
                {
                    ws.ResultadoOk = false;
                    ws.Mensaje = "Usuario o clave incorrectos";
                }
                else
                {
                    ws.Mensaje = "";
                    resultado_autorizacion.Usuario.Password = "*****";
                    var list = new List<AutorizacionResponse>();
                    list.Add(resultado_autorizacion);
                    ws.Data.Data = list;
                }

            }
            catch (Exception e)
            {
                ws.ResultadoOk = false;
                ws.Data = new Paginacion();
                ws.Mensaje = e.Message;

            }

            return ws;

        }

        [HttpGet]
        [Route("Probar")]
        public wsResponse Probar()
        {
            var ws = new wsResponse();
            try
            {
                ws.Mensaje = "Esto es una prueba";
                ws.Data.Data = "Prueba exitosa";

            }
            catch (Exception e)
            {
                ws.ResultadoOk = false;
                ws.Data = new Paginacion();
                ws.Mensaje = e.Message;

            }
            return ws;
        }
    }
}
