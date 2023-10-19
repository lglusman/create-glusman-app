using Microsoft.EntityFrameworkCore;
using WebApi.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.Identity.Client;
using Microsoft.AspNetCore.Diagnostics;
using System;

namespace WebApi.Models.Helper
{
    public class QueryHelper<T> where T : Idtoable, new()
    {
        private DbInfraestructura _context;
        private IQueryable<T> QueryInicial;
        public QueryHelper(DbInfraestructura context, IQueryable<T> queryInicial)
        {
            _context = context;
            QueryInicial = queryInicial;
        }

        public QueryHelper(DbInfraestructura context, IQueryable<T> queryInicial, string incluye, string orden, int paginaActual, int tamanoPagina) : this(context, queryInicial)
        {
            Incluye = incluye;
            Orden = orden;
            PaginaActual = paginaActual;
            TamanoPagina = tamanoPagina;



        }



        /// <summary>
        /// Navegaciones que incluye (foreing keys de la entidad)
        /// String dividido por | (Ej: "usuario|empresa")
        /// </summary>
        public string Incluye { get; set; } = "";
        //public int CantidadTotal { get; set; } = 0;
        public int PaginaActual { get; set; } = 0;
        public int TamanoPagina { get; set; } = 0;

        public string Orden { get; set; } = "";

        private IQueryable<T> Query => getQuery();

        private List<object> Lista()
        {
            List<T> lista = Query.ToList();
            var listaDTO = new List<Object>();
            if (lista != null)
            {
                foreach (var item in lista)
                {
                    listaDTO.Add(item.ToDTO());
                }
            }
            return listaDTO;
        }

        public Paginacion Data
        {
            get
            {
                var cantTotal = QueryInicial.Count();
                return new Paginacion(Lista(), cantTotal, TamanoPagina, PaginaActual);
            }
        }


        private IQueryable<T> getQuery()
        {
            var query = QueryInicial;
            var efNavigations = _context.Model.FindEntityType(typeof(T))?.GetNavigations();
            var efProperties = _context.Model.FindEntityType(typeof(T))?.GetProperties();

            foreach (var item in Orden.Split("|"))
            {
                var busqueda = item.ToUpper();
                var desc = "";
                if (item.ToUpper().EndsWith("DESC"))
                {
                    busqueda = item.ToUpper().Replace("DESC", "").Trim();
                    desc = " DESC";
                }
                var prop = efProperties?.Where(x => x.Name.ToUpper() == busqueda).FirstOrDefault();

                if (prop != null)
                {
                    query = query.OrderBy(prop.Name + desc);
                }
            }
            foreach (var item in Incluye.Split("|"))
            {
                if (item == "") continue;
                var capitalized = "";
                foreach (string str in item.Split("."))
                {
                      capitalized += string.Concat(str.ToUpper().AsSpan(0, 1), str.AsSpan(1), ".");
                }
                capitalized = capitalized.Substring(0,capitalized.Length - 1);
                query = query.Include(capitalized);
                //if (item.Contains('.'))
                //{
                //    //var prop1 = item.Split('.')[0];
                //    //var prop2 = item.Split('.')[1];

                //    //var prop = efNavigations?.Where(x => x.Name.ToUpper() == prop1.ToUpper()).FirstOrDefault();

                //    //var propnavigations = prop?.ForeignKey?.DeclaringEntityType?.GetNavigations();
                //    //var prop3 = propnavigations?.Where(x => x.Name.ToUpper() == prop2.ToUpper()).FirstOrDefault();

                //    //if (prop3 != null && prop != null)
                //    //{
                //    //    query = query.Include(prop.Name + "." +  prop3.Name);
                //    //}   

                //    var props = item.Split('.');

                //    var propinclude = "";
                //    Microsoft.EntityFrameworkCore.Metadata.INavigation? prop1 = null;

                //    foreach (var prop in props)
                //    {
                //        if (prop1 == null)
                //        {
                //            prop1 = efNavigations?.Where(x => x.Name.ToUpper() == prop.ToUpper()).FirstOrDefault();
                //            propinclude = prop1?.Name ?? "";
                //        }
                //        else
                //        {
                //            //var propnavigations = prop1?.ForeignKey?.DeclaringEntityType?.GetNavigations();
                //            var propnavigations = _context.Model.FindEntityType(prop1?.ForeignKey?.DeclaringEntityType?.Name)?.GetNavigations();
                //            var prop2 = propnavigations?.Where(x => x.Name.ToUpper() == prop.ToUpper()).FirstOrDefault();

                //            if (prop2 != null && prop1 != null)
                //            {
                //                propinclude += "." + prop2.Name;
                //                prop1 = prop2;
                //            }
                //        }   

                //    }

                //    query = query.Include(propinclude);

                //}
                //else
                //{
                //    var prop = efNavigations?.Where(x => x.Name.ToUpper() == item.ToUpper()).FirstOrDefault();

                //    if (prop != null)
                //    {

                //        query = query.Include(prop.Name);
                //    }
                //}
            }

            if (TamanoPagina > 0)
            {
                var pag = PaginaActual > 0 ? PaginaActual : 1;
                query = query.Skip((pag - 1) * TamanoPagina);
            }
            if (TamanoPagina > 0)
                query = query.Take(TamanoPagina);

            return query;

        }

    }
}
