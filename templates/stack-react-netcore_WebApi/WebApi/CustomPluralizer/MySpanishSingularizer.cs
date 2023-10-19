using System.Text.RegularExpressions;

namespace WebApi.CustomPluralizer
{
    public class MySpanishSingularizer
    {
    

        public static string Singularize(string palabraPlural)
        {
            string[] palabras = Regex.Split(palabraPlural, @"(?<!^)(?=[A-Z])");

            string palabraSingular = "";
            foreach (string palabra in palabras)
            {
                palabraSingular += SingularizePalabra(palabra);
            }

            return palabraSingular;
        }


        private static string SingularizePalabra(string palabraPlural)
        {
            string palabraSingular = palabraPlural;

            // Diccionario de palabras
            Dictionary<string, string> diccionario = new Dictionary<string, string>
            {
                { "abdominales", "abdominal" },
                { "árboles", "árbol" },
                { "barriles", "barril" },
                { "gafas", "gafa" },
                { "manzanas", "manzana" },
                { "ojos", "ojo" },
                // Agrega más palabras según tus necesidades
            };

            // Busca la palabra en el diccionario
            if (diccionario.ContainsKey(palabraSingular))
            {
                return diccionario[palabraSingular];
            }

            // Verifica si la palabra termina en "es"
            if (palabraSingular.EndsWith("es", StringComparison.OrdinalIgnoreCase))
            {
                palabraSingular = palabraSingular.Remove(palabraSingular.Length - 2);
            }
            // Verifica si la palabra termina en "s"
            else if (palabraSingular.EndsWith("s", StringComparison.OrdinalIgnoreCase))
            {
                palabraSingular = palabraSingular.Remove(palabraSingular.Length - 1);
            }

            return palabraSingular;
        }
    }
}
