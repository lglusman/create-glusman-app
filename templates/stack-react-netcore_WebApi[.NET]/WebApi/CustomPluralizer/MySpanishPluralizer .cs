using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Microsoft.EntityFrameworkCore.Design;

public class MySpanishPluralizer 
{
    private static readonly List<PluralizationRule> _pluralizationRules = new List<PluralizationRule>
    {
        new PluralizationRule("z", "ces"),
        new PluralizationRule("s", "es"),
        new PluralizationRule("x", "ces"),
        new PluralizationRule("ch", "ches"),
        new PluralizationRule("sh", "shes"),
        new PluralizationRule("á", "ás"),
        new PluralizationRule("é", "és"),
        new PluralizationRule("í", "ís"),
        new PluralizationRule("ó", "ós"),
        new PluralizationRule("ú", "ús")
    };

       public static string Pluralize(string name)
    {
        CultureInfo culture = new CultureInfo("es-ES");
        string lowerName = name.ToLower(culture);
        string result = TryApplyRules(lowerName, _pluralizationRules);
        return culture.TextInfo.ToTitleCase(result);
    }

    private static string TryApplyRules(string word, List<PluralizationRule> rules)
    {
        if (string.IsNullOrEmpty(word))
        {
            return word;
        }

        InflectionRule? matchingRule = rules.FirstOrDefault(r => r.IsMatch(word));

        if (matchingRule != null)
        {
            return matchingRule.Apply(word);
        }

        return word;
    }

    private abstract class InflectionRule
    {
        public abstract bool IsMatch(string word);
        public abstract string Apply(string word);
    }

    private class PluralizationRule : InflectionRule
    {
        private readonly string _suffix;
        private readonly string _replacement;

        public PluralizationRule(string suffix, string replacement)
        {
            _suffix = suffix;
            _replacement = replacement;
        }

        public override bool IsMatch(string word)
        {
            return word.EndsWith(_suffix, StringComparison.InvariantCultureIgnoreCase);
        }

        public override string Apply(string word)
        {
            return word.Substring(0, word.Length - _suffix.Length) + _replacement;
        }
    }

}
