using WebApi.Models.Entities;

namespace WebApi.Models
{
    public class wsResponse
    {

        public wsResponse()
        {
            ResultadoOk = true;
            Data = new Paginacion();
            Mensaje = "";
        }

        public bool ResultadoOk { get; set; } = true;
        public Paginacion Data { get; set; }
        public string Mensaje { get; set; } = "";

        

    }

    public class Paginacion
    {
        public Paginacion(object? data, int totalRegistros, int tamanoPagina, int paginaActual)
        {
            Data = data;
            TotalRegistros = totalRegistros;
            TamanoPagina = tamanoPagina;
            PaginaActual = paginaActual;
        }

        public Paginacion()
        {
            Data = null;
        }

        public object? Data { get; set; } = "";
        public int TotalRegistros { get; set; } = 0;
        public int TamanoPagina { get; set; } = 0;
        public int PaginaActual { get; set; } = 0;
        public int? PaginaSiguiente { get { return TamanoPagina > 0 ?  PaginaActual < ((TotalRegistros + TamanoPagina - 1) / TamanoPagina) ? PaginaActual + 1 : null : null; } }
        public int? PaginaAnterior { get { return PaginaActual > 1 ? PaginaActual - 1 : null; } }

    }

}
