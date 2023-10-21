using System;
using System.Collections.Generic;

namespace WebApi.Models.Entities;

public partial class NivelEducativo
{
    public int Id { get; set; }

    public string DescripcionNivelEducativo { get; set; } = null!;

    public byte? Orden { get; set; }

    public DateTime FechaAlta { get; set; }

    public DateTime? FechaBaja { get; set; }

    public short? MotivoBajaId { get; set; }

    public int UsuarioAltaId { get; set; }

    public int? UsuarioBajaId { get; set; }

    public DateTime? FechaModificacion { get; set; }

    public int? UsuarioModificacionId { get; set; }
}
