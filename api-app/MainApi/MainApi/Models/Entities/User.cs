namespace MainApi.Models.Entities
{
    public class User
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string PswHash { get; set; }
        public DateTime Registered { get; set; }

        public virtual ICollection <UserRole> UserRoles { get; set; }
    }
}
