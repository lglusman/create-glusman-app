using System;
using System.Collections.Generic;

namespace WebApi.Models.Entities;

public partial class Sitio
{
    public int Id { get; set; }

    public string DescripcionSitio { get; set; } = null!;

    public string Url { get; set; } = null!;

    public string Icono { get; set; } = null!;

    public DateTime FechaAlta { get; set; }

    public int UsuarioAltaId { get; set; }

    public DateTime? FechaBaja { get; set; }

    public int? UsuarioBajaId { get; set; }

    public DateTime? FechaModificacion { get; set; }

    public int? UsuarioModificacionId { get; set; }

    public virtual ICollection<Permiso> Permisos { get; set; } = new List<Permiso>();
}
