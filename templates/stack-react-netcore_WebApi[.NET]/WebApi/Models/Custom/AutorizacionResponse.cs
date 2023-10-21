using WebApi.Models.DTOs;
using WebApi.Models.Entities;

namespace WebApi.Models.Custom
{
    public class AutorizacionResponse
    {
        public string Token { get; set; } = "";
        //public Usuario Usuario { get; set; }
        public UsuarioDTO Usuario { get; set; } = new UsuarioDTO();
    }
}
