using Microsoft.EntityFrameworkCore;
using WebApi.Models.Entities;

namespace WebApi.Models.Helper
{
    public class ControllerHelper
    {
        public static IQueryable<T> AddQueryIncludes<T>(IQueryable<T> query, string includes, DbInfraestructura context) where T : class
        {
            foreach (var item in includes.Split("|"))
            {
                var efProperties = context.Model.FindEntityType(typeof(T))?.GetNavigations();
                var prop = efProperties?.Where(x => x.Name.ToUpper() == item.ToUpper()).FirstOrDefault();

                if (prop != null)
                {
                    if (query != null)
                    {
                        query = query.Include(prop.Name);
                    }
                }
            }
            return query;
        }
        internal static IQueryable<T> AddQueryIncludes<T>(IQueryable<T> query, string includes, int cantidad, int pagina, string order, DbInfraestructura context) where T : class
        {
            var efProperties = context.Model.FindEntityType(typeof(T))?.GetNavigations();
            var efProperties1 = context.Model.FindEntityType(typeof(T))?.GetProperties();
            foreach (var item in includes.Split("|"))
            {

                if (item.Contains('.'))
                {
                    var prop1 = item.Split('.')[0];
                    var prop2 = item.Split('.')[1];
                    var efProperties2 = context.Model.FindEntityType(typeof(T))?.FindNavigation(prop1)?.ForeignKey?.DeclaringEntityType?.GetNavigations();
                    var prop = efProperties2?.Where(x => x.Name.ToUpper() == prop2.ToUpper()).FirstOrDefault();

                    if (prop != null)
                    {
                        if (query != null)
                        {
                            query = query.Include(prop.Name);
                        }
                    }
                }
                else
                {
                    var prop = efProperties?.Where(x => x.Name.ToUpper() == item.ToUpper()).FirstOrDefault();

                    if (prop != null)
                    {
                        if (query != null)
                        {
                            query = query.Include(prop.Name);
                        }
                    }
                }
            }
            foreach (var item in order.Split("|"))
            {
                var busqueda = item.ToUpper();
                var desc = "";
                if (item.ToUpper().EndsWith("DESC"))
                {
                    busqueda = item.ToUpper().Replace("DESC","").Trim();
                    desc = " DESC";
                }
                var prop = efProperties1?.Where(x => x.Name.ToUpper() == busqueda).FirstOrDefault();

                if (prop != null)
                {
                    if (query != null)
                    {
                        query = query.OrderBy(prop.Name + desc);
                    }
                }
            }

            if (pagina > 0)
                query = query.Skip((pagina - 1) * cantidad);
            if (cantidad > 0)
                query = query.Take(cantidad);

            return query;
        }
    }
}
