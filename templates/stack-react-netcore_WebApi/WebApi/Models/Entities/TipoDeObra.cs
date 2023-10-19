using System;
using System.Collections.Generic;

namespace WebApi.Models.Entities;

public partial class TipoDeObra
{
    public int Id { get; set; }

    public string Tipo { get; set; } = null!;

    public DateTime FechaAlta { get; set; }

    public DateTime? FechaBaja { get; set; }

    public DateTime? FechaModificacion { get; set; }

    public int UsuarioAltaId { get; set; }

    public int? UsuarioBajaId { get; set; }

    public int? UsuarioModificacionId { get; set; }

    public virtual ICollection<Presupuesto> Presupuestos { get; set; } = new List<Presupuesto>();
}
