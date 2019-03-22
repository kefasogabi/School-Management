using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PROJECT.Migrations
{
    public partial class gentypeAndBloodgroup : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LGA",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SexId",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "state",
                table: "Users",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "BloodGroups",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BloodGroups", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GenoTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GenoTypes", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_SexId",
                table: "Users",
                column: "SexId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Sex_SexId",
                table: "Users",
                column: "SexId",
                principalTable: "Sex",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Sex_SexId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "BloodGroups");

            migrationBuilder.DropTable(
                name: "GenoTypes");

            migrationBuilder.DropIndex(
                name: "IX_Users_SexId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Country",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "LGA",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "SexId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "state",
                table: "Users");
        }
    }
}
