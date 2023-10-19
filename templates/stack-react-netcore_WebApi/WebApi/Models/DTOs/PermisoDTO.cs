using System;using System.Collections.Generic;using WebApi.Models.DTOs;using WebApi.Models.Entities;namespace WebApi.Models.DTOs{	public class PermisoDTO	{		public int Id { get; set; } = 0;		public string DescripcionPermiso { get; set; } = "";		public int SitioId { get; set; } = 0;		public string Url { get; set; } = "";		public int Posicion { get; set; } = 0;		public string FechaAlta { get; set; } = "";		public int UsuarioAltaId { get; set; } = 0;		public string? FechaBaja { get; set; } = null;		public int? UsuarioBajaId { get; set; } = null;		public string? FechaModificacion { get; set; } = null;		public int? UsuarioModificacionId { get; set; } = null;		public SitioDTO? Sitio { get; set; }        public List<RolPermisoDTO> RolPermisos { get; set; } = new List<RolPermisoDTO>();		public Permiso ToEntity()		{			return new Permiso()			{				Id = Id,				DescripcionPermiso = DescripcionPermiso,				SitioId = SitioId,				Url = Url,				Posicion = Posicion,				FechaAlta = DateTime.Parse(FechaAlta),				UsuarioAltaId = UsuarioAltaId,				FechaBaja = FechaBaja != "" && FechaBaja != null ? DateTime.Parse(FechaBaja) : null,				UsuarioBajaId = UsuarioBajaId,				FechaModificacion = FechaModificacion != "" && FechaModificacion != null ? DateTime.Parse(FechaModificacion) : null,				UsuarioModificacionId = UsuarioModificacionId,         };      }        internal void validar()        {            var strError = "";            if (DescripcionPermiso.Trim() == "") strError += "* DescripcionPermiso es requerido";            if (SitioId == 0) strError += "* SitioId es requerido";            if (Url.Trim() == "") strError += "* Url es requerido";            if (Posicion == 0) strError += "* Posicion es requerido";            if (FechaAlta.Trim() == "") strError += "* FechaAlta es requerido";            if (UsuarioAltaId == 0) strError += "* UsuarioAltaId es requerido";            if (strError != "")            {                throw new Exception(strError);            }         }   }}namespace WebApi.Models.Entities{	public partial class Permiso: Idtoable	{		public override PermisoDTO ToDTO()		{			var dto = new PermisoDTO();			dto.Id = Id;			dto.DescripcionPermiso = DescripcionPermiso;			dto.SitioId = SitioId;			dto.Url = Url;			dto.Posicion = Posicion;			dto.FechaAlta = FechaAlta.ToString("yyyy/MM/dd");			dto.UsuarioAltaId = UsuarioAltaId;			dto.FechaBaja = FechaBaja?.ToString("yyyy/MM/dd");			dto.UsuarioBajaId = UsuarioBajaId;			dto.FechaModificacion = FechaModificacion?.ToString("yyyy/MM/dd");			dto.UsuarioModificacionId = UsuarioModificacionId;			if (Sitio != null)			{				this.Sitio.Permisos = new List<Permiso>();				dto.Sitio = Sitio.ToDTO();			}			if (RolPermisos != null)			{				var lista = new List<RolPermisoDTO>();				foreach (var item in RolPermisos)				{					item.Permiso = new Permiso();					lista.Add(item.ToDTO());				}				dto.RolPermisos = lista;			}			return dto;		}	}}