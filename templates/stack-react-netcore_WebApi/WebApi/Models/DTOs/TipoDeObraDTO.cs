using System;using System.Collections.Generic;using WebApi.Models.DTOs;using WebApi.Models.Entities;namespace WebApi.Models.DTOs{	public class TipoDeObraDTO	{		public int Id { get; set; } = 0;		public string Tipo { get; set; } = "";		public string FechaAlta { get; set; } = "";		public string? FechaBaja { get; set; } = null;		public string? FechaModificacion { get; set; } = null;		public int UsuarioAltaId { get; set; } = 0;		public int? UsuarioBajaId { get; set; } = null;		public int? UsuarioModificacionId { get; set; } = null;        public List<PresupuestoDTO> Presupuestos { get; set; } = new List<PresupuestoDTO>();		public TipoDeObra ToEntity()		{			return new TipoDeObra()			{				Id = Id,				Tipo = Tipo,				FechaAlta = DateTime.Parse(FechaAlta),				FechaBaja = FechaBaja != "" && FechaBaja != null ? DateTime.Parse(FechaBaja) : null,				FechaModificacion = FechaModificacion != "" && FechaModificacion != null ? DateTime.Parse(FechaModificacion) : null,				UsuarioAltaId = UsuarioAltaId,				UsuarioBajaId = UsuarioBajaId,				UsuarioModificacionId = UsuarioModificacionId,         };      }        internal void validar()        {            var strError = "";            if (Tipo.Trim() == "") strError += "* Tipo es requerido";            if (FechaAlta.Trim() == "") strError += "* FechaAlta es requerido";            if (UsuarioAltaId == 0) strError += "* UsuarioAltaId es requerido";            if (strError != "")            {                throw new Exception(strError);            }         }   }}namespace WebApi.Models.Entities{	public partial class TipoDeObra: Idtoable	{		public override TipoDeObraDTO ToDTO()		{			var dto = new TipoDeObraDTO();			dto.Id = Id;			dto.Tipo = Tipo;			dto.FechaAlta = FechaAlta.ToString("yyyy/MM/dd");			dto.FechaBaja = FechaBaja?.ToString("yyyy/MM/dd");			dto.FechaModificacion = FechaModificacion?.ToString("yyyy/MM/dd");			dto.UsuarioAltaId = UsuarioAltaId;			dto.UsuarioBajaId = UsuarioBajaId;			dto.UsuarioModificacionId = UsuarioModificacionId;			if (Presupuestos != null)			{				var lista = new List<PresupuestoDTO>();				foreach (var item in Presupuestos)				{					item.TipoDeObra = new TipoDeObra();					lista.Add(item.ToDTO());				}				dto.Presupuestos = lista;			}			return dto;		}	}}