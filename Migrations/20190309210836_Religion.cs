using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PROJECT.Migrations
{
    public partial class Religion : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "NKAddress",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NKCountry",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NKLGA",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NKState",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NKTown",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ReligionId",
                table: "Users",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Religions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Religions", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_ReligionId",
                table: "Users",
                column: "ReligionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Religions_ReligionId",
                table: "Users",
                column: "ReligionId",
                principalTable: "Religions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Religions_ReligionId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "Religions");

            migrationBuilder.DropIndex(
                name: "IX_Users_ReligionId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "NKAddress",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "NKCountry",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "NKLGA",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "NKState",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "NKTown",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ReligionId",
                table: "Users");
        }
    }
}
