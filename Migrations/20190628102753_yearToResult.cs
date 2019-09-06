using Microsoft.EntityFrameworkCore.Migrations;

namespace PROJECT.Migrations
{
    public partial class yearToResult : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ResultId",
                table: "Students",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Year",
                table: "Results",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Students_ResultId",
                table: "Students",
                column: "ResultId");

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Results_ResultId",
                table: "Students",
                column: "ResultId",
                principalTable: "Results",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Students_Results_ResultId",
                table: "Students");

            migrationBuilder.DropIndex(
                name: "IX_Students_ResultId",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "ResultId",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "Year",
                table: "Results");
        }
    }
}
