using Microsoft.EntityFrameworkCore.Migrations;

namespace PROJECT.Migrations
{
    public partial class TermAndSession : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SessionId",
                table: "Students",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TermId",
                table: "Students",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Students_SessionId",
                table: "Students",
                column: "SessionId");

            migrationBuilder.CreateIndex(
                name: "IX_Students_TermId",
                table: "Students",
                column: "TermId");

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Session_SessionId",
                table: "Students",
                column: "SessionId",
                principalTable: "Session",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Terms_TermId",
                table: "Students",
                column: "TermId",
                principalTable: "Terms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Students_Session_SessionId",
                table: "Students");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_Terms_TermId",
                table: "Students");

            migrationBuilder.DropIndex(
                name: "IX_Students_SessionId",
                table: "Students");

            migrationBuilder.DropIndex(
                name: "IX_Students_TermId",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "SessionId",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "TermId",
                table: "Students");
        }
    }
}
