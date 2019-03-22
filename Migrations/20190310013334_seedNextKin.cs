using Microsoft.EntityFrameworkCore.Migrations;

namespace PROJECT.Migrations
{
    public partial class seedNextKin : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

             migrationBuilder.Sql("SET IDENTITY_INSERT NextKinRelationship ON");
           
           migrationBuilder.Sql("INSERT INTO NextKinRelationship (Id, Name) VALUES (1, 'Aunt') ");
           migrationBuilder.Sql("INSERT INTO NextKinRelationship (Id, Name) VALUES (2, 'Brother') ");
           migrationBuilder.Sql("INSERT INTO NextKinRelationship (Id, Name) VALUES (3, 'Cousin') ");
           migrationBuilder.Sql("INSERT INTO NextKinRelationship (Id, Name) VALUES (4, 'Daughter') ");
           migrationBuilder.Sql("INSERT INTO NextKinRelationship (Id, Name) VALUES (5, 'Family Friend') ");
           migrationBuilder.Sql("INSERT INTO NextKinRelationship (Id, Name) VALUES (6, 'Father') ");
           migrationBuilder.Sql("INSERT INTO NextKinRelationship (Id, Name) VALUES (7, 'Mother') ");
           migrationBuilder.Sql("INSERT INTO NextKinRelationship (Id, Name) VALUES (8, 'Husband') ");
           migrationBuilder.Sql("INSERT INTO NextKinRelationship (Id, Name) VALUES (9, 'Nephew') ");
           migrationBuilder.Sql("INSERT INTO NextKinRelationship (Id, Name) VALUES (10, 'Niece') ");
           migrationBuilder.Sql("INSERT INTO NextKinRelationship (Id, Name) VALUES (11, 'Sister') ");
           migrationBuilder.Sql("INSERT INTO NextKinRelationship (Id, Name) VALUES (12, 'Son') ");
           migrationBuilder.Sql("INSERT INTO NextKinRelationship (Id, Name) VALUES (13, 'Uncle') ");
           migrationBuilder.Sql("INSERT INTO NextKinRelationship (Id, Name) VALUES (14, 'Wife') ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
