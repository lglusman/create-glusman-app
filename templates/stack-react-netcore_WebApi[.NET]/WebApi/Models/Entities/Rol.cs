using System;
using System.Collections.Generic;

namespace WebApi.Models.Entities;

public partial class Rol
{
    public int Id { get; set; }

    public string DescripcionRol { get; set; } = null!;

    public DateTime FechaAlta { get; set; }

    public int UsuarioAltaId { get; set; }

    public DateTime? FechaBaja { get; set; }

    public int? UsuarioBajaId { get; set; }

    public DateTime? FechaModificacion { get; set; }

    public int? UsuarioModificacionId { get; set; }

    public virtual ICollection<RolPermiso> RolPermisos { get; set; } = new List<RolPermiso>();

    public virtual ICollection<UsuarioRol> UsuarioRoles { get; set; } = new List<UsuarioRol>();
}
