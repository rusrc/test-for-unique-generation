using System.Text;

namespace MainApi.Helpers
{
    public class Md5Helper
    {
        public static string Hash(string s)
        {
            using var provider = System.Security.Cryptography.MD5.Create();
            var builder = new StringBuilder();

            foreach (byte b in provider.ComputeHash(Encoding.UTF8.GetBytes(s)))
                builder.Append(b.ToString("x2").ToLower());

            return builder.ToString();
        }
    }
}
