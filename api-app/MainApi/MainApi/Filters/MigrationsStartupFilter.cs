namespace MainApi.Filters
{
    public class MigrationsStartupFilter<TDbContext> : IStartupFilter
    {
        private readonly IServiceProvider serviceProvider;

        public MigrationsStartupFilter(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
        }

        public Action<IApplicationBuilder> Configure(Action<IApplicationBuilder> next)
        {
            var serviceScope = serviceProvider.CreateScope();

            var chatDbContext = serviceScope.ServiceProvider.GetService<ApplicationContext>();

            chatDbContext?.Migrate();

            return next;
        }
    }
}
