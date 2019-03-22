using Microsoft.EntityFrameworkCore.Migrations;

namespace PROJECT.Migrations
{
    public partial class BloodToUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BloodGroupId",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "GenoTypeId",
                table: "Users",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_BloodGroupId",
                table: "Users",
                column: "BloodGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_GenoTypeId",
                table: "Users",
                column: "GenoTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_BloodGroups_BloodGroupId",
                table: "Users",
                column: "BloodGroupId",
                principalTable: "BloodGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_GenoTypes_GenoTypeId",
                table: "Users",
                column: "GenoTypeId",
                principalTable: "GenoTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_BloodGroups_BloodGroupId",
                table: "Users");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_GenoTypes_GenoTypeId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_BloodGroupId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_GenoTypeId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "BloodGroupId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "GenoTypeId",
                table: "Users");
        }
    }
}
