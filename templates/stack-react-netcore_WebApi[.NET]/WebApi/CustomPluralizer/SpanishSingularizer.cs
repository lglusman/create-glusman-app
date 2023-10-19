using System.Globalization;
using Humanizer;
using Microsoft.EntityFrameworkCore.Design;
using NPoco.FluentMappings;
using WebApi.CustomPluralizer;

public class SpanishPluralizer : IPluralizer
{
    public string Pluralize(string name)
    {
        //return Inflector.MakePlural(name.Humanize()).Replace(" ","");
        // si name no termina en vocal
        if (!name.EndsWith("a") && !name.EndsWith("e") && !name.EndsWith("i") && !name.EndsWith("o") && !name.EndsWith("u") && !name.EndsWith("s")) {
            name += "e";
        }
        return Inflector.MakePlural(name.Humanize(LetterCasing.Title)).Replace(" ","");
        //return name;
    }

    public string Singularize(string name)
    {
        return MySpanishSingularizer.Singularize(name);
        //return Inflector.MakeSingular(name.Humanize()).Replace(" ","");
        //return name + "SINGULAR";
    }
}