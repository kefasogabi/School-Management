using Microsoft.EntityFrameworkCore.Migrations;

namespace PROJECT.Migrations
{
    public partial class seedGenotypeAndBloodgroup : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("SET IDENTITY_INSERT BloodGroups ON");
            
            migrationBuilder.Sql("INSERT INTO BloodGroups (Id, Name) VALUES (1, 'O+') ");
            migrationBuilder.Sql("INSERT INTO BloodGroups (Id, Name) VALUES (2, 'O-') ");
            migrationBuilder.Sql("INSERT INTO BloodGroups (Id, Name) VALUES (3, 'A+') ");
            migrationBuilder.Sql("INSERT INTO BloodGroups (Id, Name) VALUES (4, 'A-') ");
            migrationBuilder.Sql("INSERT INTO BloodGroups (Id, Name) VALUES (5, 'B+') ");
            migrationBuilder.Sql("INSERT INTO BloodGroups (Id, Name) VALUES (6, 'B-') ");
            migrationBuilder.Sql("INSERT INTO BloodGroups (Id, Name) VALUES (7, 'AB+') ");
            migrationBuilder.Sql("INSERT INTO BloodGroups (Id, Name) VALUES (8, 'AB-') ");

            migrationBuilder.Sql("SET IDENTITY_INSERT BloodGroups OFF");

            migrationBuilder.Sql("SET IDENTITY_INSERT GenoTypes ON");
           
           migrationBuilder.Sql("INSERT INTO GenoTypes (Id, Name) VALUES (1, 'AA') ");
           migrationBuilder.Sql("INSERT INTO GenoTypes (Id, Name) VALUES (2, 'AS') ");
           migrationBuilder.Sql("INSERT INTO GenoTypes (Id, Name) VALUES (3, 'SS') ");
           migrationBuilder.Sql("INSERT INTO GenoTypes (Id, Name) VALUES (4, 'AC') ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
