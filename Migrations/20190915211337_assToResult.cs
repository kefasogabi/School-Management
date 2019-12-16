using Microsoft.EntityFrameworkCore.Migrations;

namespace PROJECT.Migrations
{
    public partial class assToResult : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Results_Students_StudentId",
                table: "Results");

            migrationBuilder.DropColumn(
                name: "Grade",
                table: "Results");

            migrationBuilder.RenameColumn(
                name: "TotalScore",
                table: "Results",
                newName: "Ass2");

            migrationBuilder.RenameColumn(
                name: "Remark",
                table: "Results",
                newName: "Ass1");

            migrationBuilder.AlterColumn<string>(
                name: "UserName",
                table: "Students",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "StudentId",
                table: "Results",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Results_Students_StudentId",
                table: "Results",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Results_Students_StudentId",
                table: "Results");

            migrationBuilder.RenameColumn(
                name: "Ass2",
                table: "Results",
                newName: "TotalScore");

            migrationBuilder.RenameColumn(
                name: "Ass1",
                table: "Results",
                newName: "Remark");

            migrationBuilder.AlterColumn<string>(
                name: "UserName",
                table: "Students",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<int>(
                name: "StudentId",
                table: "Results",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<string>(
                name: "Grade",
                table: "Results",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Results_Students_StudentId",
                table: "Results",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
