using Microsoft.EntityFrameworkCore.Migrations;

namespace PROJECT.Migrations
{
    public partial class SeedGrade : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
             migrationBuilder.Sql("SET IDENTITY_INSERT Grade ON");
            
            migrationBuilder.Sql("INSERT INTO Grade (Id, Name) VALUES (1, 'JSS1') ");
            migrationBuilder.Sql("INSERT INTO Grade (Id, Name) VALUES (2, 'JSS2') ");
            migrationBuilder.Sql("INSERT INTO Grade (Id, Name) VALUES (3, 'JSS3') ");
            migrationBuilder.Sql("INSERT INTO Grade (Id, Name) VALUES (4, 'SSS1') ");
            migrationBuilder.Sql("INSERT INTO Grade (Id, Name) VALUES (5, 'SSS2') ");
            migrationBuilder.Sql("INSERT INTO Grade (Id, Name) VALUES (6, 'SSS3') ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
