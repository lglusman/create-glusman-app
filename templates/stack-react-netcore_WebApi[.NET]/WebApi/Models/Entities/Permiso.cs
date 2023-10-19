using System;
using System.Collections.Generic;

namespace WebApi.Models.Entities;

public partial class Permiso
{
    public int Id { get; set; }

    public string DescripcionPermiso { get; set; } = null!;

    public int SitioId { get; set; }

    public string Url { get; set; } = null!;

    public int Posicion { get; set; }

    public DateTime FechaAlta { get; set; }

    public int UsuarioAltaId { get; set; }

    public DateTime? FechaBaja { get; set; }

    public int? UsuarioBajaId { get; set; }

    public DateTime? FechaModificacion { get; set; }

    public int? UsuarioModificacionId { get; set; }

    public virtual ICollection<RolPermiso> RolPermisos { get; set; } = new List<RolPermiso>();

    public virtual Sitio Sitio { get; set; } = null!;
}
