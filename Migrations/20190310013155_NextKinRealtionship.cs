using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PROJECT.Migrations
{
    public partial class NextKinRealtionship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NKCountry",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "NKLGA",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "NKTown",
                table: "Users",
                newName: "NKPhoneNumber");

            migrationBuilder.RenameColumn(
                name: "NKState",
                table: "Users",
                newName: "NKName");

            migrationBuilder.AddColumn<int>(
                name: "NKRelationshipId",
                table: "Users",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "NextKinRelationship",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NextKinRelationship", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_NKRelationshipId",
                table: "Users",
                column: "NKRelationshipId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_NextKinRelationship_NKRelationshipId",
                table: "Users",
                column: "NKRelationshipId",
                principalTable: "NextKinRelationship",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_NextKinRelationship_NKRelationshipId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "NextKinRelationship");

            migrationBuilder.DropIndex(
                name: "IX_Users_NKRelationshipId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "NKRelationshipId",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "NKPhoneNumber",
                table: "Users",
                newName: "NKTown");

            migrationBuilder.RenameColumn(
                name: "NKName",
                table: "Users",
                newName: "NKState");

            migrationBuilder.AddColumn<string>(
                name: "NKCountry",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NKLGA",
                table: "Users",
                nullable: true);
        }
    }
}
