using Microsoft.EntityFrameworkCore.Migrations;

namespace PROJECT.Migrations
{
    public partial class sessionWithStudent : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "StudentId",
                table: "Session",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Session_StudentId",
                table: "Session",
                column: "StudentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Session_Students_StudentId",
                table: "Session",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Session_Students_StudentId",
                table: "Session");

            migrationBuilder.DropIndex(
                name: "IX_Session_StudentId",
                table: "Session");

            migrationBuilder.DropColumn(
                name: "StudentId",
                table: "Session");
        }
    }
}
