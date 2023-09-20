using System.Text.Json;
using MainApi.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace MainApi
{
    public class ApplicationContext : DbContext
    {
        protected readonly ILogger<ApplicationContext> Logger;

        protected readonly IConfiguration Configuration;

        public ApplicationContext(ILogger<ApplicationContext> logger, IConfiguration configuration)
        {
            Logger = logger;
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            var connection = Configuration.GetConnectionString(nameof(ApplicationContext));
            options.UseNpgsql(connection);
        }

        public DbSet<User> Users { get; set; }

        public DbSet<UserRole> UserRoles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(t =>
            {
                t.HasKey(s => s.Id);

            });

            modelBuilder.Entity<UserRole>(t =>
            {
                t.HasKey(s => s.Id);
                //t.HasOne(x => x.User)
                //    .WithMany()
                //    .HasForeignKey(s => s.UserId);
            });
        }

        public void Migrate()
        {
            var eventId = new EventId();

            try
            {
                var pendingMigrations = Database.GetPendingMigrations().ToList();

                if (pendingMigrations.Any())
                {
                    var connection = (Npgsql.NpgsqlConnection)Database.GetDbConnection();
                    Logger?.LogWarning(eventId, $"Database migration has been started {DateTime.Now}; " +
                                                $"Connection: '{connection.Host}:{connection.Port}', database '{connection.Database}'; " +
                                                $"Current migrations: {JsonSerializer.Serialize(pendingMigrations)}");

                    Database.Migrate();

                    var appliedMigrations = Database.GetAppliedMigrations();
                    Logger?.LogWarning(eventId, $"Database migration has been ended successfully {DateTime.Now}; " +
                                                $"Applied migrations: {JsonSerializer.Serialize(pendingMigrations)}");
                }

                Logger?.LogInformation(eventId, "Database migration has no pending migrations");
            }
            catch (Exception ex)
            {
                Logger?.LogError(eventId, ex, "Во время применения миграций произошла ошибка");
            }
        }
    }
}
