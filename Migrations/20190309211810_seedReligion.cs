using Microsoft.EntityFrameworkCore.Migrations;

namespace PROJECT.Migrations
{
    public partial class seedReligion : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "HairColor",
                table: "Users",
                nullable: true);

                 migrationBuilder.Sql("SET IDENTITY_INSERT Religions ON");
           
           migrationBuilder.Sql("INSERT INTO Religions (Id, Name) VALUES (1, 'Christianity') ");
           migrationBuilder.Sql("INSERT INTO Religions (Id, Name) VALUES (2, 'Islam') ");
           migrationBuilder.Sql("INSERT INTO Religions (Id, Name) VALUES (3, 'Others') ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HairColor",
                table: "Users");
        }
    }
}
