using Microsoft.EntityFrameworkCore.Migrations;

namespace PROJECT.Migrations
{
    public partial class bloodANDGeno : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BloodGroupId",
                table: "Students",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "Students",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "GenoTypeId",
                table: "Students",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HairColor",
                table: "Students",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LGA",
                table: "Students",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NKAddress",
                table: "Students",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NKName",
                table: "Students",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NKPhoneNumber",
                table: "Students",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NKRelationshipId",
                table: "Students",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ReligionId",
                table: "Students",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "state",
                table: "Students",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Students_BloodGroupId",
                table: "Students",
                column: "BloodGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Students_GenoTypeId",
                table: "Students",
                column: "GenoTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Students_NKRelationshipId",
                table: "Students",
                column: "NKRelationshipId");

            migrationBuilder.CreateIndex(
                name: "IX_Students_ReligionId",
                table: "Students",
                column: "ReligionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Students_BloodGroups_BloodGroupId",
                table: "Students",
                column: "BloodGroupId",
                principalTable: "BloodGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Students_GenoTypes_GenoTypeId",
                table: "Students",
                column: "GenoTypeId",
                principalTable: "GenoTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Students_NextKinRelationship_NKRelationshipId",
                table: "Students",
                column: "NKRelationshipId",
                principalTable: "NextKinRelationship",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Religions_ReligionId",
                table: "Students",
                column: "ReligionId",
                principalTable: "Religions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Students_BloodGroups_BloodGroupId",
                table: "Students");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_GenoTypes_GenoTypeId",
                table: "Students");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_NextKinRelationship_NKRelationshipId",
                table: "Students");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_Religions_ReligionId",
                table: "Students");

            migrationBuilder.DropIndex(
                name: "IX_Students_BloodGroupId",
                table: "Students");

            migrationBuilder.DropIndex(
                name: "IX_Students_GenoTypeId",
                table: "Students");

            migrationBuilder.DropIndex(
                name: "IX_Students_NKRelationshipId",
                table: "Students");

            migrationBuilder.DropIndex(
                name: "IX_Students_ReligionId",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "BloodGroupId",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "Country",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "GenoTypeId",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "HairColor",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "LGA",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "NKAddress",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "NKName",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "NKPhoneNumber",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "NKRelationshipId",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "ReligionId",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "state",
                table: "Students");
        }
    }
}
