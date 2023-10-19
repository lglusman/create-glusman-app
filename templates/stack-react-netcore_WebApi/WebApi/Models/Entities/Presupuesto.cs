using System;
using System.Collections.Generic;

namespace WebApi.Models.Entities;

public partial class Presupuesto
{
    public int Id { get; set; }

    public string Descripcion { get; set; } = null!;

    public int EdificioId { get; set; }

    public int TipoDeObraId { get; set; }

    public decimal Neto { get; set; }

    public string? Incluye { get; set; }

    public DateTime FechaAlta { get; set; }

    public DateTime? FechaBaja { get; set; }

    public DateTime? FechaModificacion { get; set; }

    public int UsuarioAltaId { get; set; }

    public int? UsuarioBajaId { get; set; }

    public int? UsuarioModificacionId { get; set; }

    public virtual Edificio Edificio { get; set; } = null!;

    public virtual TipoDeObra TipoDeObra { get; set; } = null!;
}
