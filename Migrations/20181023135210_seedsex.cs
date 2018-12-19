using Microsoft.EntityFrameworkCore.Migrations;

namespace PROJECT.Migrations
{
    public partial class seedsex : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
              migrationBuilder.Sql("SET IDENTITY_INSERT Sex ON");
            
            migrationBuilder.Sql("INSERT INTO Sex (Id, Name) VALUES (1, 'Male') ");
            migrationBuilder.Sql("INSERT INTO Sex (Id, Name) VALUES (2, 'Female') ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
