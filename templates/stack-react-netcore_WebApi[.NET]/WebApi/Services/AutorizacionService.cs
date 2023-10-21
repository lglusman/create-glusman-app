using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebApi.Models;
using WebApi.Models.Entities;
using WebApi.Models.Custom;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Services
{
    public class AutorizacionService : IAutorizacionService
    {
        private readonly DbSindicatoDB _context;
        private readonly IConfiguration _configuration;

        public AutorizacionService(DbSindicatoDB context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        private string GenerarToken(Usuario user)
        {

            var key = _configuration.GetValue<string>("JwtSettings:key");
            if (string.IsNullOrEmpty(key))
                throw new Exception("No se ha configurado la llave para el token");
            var keyBytes = Encoding.ASCII.GetBytes(key);

            var claims = new ClaimsIdentity();
            claims.AddClaim(new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()));
            claims.AddClaim(new Claim(ClaimTypes.Name, user.UserName));

            var credencialesToken = new SigningCredentials(
                new SymmetricSecurityKey(keyBytes),
                SecurityAlgorithms.HmacSha256Signature
                );

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claims,
                Expires = DateTime.Now.AddHours(24),
                SigningCredentials = credencialesToken
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenConfig = tokenHandler.CreateToken(tokenDescriptor);

            string tokenCreado = tokenHandler.WriteToken(tokenConfig);

            return tokenCreado;


        }


        public async Task<AutorizacionResponse> DevolverToken(AutorizacionRequest autorizacion)
        {
            var usuario_encontrado = _context.Usuarios.Where(x =>
                x.UserName == autorizacion.Username && x.Password == autorizacion.Password)
                .Include(x => x.UsuarioRoles)
                .ThenInclude(x => x.Rol)
                .ThenInclude(x => x.RolPermisos)
                .ThenInclude(x => x.Permiso)
                .FirstOrDefault();

            if (usuario_encontrado == null)
            {
#pragma warning disable CS8625 // Cannot convert null literal to non-nullable reference type.
                return await Task.FromResult<AutorizacionResponse>(null);
#pragma warning restore CS8625 // Cannot convert null literal to non-nullable reference type.
            }


            string tokenCreado = GenerarToken(usuario_encontrado);


            //return new AutorizacionResponse() { Token = tokenCreado, Usuario = usuario_encontrado };
            return new AutorizacionResponse() { Token = tokenCreado, Usuario = usuario_encontrado.ToDTO() };



        }

    }
}
