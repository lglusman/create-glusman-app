using Microsoft.EntityFrameworkCore.Design;

public class CustomDesignTimeService : IDesignTimeServices
{
    public void ConfigureDesignTimeServices(IServiceCollection serviceCollection)
                => serviceCollection.AddSingleton<IPluralizer, SpanishPluralizer>();
}